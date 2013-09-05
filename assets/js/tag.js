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
			insertTag(tagName, callback)
		} else if(result.length===1){
			callback(result[0].id);
		} else {
			console.error("addTag: Non unique identifier");
		}
	});
}

function addSourceTag (sourceId, tagName, callback) {
	addTag(tagName, function (tagId) {
		getSource({"id":sourceId}, function(result){
			if (result.length===1) {
				getSourceTag({"sourceId":sourceId, "tagId":tagId}, function (result) {
					if (result.length>0) {
						console.log("addSourceTag: tag already added");
						callback();
					} else {
						insertSourceTag(sourceId, tagId, callback);
					}
				});
			} else {
				console.error('addSourceTag: Source with ID '+sourceId+' not found');
			}
		});
	});
}

function getSourceTag (where, callback) {
	var what = ["id", "sourceId", "tagId"];
	var from = "sourceTag";
	select(what, from, where, function(tagList){
		var result = [];
		async.timesSeries(tagList.length, function(i, next){
			var tag = tagList[i];
			getTag({"id":tag.tagId}, function(tags){
				tag.tagName = tags[0].tag;
				next(null);
			});
		}, function(){callback(tagList)});
	});
}

function addDestinationTag (destinationId, tagName, callback) {
	addTag(tagName, function (tagId) {
		getDestination({"id":destinationId}, function(result){
			if (result.length===1) {
				getDestinationTag({"destinationId":destinationId, "tagId":tagId}, function (result) {
					if (result.length>0) {
						console.log("addDestinationTag: tag already added");
						callback();
					} else {
						insertDestinationTag(destinationId, tagId, callback);
					}
				});
			} else {
				console.error('addDestinationTag: Source with ID '+sourceId+' not found');
			}
		});
	});
}

function getDestinationTag (where, callback) {
	var what = ["id", "destinationId", "tagId"];
	var from = "destinationTag";
	select(what, from, where, function(tagList){
		var result = [];
		async.timesSeries(tagList.length, function(i, next){
			var tag = tagList[i];
			getTag({"id":tag.tagId}, function(tags){
				tag.tagName = tags[0].tag;
				next(null);
			});
		}, function(){callback(tagList)});
	});
}

function insertDestinationTag (destinationId, tagId, callback) {
	var query = "INSERT INTO destinationTag(destinationId, tagId) VALUES (?, ?);";
	insert(query, [destinationId, tagId], callback);
}
function insertSourceTag (sourceId, tagId, callback) {
	var query = "INSERT INTO sourceTag(sourceId, tagId) VALUES (?, ?);";
	insert(query, [sourceId, tagId], callback);
}

function getTagUsage (tagName, callback) {
	var total = 0;
	getTag({"tag":tagName}, function(tags){
		var tagId = tags[0].id
		getSourceTag({"tagId":tagId}, function(sourceTags){
			total += sourceTags.length;
			getDestinationTag({"tagId":tagId}, function(destinationTags){
				total+=destinationTags.length;
				callback(total);
			});
		});
	});
}
