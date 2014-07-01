jQuery.noConflict()( function($){
	"use strict";
	
	var comingSoonCore = {
		
		/**
			Constructor
		**/
		initialize: function() {

			this.build();
			this.events();

		},
		/**
			Build page elements, plugins init
		**/
		build: function() {
		
			// Countdown timer
			$("#countdown").countdown({
				date: "8 Jul 2014 00:00:00",
				format: "on"
			},
			function() {
				// callback function
			});
		
		},
		/**
			Set page events
		**/
		events: function() {
		
			
		}
		
	}
	
	comingSoonCore.initialize();
	
});