function addToContainer (element, containerId) {
	var container = $('#'+containerId);
	container.append(element);
}

function buildMultiLinkForm () {
	var formId = "multi_link"
	var f = buildForm(formId);
	for (var i = 0; i < sourceList.length; i++) {
		f.append(buildLabel("Source "+(i+1)));
		f.append(buildSelect(sourceList[i].tags));
		f.append(buildHr());
	};
	f.append(buildHr());
	for (var i = 0; i < destinationList.length; i++) {
		f.append(buildLabel("Destination "+(i+1)));
		f.append(buildSelect(destinationList[i].tags));
		f.append(buildHr());
	};
	f.append(buildButton("Create Link", function(){
		addHyperlink(sourceList, destinationList);
		$("#floating_form_"+formId).remove();
		clearSourceList();
		clearDestinationList();
	}));
	return f;
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

function buildSelect(optionList){
	var select = $(document.createElement('select'));
	select.addClass('chosen-select');
	select.attr('multiple');
	select.attr('tabindex', 3);
	for (var i = 0; i < optionList.length; i++) {
		select.append(buildOption(optionList[i]));
	};
	return select;
}

function buildOption (o) {
	var option = $(document.createElement('option'));
	option.attr("value", o);
	option.append(o);
	return option;
}

function buildButton (label, funct) {
	var button = $(document.createElement('input'));
	button.attr("type", "button");
	button.attr("value", label);
	button.on('click', funct);
	return button;
}
