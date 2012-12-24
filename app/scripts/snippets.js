define(['jquery'], function($) {
	'use strict';

	$(document).ready(function(){
		
		$('.snippet-header').on('click', function(){
			$(this).next().slideToggle();
		});

		$('.copy-link').on('click', function(e){
			e.preventDefault();
			$(this).next().select();
			var offset = $(this).next().offset();
			$('#copy-helper').css({
				left: offset.left,
				top: offset.top
			}).clearQueue().stop().fadeIn().delay(1000).fadeOut(200);
		});

		$('.copy-text-field').on('click', function(){
			$(this).select();
			var offset = $(this).offset();
			$('#copy-helper').css({
				left: offset.left,
				top: offset.top
			}).clearQueue().stop().fadeIn().delay(1000).fadeOut(200);
		});
	});
});