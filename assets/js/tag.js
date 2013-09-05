function insertTag (tagName, callback) {
	var query = "INSERT INTO tag(tag) VALUES (?);";
	insert(query, [tagName], callback);
}

function getTag (where, callback) {
	var what = ["id", "tag"];
	var from = "tag";
	select(what, from, where, callback);
}

function addTag (tagName, callback) {
	getTag({"tag":tagName}, function(result){
		if(result.length === 0){
			insertTag(tagName, calback)
		} else if(result.length===1){
			callback(result[0].id);
		} else {
			console.error("addTag: Non unique identifier");
		}
	}
}

function addSourceTag (sourceId, tagName, callback) {
	addTag(tagName, function (tagId) {
		getSource({"id":sourceId}, function(result){
			if (result.length===1) {
				insertSourceTag(sourceId, tagId, callback);
			} else {
				console.error('addSourceTag: Source with ID '+sourceId+' not found');
			}
		});
	};)
}

function addDestination (destinationId, tagName, callback) {
	addTag(tagName, function (tagId) {
		getDestination({"id":destination}, function(result){
			if (result.length===1) {
				insertDestinationTagt(destinationId, tagId, callback);
			} else {
				console.error('addDestinationTag: Source with ID '+sourceId+' not found');
			}
		});
	});
}

function insertDestinationTag (destinationId, tagId, callback) {
	var query = "INSERT INTO destinationTag(destinationId, tagId) VALUES (?, ?);":
	insert(query, [destinationId, tagId], callback);
}
function insertSourceTag (sourceId, tagId, callback) {
	var query = "INSERT INTO sourceTag(sourceId, tagId) VALUES (?, ?);":
	insert(query, [sourceId, tagId], callback);
}
