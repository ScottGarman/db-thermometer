function create_db_thermometer(id) {
	// don't accept empty parameters
	if ( $('#min').val() == "" ||
		 $('#max').val() == "" ||
		 $('#yellow_min').val() == "" ||
		 $('#red_min').val() == "" ) {
			alert("One of the required fields is empty");
			return;
	}

	// cleanup a pre-existing db thermometer
	$('#' + id).thermometer("destroy");

	// thermometer creation
	$('#' + id).thermometer({
		min: parseInt( $('#min').val() ),
		max: parseInt( $('#max').val() ),
		yellow_min: parseInt( $('#yellow_min').val() ),
		red_min: parseInt( $('#red_min').val() )
	});

	// allow the demo user to update the db thermometer's value
	$('#set_value').css('visibility', 'visible');
}

function update_db_thermometer(id, value) {
	$('#' + id).thermometer('option', 'value', parseInt( value ) );
}
