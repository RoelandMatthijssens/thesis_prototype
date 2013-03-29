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
//			selectAll();
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
			transaction.executeSql(
				  'CREATE TABLE IF NOT EXISTS ranges(id INTEGER NOT NULL PRIMARY KEY, pageUrl TEXT NOT NULL, range TEXT NOT NULL);'
				, []
				, this.nullDataHandler
				, this.errorHandler);
		}
	);
	this.prePopulate();
}
Database.prototype.prePopulate = function(){
	this.myDb.transaction(
		function (transaction) {
			//Optional Starter Data when page is initialized
			var data = ["1","http://infogroep.be/","0/13/11/3/1/1/1/1/3/1/5/2/1:0,0/13/11/3/1/1/1/1/3/1/5/2/1:6"];
			var data2 = ["2","http://infogroep.be/","0/20/11/3/1/1/1/1/3/1/5/2/1:3,0/20/11/3/1/1/1/1/3/1/5/2/1:11"];
			transaction.executeSql("INSERT INTO ranges(id, pageUrl, range) VALUES (?, ?, ?)", [data[0], data[1], data[2]]);
			transaction.executeSql("INSERT INTO ranges(id, pageUrl, range) VALUES (?, ?, ?)", [data2[0], data2[1], data2[2]]);
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

Database.prototype.resultHandler = function(callback){
	console.log(callback);
	var resultFunction = function(transaction, results){
		for (var i=0; i<results.rows.length; i++) {
			var row = results.rows.item(i);
			console.log(row);
			callback(row);
		}
	}
	return resultFunction;
}

databaseResult = null;

Database.prototype.dropTables = function(){
	this.myDb.transaction(
		function(transaction){
			transaction.executeSql("DROP TABLE ranges;");
		}
	)
}

Database.prototype.nullDataHandler = function (transaction, results) {
}
Database.prototype.errorHandler = function (transaction, error) {
	alert("Error processing SQL: "+error);
	return true;
}
