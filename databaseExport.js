Database.prototype.dropTables = function(){
	this.myDb.transaction(dropTables);
}

Database.prototype.createTables = function(){
	this.myDb.transaction(createTables);
}

Database.prototype.addResource = addResource//function(url, type){
	//this.myDb.transaction(function(t){addResource(t, url, type)});
//}

Database.prototype.getResource = function(url){
	this.myDb.transaction(function(t){getResource(t, url)});
}
