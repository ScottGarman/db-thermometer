/*
 * jQuery UI DB Thermometer
 *
 * Depends:
 *  ui.core.js
 */

(function($) {

$.widget("ui.thermometer", {

	_init: function() {
		if ( !this._check_options() ) {
			this.destroy();
			return;
		}

		var num_segments = this.options.max - this.options.min - 1;
		
		this.element.addClass("ui-thermometer");

		// fill in with segments
		for(var i=num_segments; i>=0; i--) {
			var seg_value = this.options.min + i;

			var label_left = "<div class='label-left'></div>";
			var label_right = "<div class='label-right'></div>";

			if(seg_value == this.options.yellow_min || seg_value == this.options.red_min) {
				// FIXME: figure out CSS to do this w/o classes based
				// on the number of digits in the segment value
				label_left = "<div class='label-left single-digit'>" + seg_value + "</div>";
				if(seg_value >= 100) {
					label_left = "<div class='label-left triple-digit'>" + seg_value + "</div>";
				} else if(seg_value >= 10) {
					label_left = "<div class='label-left double-digit'>" + seg_value + "</div>";
				}
			}

			// right side labels are shown for values divisible by 5
			if(seg_value % 5 == 0) {
				label_right = "<div class='label-right'>" + seg_value + "</div>";
			}

			// segment color
			var seg_color = "green";
			if(seg_value >= this.options.red_min) {
				seg_color = "red";
			} else if(seg_value >= this.options.yellow_min) {
				seg_color = "yellow";
			}

			this.element.append("<div class='segment " + seg_color + "'>" + label_left + label_right + "</div>");
		}

		// add the current value indicator
		this.element.append("<div id='current_val_indicator' class='" + this.options.size + "'><span id='current_value'></span></div>");
		this._set_value(this.options.min);
	},

	destroy: function() {
		this.element.removeClass("ui-thermometer");

		this.element.html("");
		$.widget.prototype.destroy.apply(this);
	},

	val: function() {
		return this.options.value;
	},

	_setData: function(key, value) {
		if (key == "value") {
			this._set_value(value);
		}
	},

	_set_value: function(value) {
		if (this.options.value == value)
			return;

		this.options.value = value;

		var display_value = this.options.value;
		var normalized_value = this.options.value;

		if (this.options.value > this.options.max) {
			display_value = ">" + this.options.max;
			normalized_value = this.options.max;
		} else if (this.options.value < this.options.min) {
			display_value = "<" + this.options.min;
			normalized_value = this.options.min;
		}

		// I don't think I'm supposed to use $ here:
		$('#current_value').html(display_value);

		// FIXME: segment height either needs to be set as a widget
		// parameter or infer it from CSS
		var seg_height = 35;

		// align the current value pointer to the correct segment
		var steps = normalized_value - this.options.min;
		var offset = -40 - (steps * seg_height) - (1 * steps);
		$('#current_val_indicator').animate({
			top: offset + "px"
		}, 350);

	},

	// sanity checks on the db thermometer parameters
	_check_options: function() {
		if (this.options.min >= this.options.max) {
			alert("Error: max must be greater than min");
			return false;
		}
		if (this.options.red_min < this.options.yellow_min) {
			alert("Error: red_min must be greater than yellow_min");
			return false;
		}
		if (this.options.yellow_min < this.options.min || this.options.red_min < this.options.min) {
			alert("Error: yellow_min and red_min must be greater than min");
			return false;
		}
		if (this.options.yellow_min > this.options.max || this.options.red_min > this.options.max) {
			alert("Error: yellow_min and red_min must be less than max");
			return false;
		}

		// ensure initial value is at least the range minimum
		if (this.options.value < this.options.min)
			this.options.value = this.options.min;

		return true;
	}

});

$.extend($.ui.thermometer, {
	getter: "value",
	getter: "yellow_min",
	getter: "red_min",
	defaults: {
		min: 0,
		max: 10,
		yellow_min: 5,
		red_min: 8
	}
});

})(jQuery);
