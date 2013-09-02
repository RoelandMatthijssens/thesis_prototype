function populateResources (amount, callback) {
	async.timesSeries(amount, function(i, next){
		var randomIndex = randomNumber(1, 100);
		var url = urls[randomIndex];
		addResource(url, randomType(), function(_){
			if(i<amount-1){
				next(null);
			} else {
				callback();
			}
		});
	});
}

function populateSelectorsResource (resourceId, amount, callback) {
	async.timesSeries(amount, function(i, next){
		addSelector(resourceId, randomString(10), function(_){
			if (i<amount-1){
				next(null);
			} else {
				callback();
			};
		});
	});
}

function populateSelectors (amount, callback) {
	getResource({}, function(resources){
		async.timesSeries(resources.length, function(i, outerNext){
			async.timesSeries(amount, function(j, innerNext){
				addSelector(resources[i].id, randomString(10), function(_){
					if(j<amount-1){
						innerNext(null);
					} else if(i<resources.length-1) {
						outerNext(null);
					} else {
						callback();
					}
				});
			});
		});
	});
}

function populateHyperlinks (amount, callback) {
	async.timesSeries(amount, function(i, next){
		insertHyperlink("System", function(x){});
		if(i<amount-1){
			next(null);
		} else {
			callback();
		}
	});
}

function populateSources (amount, callback) {
	getHyperlink({}, function(hyperlinks){
		for (var i = 0; i < hyperlinks.length; i++) {
			!function(i){
				getSelector({}, function(selectors){
					console.log(selectors);
					for (var j = 0; j < amount; j++) {
						!function(j){
							var randomIndex = randomNumber(0, selectors.length-1);
							var selector = selectors[randomIndex];
							console.log(selectors);
							console.log(selector);
							addSource(hyperlinks[i].id, selector.id, function(x){});
						}(j);
					};
				});
			}(i);
		};
		callback();
	});
}

function populateAll (amount) {
	async.series([
		function(callback){populateResources(amount, callback)}
		,function(callback){populateHyperlinks(amount, callback)}
		,function(callback){populateSelectors(amount, callback)}
		,function(callback){populateSources(amount, callback)}
	]);
}

function randomType () {
	var types = ["html", "pdf", "image", "video", "audio", "paper"];
	return types[randomNumber(0, types.length-1)];
}

function fillPage (url, amount, callback) {
	addResource(url, randomType(), function(resourceId){
		async.timesSeries(amount, function(i, nextSelector){
			addSelector(resourceId, randomString(10), function(selectorId){
				insertHyperlink("System", function(hyperlinkId){
					addSource(hyperlinkId, selectorId, function(sourceId){
						getResource({}, function(resources){
							var resource = resources[randomNumber(0, resources.length-1)];
							addSelector(resource.id, randomString(10), function(destinationSelectorId){
								addDestination(hyperlinkId, destinationSelectorId, function(destinationId){
									if (i<amount-1) {
										console.log("hyperlink created on page "+url+":"+i);
										nextSelector();
									} else{
										callback();
									};
								});
							});
						});
					});
				});
			});
		});
	});
}
