var myDb = false;
var debug = false;

function execute(query, params, successHandler, errorHandler){
	//console.log(query);
	myDb.transaction(function(transaction){
		transaction.executeSql(query, params, successHandler, errorHandler);
	});
}

function insert(query, params, callback){
	execute(query, params, callback, errorHandler);
}

function select(what, from, where, callback){
	var result = [];
	var query = "SELECT * FROM "+from+" WHERE ";
	var wwhere = []
	for(var key in where){
		wwhere.push(key+" = \""+where[key]+"\"");
	}
	var model = from.capitalise
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
		callback(transaction, results);
	});
}

function dropTables(callback){
	var tables = ["resource", "selector", "source", "destination", "hyperlink", "sourceTag", "destinationTag", "tag"];
	for (var i = 0; i < tables.length; i++) {
		var table = tables[i];
		var query = "DROP TABLE " + table + ";";
		execute(query, [], callback, errorHandler);
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
	getResource({"url":url}, function(tx, result){
		console.log(result.rows.length, result.rows.length===1);
		if(result.rows.length===0){ //didn't exist yet -> create it && return id
			insertResource(url, type, function(tx, r){
				callback(r.insertId);
			});
		} else if(result.rows.length===1){ //already exist -> return id
			callback(result.rows.item(0).id);
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

function insertSelector(resourceId, xPointer, callback){
	getResource({"id":resourceId}, function(tx, result){
		if(result.rows.length!==1){
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
	getSelector({"resourceId":resourceId, "xPointer":xPointer}, function(tx, result){
		if(result.rows.length===0){ //didn't exist yet -> create it && return id
			insertSelector(resourceId, xPointer, function(tx, r){
				callback(r.insertId);
			});
		} else if(result.rows.length===1){ //already exist -> return id
			callback(result.rows.item(0).id);
		} else { //should not happen -> error
			console.error("addSelector: Non unique identifier");
		}
	});
}

function getSelectors(where, callback){
	var what = ["id", "resourceId", "xPointer"];
	var from = "selector";
	select(what, from, where, callback);
}


function addSource(hyperlinkId, selectorId, callback){
	getHyperlink({"id":hyperlinkId}, function(tx, result){
		if(result.rows.length!==1){
			console.error("hyperlink not found with ID; "+hyperlinkId);
		} else {
			getSelectors({"id":selectorId}, function(tx, result){
				if(result.rows.length!==1){
					console.error("selector not found with ID; "+selectorId);
				} else {
					var query = "INSERT INTO source(hyperlinkId, selectorId) VALUES (?, ?);";
					insert(query, [hyperlinkId, selectorId], callback);
				}
			});
		}
	});
}

function addDestination(hyperlinkId, selectorId, callback){
	getHyperlink({"id":hyperlinkId}, function(tx, result){
		if(result.length!=1){
			console.error("hyperlink not found with ID; "+hyperlinkId);
		} else {
			getSelectors({"id":selectorId}, function(tx, result){
				if(result.length!=1){
					console.error("selector not found with ID; "+selectorId);
				} else {
					var query = "INSERT INTO destination(hyperlinkId, selectorId) VALUES (?, ?);";
					insert(query, [hyperlinkId, selectorId], callback);
				}
			});
		}
	});
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

function nullHandler(transaction, result){
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
