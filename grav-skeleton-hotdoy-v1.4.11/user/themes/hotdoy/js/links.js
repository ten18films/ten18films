(function ($) {
	'use strict';

	var links = function(){
		let links = $('a[href^=http]');
		links.each(function(){
			$(this).attr({
				target: '_blank',
				rel: 'noopener'
			});
		})
	}

	var init = function () {
		links();
	};

	$(init);
})(jQuery);
