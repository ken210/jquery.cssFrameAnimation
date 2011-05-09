/**
 * @author Ken
 * ken210.com / @ken_rosaka
 * version 0.3 - 05-09-2011
 * 
 * emulate a timeline based animation using css classes
 * updates, examples and usage: https://github.com/ken210/
 * 
 */

(function($){
	
$.fn.cssFrameAnimation = function(options) {
	
	var defaults = {

		fps : 40,
		
		// default to hover animation
		animEvent : 'hover',
		
		// callback function defaults to none
		complete : undefined
		
	};
	
	// merge defaults with options
	$.extend(defaults, options);
	
	return this.each(function() {
		
		var element = this,
		
			// backup default element classes
			elemClasses = this.className,
		
			interval,
			
			// at last 1 frame
			currentFrame = 1,
			totalFrames = parseInt($(this).data('frames'), 10) || 1,
			
			// direction of the animation, default to normal (first frames first)
			ascending = true,
			
			cssClass = '',
			
			setClass = function() {
				
				// concatenate the old classes plus the new classes
				var classToSet = elemClasses + ' ' + defaults.animEvent + currentFrame;

				// remove any frame css class
				$(element).removeClass();
				
				//and add the new css class. 
				$(element).addClass(classToSet);
				
			},
			
			enterFrame = function (skip) {
				
				// if is a forward animation and has frames left
				if (ascending && currentFrame < totalFrames) {
	
					setClass();
					currentFrame++;
				
				// if is a backward animation and has frames left
				} else if (!ascending && currentFrame > 1) {
					
					setClass();
					currentFrame--;
					
				} else {
					
					stop(skip);
					
				}
				
			},
			
			play = function(skip) {
				
				interval = setInterval(enterFrame, 1000 / defaults.fps, skip);
	
			},
			
			stop = function(skip) {
				
				clearInterval(interval);
				setClass(elemClasses);
				
				// callback function
				if ($.isFunction(defaults.complete) && skip)
					defaults.complete.call(this);
					
			},
			
			// had to catch event data to prevent callback function to be invoked 2 times on mouser/mouseout events
			forward = function(event) {
				
				stop();
				ascending = true;
				play(event.data.skip);
				
			},

			backward = function() {

				stop();
				ascending = false;
				play();
				
			},
			
			// self-executable init function
			init = (function() {
				
				// if is a hover animation we have 2 listeners - mouseover and mouseout
				if (defaults.animEvent == 'hover') {
				
					$(element).bind('mouseover', {skip: true}, forward);
					$(element).bind('mouseout', backward);
					
				// if is another event, the animation plays just 1 time
				} else {
					
					$(element).bind(defaults.animEvent, forward);
					
				}
				
			})();
		
	});
	
};
	
})(jQuery);