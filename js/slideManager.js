/**
 * slideManager.js 
 * Responsible for maintaining slide queue.
 *
 * Supports 4 main functions - init, next, prev, and jump
 * All slide changes are automatically animated.
 *
 * USAGE
 * slideManager.init(); must be called first.
 * slideManager.next(); moves to next slide.
 * slideManager.prev(); moves to previous slide.
 * slideManager.jump(n); jumps to nth slide.
 * 
 **/

var slideManager = (function(){

	// Intialize a few local variables
	var slides = [],
		slideMax = -1,
		prevSlide = 0,
		currentSlide = 0;

	// Collect data from the DOM, and make the first slide visible.
	var init = function(){
		slides = $('.slide');
		slideCount = slides.length;
		slides.attr('data-slide-state', 'hidden');
		jump(0);
	};

	// Handle transition animation by manipulating slide-state attribute
	function transitionSlides(){
		$('[data-slide-state=previous]').attr('data-slide-state', 'hidden');
		slides[prevSlide].setAttribute('data-slide-state', 'previous');
		slides[currentSlide].setAttribute('data-slide-state', 'current');
	}

	// Switch to the next slide.
	var next = function(){
		prevSlide = currentSlide;
		currentSlide ++;
		if (currentSlide >= slideCount) currentSlide = 0;

		transitionSlides();
		return currentSlide;
	};

	// Switch to the previous slide
	var prev = function(){
		prevSlide = currentSlide;
		currentSlide --;
		if (currentSlide < 0) currentSlide = slideCount -1;

		transitionSlides();
		return currentSlide;
	};

	// Jump to the nth slide
	var jump = function(n){
		if (0 <= n && n < slideCount){
			prevSlide = currentSlide;
			currentSlide = n;
		}

		transitionSlides();
		return currentSlide;
	};

	return {
		currentSlide: function(){ return currentSlide;},
		init: init,
		next: next,
		prev: prev,
		jump: jump
	};

})();