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
			var data = ['1','http://localhost/prototypes/content.html','0/7/2:77,0/3/7/2:43{cd072ecd}'];
			transaction.executeSql("INSERT INTO ranges(id, pageUrl, range) VALUES (?, ?, ?)", [data[0], data[1], data[2]]);
		}
	);
}
Database.prototype.nullDataHandler = function (transaction, results) {
}
Database.prototype.errorHandler = function (transaction, error) {
	alert("Error processing SQL: "+error);
	return true;
}
