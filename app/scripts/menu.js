define(['jquery'], function($) {
	'use strict';

	$(document).ready(function (){
		$('#menu-link').on('click', function(){
			if ($('#menu').hasClass('active-menu')) {
				$('#menu').removeClass('active-menu');
			} else {
				$('#menu').addClass('active-menu');
			}
		});
	});

	return 'Click Handler Added';
});