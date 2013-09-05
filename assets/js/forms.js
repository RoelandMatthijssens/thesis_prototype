function addToContainer (element, containerId) {
	var container = $('#'+containerId);
	container.append(element);
	$(".chosen-select").chosen();
}

var sourceSelects =[];
var destinationSelects =[];

function buildMultiLinkForm (containerId) {
	var container = $('#'+containerId);
	var formId = "multi_link"
	var f = buildForm(formId);
	for (var i = 0; i < sourceList.length; i++) {
		f.append(buildLabel("Source "+(i+1)));
		var s = buildSelect();
		s.addClass("source");
		f.append(s);
		sourceSelects.push(s);
		f.append(buildHr());
	};
	f.append(buildHr());
	for (var i = 0; i < destinationList.length; i++) {
		f.append(buildLabel("Destination "+(i+1)));
		var s = buildSelect();
		s.addClass("destination");
		f.append(s);
		destinationSelects.push(s);
		f.append(buildHr());
	};
	f.append(buildButton("Create Link", function(){
		addHyperlink(sourceList, destinationList, getTagsFromForm());

		$("#floating_form_"+formId).remove();
		clearSourceList();
		sourceSelects = [];
		destinationSelects = [];
		clearDestinationList();
	}));
	fillTagSelects(function(){
		container.append(f);
		$(".chosen-select").chosen();
	});
}

function getTagsFromForm(){
	var res = {};
	for (var i = 0; i < sourceSelects.length; i++) {
		res["source_"+i] = sourceSelects[i].chosen().val();
	};
	for (var i = 0; i < destinationSelects.length; i++) {
		res["dest_"+i] = destinationSelects[i].chosen().val();
	};
	return res;
}

function fillTagSelects (callback) {
	var selects = sourceSelects.concat(destinationSelects);
	getTag({}, function (tags) {
		async.timesSeries(tags.length, function(i, done){
			async.timesSeries(selects.length, function(j, done2){
				var select = selects[j];
				var tag = tags[i];
				buildOption(tag.tag, function(option){
					select.append(option);
					if (j<selects.length-1) {
						done2(null);
					} else if (i<tags.length-1){
						done(null);
					} else {
						callback(null);
					};
				});
			});
		});
	});
}

function buildForm (id) {
	var container = $(document.createElement('div'));
	container.addClass("floating_form");
	container.attr('id', "floating_form_"+id);
	return container;
}

function buildHr () {
	var hr = $(document.createElement('hr'));
	return hr;
}

function buildLabel (string) {
	var label = $(document.createElement('span'));
	label.append(string);
	return label;
}

function buildTagSelect (callback) {
	getTag({}, function(tags){
		callback(buildSelect(tags));
	});
}

function buildSelect(){
	var select = $(document.createElement('select'));
	select.addClass('chosen-select');
	select.attr('multiple', '');
	select.attr('tabindex', 3);
	return select;
}

function buildOption (o, callback) {
	var option = $(document.createElement('option'));
	getTagUsage(o, function(amount){
		option.attr("value", o);
		option.append(o+" "+amount);
		callback(option);
	});
}

function buildButton (label, funct) {
	var button = $(document.createElement('input'));
	button.attr("type", "button");
	button.attr("value", label);
	button.on('click', funct);
	return button;
}
