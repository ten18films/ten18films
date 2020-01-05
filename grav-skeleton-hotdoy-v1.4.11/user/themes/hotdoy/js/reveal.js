(function ($) {
	'use strict';
	var reveal = function(){
		const elements = document.querySelectorAll('[data-reveal]');
		const observerConfig = {rootMargin: '-30px', threshold: 0.1};
		let initialDelay = document.querySelector('[data-reveal-initialdelay]');
		let observer = new IntersectionObserver(onIntersection, observerConfig);
				
		if (initialDelay != null) {
			initialDelay = initialDelay.getAttribute('data-reveal-initialdelay');
			elements.forEach(el => {
				el.classList.add('unrevealed');
			});
			setTimeout(function(){
				elements.forEach(el => {
					observer.observe(el);
				});
			}, initialDelay);
		} else{
			elements.forEach(el => {
				observer.observe(el);
			});
		}

		function onIntersection(elements) {
	  		elements.forEach(el => {
				if (el.intersectionRatio > 0) {
					let target = el.target;
					observer.unobserve(target);
			  		if (target.classList.contains('unrevealed')) {
			  			let revealClass = target.getAttribute('data-reveal');
			  			if (revealClass.length) {
			  				let revealClassArray = revealClass.split(" ");
			  				el.target.classList.add(...revealClassArray);

                              let style = getComputedStyle(target);
                              let animationDuration = parseFloat(style.animationDuration.slice(0,-1));
                              let animationDelay = parseFloat(style.animationDelay.slice(0,-1));
                              let totalDelay = (animationDuration + animationDelay) * 1000;
                              console.log(totalDelay);
                              setTimeout(function(){ 
                                  target.classList.remove('unrevealed');
                              }, totalDelay);

			  			} else{
			  				target.classList.add('reveal');
			  				target.classList.remove('unrevealed');
			  			}
			   		}
				}
				else{
					if (initialDelay == null) {
						target.classList.add('unrevealed');
					}
				}
			});
		}
	}

	var init = function () {
		reveal();
	};

	$(init);
})(jQuery);
