/*
 * Copyright (C) 2011 Ken Rosaka
 * All rights reserved.
 * 
 * jquery.cssFrameAnimation - A jQuery plugin to emulate a timeline base animation using css classes
 * 
 * Author: Ken Rosaka (ken210.com / @ken_rosaka)
 * Version: 0.4 alpha
 * Created: 2011-04-29
 * Release: 2011-05-09
 * Last update: 2011-05-10 
 * License: http://www.gnu.org/licenses/gpl.html
 * 
 * Updates, examples and usage: http://github.com/ken210/jquery.cssFrameAnimation
 */

(function($){$.fn.cssFrameAnimation=function(options){var defaults={fps:40,animationEvent:'hover',ascending:true,complete:undefined};$.extend(defaults,options);return this.each(function(){var element=this,elemClasses=this.className,totalFrames=parseInt($(this).data('frames'),10)||1,currentFrame=(defaults.ascending)?1:totalFrames,stop=function(){$(element).removeClass().addClass(elemClasses);($.isFunction(defaults.complete)&&defaults.ascending)&&defaults.complete.call(this)},play=function(event){currentFrame+=event.data.ascending&&currentFrame<totalFrames?1:(!event.data.ascending&&currentFrame>1?-1:0);if(currentFrame==1||currentFrame==totalFrames){stop();return false}var classToSet=elemClasses+' '+defaults.animationEvent+currentFrame;$(element).removeClass().addClass(classToSet);setTimeout(play,1000/defaults.fps,event)},init=(function(){defaults.animationEvent=='hover'?$(element).bind('mouseover',{ascending:defaults.ascending},play).bind('mouseout',{ascending:!defaults.ascending},play):$(element).bind(defaults.animationEvent,{ascending:defaults.ascending},play)})()})}})(jQuery);