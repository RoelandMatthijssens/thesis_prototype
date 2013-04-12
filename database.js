var Database = function(){
	var myDb = false;
}
Database.prototype.initDB = function() {
	try {
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
		} else {
			var shortName = 'DEMODB';
			var version = '1.0';
			var displayName = 'DEMO Database';
			var maxSize = 1000000; //	bytes
			this.myDb = openDatabase(shortName, version, displayName, maxSize);
			this.createTables();
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
Database.prototype.createTables = function(){
	this.myDb.transaction(
		function (transaction) {
			var queries = [
				  'CREATE TABLE IF NOT EXISTS ranges('
				+ '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
				+ ', pageUrl TEXT NOT NULL'
				+ ', range TEXT NOT NULL'
				+ ');'

				, 'CREATE TABLE IF NOT EXISTS links('
				+ '  source INTEGER NOT NULL'
				+ ', destination INTEGER NOT NULL'
				+ ', FOREIGN KEY(source) REFERENCES ranges(id)'
				+ ', FOREIGN KEY(destination) REFERENCES ranges(id)'
				+ ');'
				]
			for (var i = 0; i < queries.length; i++) {
				transaction.executeSql( queries[i], [], this.nullDataHandler, this.errorHandler);
			};
		}
	);
}
Database.prototype.prePopulate = function(){
	this.myDb.transaction(
		function (transaction) {
			//Optional Starter Data when page is initialized
			var data1 = ["http://infogroep.be/","0/13/11/3/1/1/1/1/3/1/5/2/1:0,0/13/11/3/1/1/1/1/3/1/5/2/1:6"];
			var data2 = ["http://infogroep.be/","0/20/11/3/1/1/1/1/3/1/5/2/1:3,0/20/11/3/1/1/1/1/3/1/5/2/1:11"];
			var data3 = [1, 2]
			transaction.executeSql("INSERT INTO ranges(pageUrl, range) VALUES (?, ?);", [data1[0], data1[1]]);
			transaction.executeSql("INSERT INTO ranges(pageUrl, range) VALUES (?, ?);", [data2[0], data2[1]]);
			transaction.executeSql("INSERT INTO links(source, destination) VALUES (?, ?);", [data3[0], data3[1]]);
		}
	);
}

Database.prototype.selectRanges = function(url, callback){
	var db = this;
	this.myDb.transaction(
		function (transaction){
			transaction.executeSql("SELECT * FROM ranges where pageUrl = ? ;", [url], db.resultHandler(callback));
		}
	)
}

Database.prototype.selectDestinations = function(sourceId, callback){
	var db = this;
	this.myDb.transaction(
		function (transaction){
			transaction.executeSql("SELECT * FROM ranges, links WHERE ranges.id = links.destination AND links.source = ? ;", [sourceId], db.resultHandler(callback));
		}
	);
}

Database.prototype.saveRange = function(url, range){
	console.log("insert into ranges", url, range)
	var db = this;
	this.myDb.transaction(
		function(transaction){
			transaction.executeSql("INSERT INTO ranges(pageUrl, range) VALUES (?, ?);", [url, range], db.nullDataHandler);
		}
	)
}

Database.prototype.insertLink = function(sourceId, destinationId){
	console.log("insert into links", sourceId, destinationId);
	var db = this;
	this.myDb.transaction(
		function(transaction){
			transaction.executeSql("INSERT INTO links(source, destination) VALUES (?, ?);", [sourceId, destinationId], db.nullDataHandler);
		}
	)
}

Database.prototype.saveUniDirectionalLink = function(originData, destinationList){
	console.log("insert into ranges, links", originData, destinationList);
	var db = this;
	var insertRangeQuery = "INSERT INTO ranges(pageUrl, range) VALUES (?, ?);"
	var insertLinkQuery = "INSERT INTO links(source, destination) VALUES (?, ?);"
	this.myDb.transaction(
		function(transaction){
			transaction.executeSql(insertRangeQuery, [originData.url, originData.selection], function(transaction, result){
				var originId = result.insertId;
				console.log("originid", originId);
				for(var i = 0; i < destinationList.length; i++){
					var destination = destinationList[i];
					transaction.executeSql(insertRangeQuery, [destination.url, destination.selection], function(transaction, result){
					var destinationId = result.insertId;
					console.log("destid", destinationId);
						transaction.executeSql(insertLinkQuery, [originId, destinationId], db.nullDataHandler);
					});
				}
			});
		}
	)
}

Database.prototype.resultHandler = function(callback){
	var resultFunction = function(transaction, results){
		for (var i=0; i<results.rows.length; i++) {
			var row = results.rows.item(i);
			callback(row);
		}
	}
	return resultFunction;
}

Database.prototype.dropTables = function(){
	var db = this;
	this.myDb.transaction(
		function(transaction){
			transaction.executeSql("DROP TABLE links;", [], db.nullDataHandler, db.errorHandler);
			transaction.executeSql("DROP TABLE ranges;");
		}
	)
}

Database.prototype.nullDataHandler = function (transaction, results) {
	console.log(results);
}
Database.prototype.errorHandler = function (transaction, error) {
	alert("Error processing SQL: "+error);
	return true;
}
