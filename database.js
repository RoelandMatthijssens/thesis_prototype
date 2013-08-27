var myDb = false;

function execute(query, params, successHandler, errorHandler){
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
	query += wwhere.join(" and ");
	console.log(query);
	execute(query, [], function(transaction, results){
		for (var i = 0; i < results.rows.length; i++) {
			tempRes = {};
			for (var j = 0; j < what.length; j++) {
				tempRes[what[j]] = results.rows.item(i)[what[j]];
			};
			console.log(tempRes);
			result[i] = tempRes;
		};
		callback(transaction, result);
	});
}

function dropTables(){
	var tables = ["resource", "selector", "source", "destination", "hyperlink", "sourceTag", "destinationTag", "tag"];
	for (var i = 0; i < tables.length; i++) {
		var table = tables[i];
		var query = "DROP TABLE " + table + ";";
		execute(query, [], nullHandler, errorHandler);
	}
}

function addResource(url, type, callback){
	var query = "INSERT INTO resource(url, type) VALUES (?, ?);";
	insert(query, [url, type], callback);
}

function getResource(where, callback){
	var what = ["id", "url", "type"];
	var from = "resource";
	select(what, from, where, callback);
}

function addSelector(resourceId, xPointer, callback){
	getResource({"id":resourceId}, function(tx, result){
		if(result.length!=1){
			console.error("resource not found with ID; "+resourceId);
		} else {
			var query = "INSERT INTO selector(resourceId, xPointer) VALUES (?, ?);";
			insert(query, [resourceId, xPointer]);
		}
	});
}

function getSelectors(where, callback){
	var what = ["id", "resourceId", "xPointer"];
	var from = "selector";
	select(what, from, where, callback);
}

function addHyperlink(creator, callback){
	var query = "INSERT INTO hyperlink(creator, createdAt, visited) VALUES (?, ?, ?);";
	var date = new Date();
	insert(query, [creator, date.toISOString(), 0], callback);
}

function getHyperlink(where, callback){
	var what = ["creator", "createdAt", "visited"];
	var from = "hyperlink";
	select(what, from, where, callback);
}

function addSource(hyperlinkId, selectorId, callback){
	getHyperlink({"id":hyperlinkId}, function(tx, result){
		if(result.length!=1){
			console.error("hyperlink not found with ID; "+hyperlinkId);
		} else {
			getSelectors({"id":selectorId}, function(tx, result){
				if(result.length!=1){
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
	console.error("SQL error");
	console.error(result);
}

function createTables(transaction){
	var queries = [
		  'CREATE TABLE IF NOT EXISTS resource('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', url TEXT NOT NULL'
		+ ', type TEXT NOT NULL'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS selector('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', resourceId INTEGER NOT NULL'
		+ ', xPointer INTEGER NOT NULL'
		+ ', FOREIGN KEY(resourceId) REFERENCES resource(id)'
		+ ');',

		  'CREATE TABLE IF NOT EXISTS hyperlink('
		+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
		+ ', creator TEXT NOT NULL'
		+ ', createdAt TEXT NOT NULL' //as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS").
		+ ', visited INTEGER NOT NULL'
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
		execute(queries[i], [], nullHandler, errorHandler);
	};
}
