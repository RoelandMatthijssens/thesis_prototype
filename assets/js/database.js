var myDb = false;
var debug = false;

function execute(query, params, successHandler){
	myDb.transaction(function(transaction){
		transaction.executeSql(query, params, successHandler, errorHandler);
	});
}

function insert(query, params, callback){
	execute(query, params, function(tx, r){
		callback(r.insertId);
	});
}

function select(what, from, where, callback){
	var result = [];
	var query = "SELECT * FROM "+from;//+" WHERE ";
	var wwhere = []
	for(var key in where){
		wwhere.push(key+" = \""+where[key]+"\"");
	}
	if (wwhere.length > 0) {query+=" WHERE "};
	query += wwhere.join(" and ");
	query += ";";
	execute(query, [], function(transaction, results){
		for (var i = 0; i < results.rows.length; i++) {
			tempRes = {};
			for (var j = 0; j < what.length; j++) {
				tempRes[what[j]] = results.rows.item(i)[what[j]];
			};
			result[i] = tempRes;
		};
		callback(result);
	});
}

function dropTables(callback){
	var tables = ["resource", "selector", "source", "destination", "hyperlink", "sourceTag", "destinationTag", "tag"];
	for (var i = 0; i < tables.length; i++) {
		var table = tables[i];
		var query = "DROP TABLE " + table + ";";
		execute(query, [], callback);
	}
}

function resetTables () {
	dropTables(function() {
		createTables();
	});
}

function insertResource(url, type, callback){
	var query = "INSERT INTO resource(url, type) VALUES (?, ?);";
	insert(query, [url, type], callback);
}

function addResource(url, type, callback){
	getResource({"url":url}, function(result){
		if(result.length===0){ //didn't exist yet -> create it && return id
			insertResource(url, type, callback);
		} else if(result.length===1){ //already exist -> return id
			callback(result[0].id);
		} else { //should not happen -> error
			console.error("addResource: Non unique identifier");
		}
	});
}

function getResource(where, callback){
	var what = ["id", "url", "type"];
	var from = "resource";
	select(what, from, where, callback);
}

function joinQuery(select, where){
	var query = "SELECT "+select;
	query += " FROM hyperlink INNER JOIN source INNER JOIN destination INNER JOIN selector as sourceSelector INNER JOIN selector as destinationSelector INNER JOIN resource as sourceResource INNER JOIN resource as destinationResource";
	query += " ON hyperlink.id = source.hyperlinkId AND hyperlink.id = destination.hyperlinkId AND source.selectorId = sourceSelector.id AND destination.selectorId = destinationSelector.id AND sourceSelector.resourceId = sourceResource.id and destinationSelector.resourceId = destinationResource.id";
	query += " WHERE "+where;
	return query;
}

function getConnectedResources (resourceId, callback) {
	var select = "sourceresource.id as sourceResourceId, destinationResource.id as destinationResourceId";
	var where = "sourceResourceId = "+resourceId+" OR destinationResourceId = "+resourceId+";";
	var query = joinQuery(select, where);
	execute(query, [], function(tx, results){
		var connectedResources = [];
		var uniqueResourceList = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var sourceResourceId = row.sourceResourceId;
			var destinationResourceId = row.destinationResourceId;
			if(sourceResourceId !== resourceId){connectedResources.push(sourceResourceId);}
			if(destinationResourceId !== resourceId){connectedResources.push(destinationResourceId);};
		};
		$.each(connectedResources, function(i, el){
			if($.inArray(el, uniqueResourceList) === -1) uniqueResourceList.push(el);
		});
		callback(uniqueResourceList);
	});
}

function getAmountOfHyperlinksBetweenResources(resource1, resource2, callback){
	var select = "hyperlink.id as hyperlinkId, sourceresource.id as sourceResourceId, destinationResource.id as destinationResourceId, destinationResource.type as destinationType, sourceResource.type as sourceType"
	var where = "(sourceResourceId = "+resource1+" AND destinationResourceId = "+resource2+") OR (sourceResourceId = "+resource2+" AND destinationResourceId = "+resource1+") ;";
	var query = joinQuery(select, where);
	execute(query, [], function(tx, results){
		callback(results.rows.length);
	});
}

function getLinkedResources(resourceId, callback){
	var select = "hyperlink.id as hyperlinkId, sourceresource.id as sourceResourceId, destinationResource.id as destinationResourceId, source.id as sourceId, destination.id as destinationId, destinationResource.type as destinationType, sourceResource.type as sourceType"
	var where = "sourceResourceId = "+resourceId+" OR destinationResourceId = "+resourceId+";"
	var query = joinQuery(select, where);
	execute(query, [], function(tx, results){
		var data = {}
		async.timesSeries(results.rows.length, function(i, next){
			var row = results.rows.item(i);
			var sourceResourceId = row.sourceResourceId;
			var destinationResourceId = row.destinationResourceId;
			var sourceId = row.sourceId;
			var destinationId = row.destinationId;
			var sType = row.sourceType;
			var dType = row.destinationType;
			async.series([
				function(callback){
					if (sourceResourceId !== resourceId) {
						var d = data[sourceResourceId] ? data[sourceResourceId] : {"amount":0, "type":sType, "resource":sourceResourceId}
						d.amount+=1;
						getSourceTag({"sourceId":sourceId}, function(tagList){
							d.tags = d.tags ? d.tags.concat(tagList) : tagList;
							data[sourceResourceId]=d;
							next(null);
						});
					};
					callback(null);
				},
				function(callback){
					if (destinationResourceId !== resourceId) {
						var d = data[destinationResourceId] ? data[destinationResourceId] : {"amount":0, "type":dType, "resource":destinationResourceId}
						d.amount+=1;
						getDestinationTag({"destinationId":destinationId}, function(tagList){
							d.tags = d.tags ? d.tags.concat(tagList) : tagList;
							data[destinationResourceId]=d;
							next(null);
						});
					};
					callback(null);
				}
			]);
		}, function(){callback(data)});
	});
}

function insertSelector(resourceId, xPointer, callback){
	getResource({"id":resourceId}, function(result){
		if(result.length!==1){
			console.error("resource not found with ID; "+resourceId);
		} else {
			var query = "INSERT INTO selector(resourceId, xPointer) VALUES (?, ?);";
			insert(query, [resourceId, xPointer], callback);
		}
	});
}

function getSelector (where, callback) {
	var what = ["id", "resourceId", "xPointer"];
	var from = "selector";
	select(what, from, where, callback);
}

function addSelector(resourceId, xPointer, callback) {
	getSelector({"resourceId":resourceId, "xPointer":xPointer}, function(result){
		if(result.length===0){ //didn't exist yet -> create it && return id
			insertSelector(resourceId, xPointer, callback);
		} else if(result.length===1){ //already exist -> return id
			callback(result.item(0).id);
		} else { //should not happen -> error
			console.error("addSelector: Non unique identifier");
		}
	});
}

function addSource(hyperlinkId, selectorId, callback){
	getHyperlink({"id":hyperlinkId}, function(result){
		if(result.length!==1){
			console.error("hyperlink not found with ID; "+hyperlinkId);
		} else {
			getSelector({"id":selectorId}, function(result){
				if(result.length!==1){
					console.error("selector not found with ID; "+selectorId);
				} else {
					var query = "INSERT INTO source(hyperlinkId, selectorId) VALUES (?, ?);";
					insert(query, [hyperlinkId, selectorId], callback);
				}
			});
		}
	});
}

function getSource (where, callback) {
	var what = ["id", "selectorId","hyperlinkId"];
	var from = "source";
	select(what, from, where, callback);
}

function addDestination(hyperlinkId, selectorId, callback){
	getHyperlink({"id":hyperlinkId}, function(result){
		if(result.length!==1){
			console.error("hyperlink not found with ID; "+hyperlinkId);
		} else {
			getSelector({"id":selectorId}, function(result){
				if(result.length!==1){
					console.error("selector not found with ID; "+selectorId);
				} else {
					var query = "INSERT INTO destination(hyperlinkId, selectorId) VALUES (?, ?);";
					insert(query, [hyperlinkId, selectorId], callback);
				}
			});
		}
	});
}

function getDestination (where, callback) {
	var what = ["id", "selectorId","hyperlinkId"];
	var from = "destination";
	select(what, from, where, callback);
}

initDB = function() {
	try {
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
		} else {
			var shortName = 'DEMODB';
			var version = '1.0';
			var displayName = 'DEMO Database';
			var maxSize = 1000000; //	bytes
			myDb = openDatabase(shortName, version, displayName, maxSize);
			createTables();
		}
	} catch(e) {

		if (e == 2) {
			// Version number mismatch.
			console.log("Invalid database version.");
		} else {
			console.log("Unknown error "+e+".");
		}
		return;
	}
}

function nullHandler(result){
	console.log(result);
}
function errorHandler(transaction, result){
	console.error("SQL error", result);
}

function createTables(transaction){
	var queries = [
		  'CREATE TABLE IF NOT EXISTS resource('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', url TEXT NOT NULL UNIQUE'
		+ ', type TEXT NOT NULL'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS selector('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', resourceId INTEGER NOT NULL'
		+ ', xPointer TEXT NOT NULL'
		+ ', FOREIGN KEY(resourceId) REFERENCES resource(id)'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS hyperlink('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', creator TEXT NOT NULL'
		+ ', createdAt TEXT NOT NULL' //as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS").
		+ ', visited INTEGER'
		+ ', rating INTEGER'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS tag('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', tag TEXT NOT NULL'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS source('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', selectorId INTEGER NOT NULL'
		+ ', hyperlinkId INTEGER NOT NULL'
		+ ', FOREIGN KEY(selectorId) REFERENCES selector(id)'
		+ ', FOREIGN KEY(hyperlinkId) REFERENCES hyperlink(id)'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS destination('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', selectorId INTEGER NOT NULL'
		+ ', hyperlinkId INTEGER NOT NULL'
		+ ', FOREIGN KEY(selectorId) REFERENCES selector(id)'
		+ ', FOREIGN KEY(hyperlinkId) REFERENCES hyperlink(id)'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS sourceTag('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', tagId INTEGER NOT NULL'
		+ ', sourceId INTEGER NOT NULL'
		+ ', FOREIGN KEY(tagId) REFERENCES tag(id)'
		+ ', FOREIGN KEY(sourceId) REFERENCES source(id)'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS destinationTag('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', tagId INTEGER NOT NULL'
		+ ', destinationId INTEGER NOT NULL'
		+ ', FOREIGN KEY(tagId) REFERENCES tag(id)'
		+ ', FOREIGN KEY(destinationId) REFERENCES destination(id)'
		+ ');'
		]
	for (var i = 0; i < queries.length; i++) {
		execute(queries[i]);
	};
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
