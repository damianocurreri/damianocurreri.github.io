jQuery.noConflict()( function($){
	"use strict";

	var styleSwitcher = {
		
		/**
			Constructor
		**/
		initialize: function() {

			this.build();
			this.events();

		},
		
		/**
			Build elements, plugins init
		**/
		build: function() {
			
			var self = this;
			
			$('.style-switcher-scroller').scroller();
			
			/**
				Load available fonts
			**/
			
			var primaryFontChooser = $('#sswitcher-primary-font');
			var secondaryFontChooser = $('#sswitcher-secondary-font');
			
			primaryFontChooser.html('');
			secondaryFontChooser.html('');
			
			$.ajax({
        type: "GET",
        url: "fonts.xml",
        dataType: "xml",
        success: function( xml ) {
        	
        	$(xml).find("outline").each(function () {
        		var font = $(this).attr('text');
						primaryFontChooser.append( '<option value="' + font + '">' + font + '</option>' );
						secondaryFontChooser.append( '<option value="' + font + '">' + font + '</option>' );
					});
					 
					var primary_font = $.cookie('sswitcher_primary_font');
					var secondary_font = $.cookie('sswitcher_secondary_font');
			
					var updatePrimaryFont = false;
					var updateSecondaryFont = false;
			
					if( primary_font == undefined ) {
						primary_font = 'Roboto';
					} else {
						updatePrimaryFont = true;
					}
			
					primaryFontChooser.val( primary_font );
			
					if( secondary_font == undefined ) {
						secondary_font = 'Raleway';
					} else {
						updateSecondaryFont = true;
					}
			
					secondaryFontChooser.val( secondary_font );
			
					if( updatePrimaryFont == true || updateSecondaryFont == true ) {
						if( $('#font-' + primary_font ).length == 0 ) {
							$("head").append("<link id='font-" + primary_font + "' href='https://fonts.googleapis.com/css?family=" + primary_font + "' rel='stylesheet' type='text/css'>");
						}
			
						if( $('#font-' + secondary_font ).length == 0 ) {
							$("head").append("<link id='font-" + secondary_font + "' href='https://fonts.googleapis.com/css?family=" + secondary_font + "' rel='stylesheet' type='text/css'>");
						}
					}
					
					$('#sswitcher-primary-font, #sswitcher-secondary-font').each( function() {
						$( this ).selecter({
							customClass: "theme-select-input"
						});
					});
					
					/**
						Load changes
					**/
					var changeStyles = $.cookie('sswitcher_change');
			
					if( changeStyles != undefined ) {
			
						var all_caps = $.cookie('sswitcher_all_caps');
			
						var color_body = $.cookie('sswitcher_color_body');
			
						var color_dark_gray = $.cookie('sswitcher_color_dark_gray');
						var color_dark_gray_alt = $.cookie('sswitcher_color_dark_gray_alt');
						var color_light_gray = $.cookie('sswitcher_color_light_gray');
						var color_gray = $.cookie('sswitcher_color_gray');
						var color_alt_gray = $.cookie('sswitcher_color_alt_gray');
						var color_pink = $.cookie('sswitcher_color_pink');
						var color_white = $.cookie('sswitcher_color_white');
						var color_black = $.cookie('sswitcher_color_black');
				
						if( all_caps == 'uppercase' ) {
							$('#sswitcher-all-caps').attr('checked', 'checked').iCheck('check');
						} else {
							$('#sswitcher-all-caps').removeAttr('checked').iCheck('uncheck');
						}

						$('#sswitcher-color-0').data('color', color_body).css('background', color_body);
						$('#sswitcher-color-1').data('color', color_dark_gray).css('background', color_dark_gray);
						$('#sswitcher-color-2').data('color', color_dark_gray_alt).css('background', color_dark_gray_alt);
						$('#sswitcher-color-3').data('color', color_light_gray).css('background', color_light_gray);
						$('#sswitcher-color-4').data('color', color_gray).css('background', color_gray);
						$('#sswitcher-color-5').data('color', color_alt_gray).css('background', color_alt_gray);
						$('#sswitcher-color-6').data('color', color_pink).css('background', color_pink);
						$('#sswitcher-color-7').data('color', color_white).css('background', color_white);
						$('#sswitcher-color-8').data('color', color_black).css('background', color_black);
				
						self.compileLess();
					}
        	
        }
    	});
			
		},
		
		/**
			Set page events
		**/
		events: function() {
			
			var self = this;
			
			/**
				Open / close switcher
			**/
			$('#style-switcher a.opener').click( function() {
				$('#style-switcher').toggleClass('opened');
				return false;
			});
			
			/**
				Init color picker
			**/
			if( $('#style-switcher').length ) {
				$('#style-switcher .color-picker').each( function() {
					$( this ).colpick({
						colorScheme: 'dark',
						onSubmit: function(hsb,hex,rgb,el) {
							$(el).css('background-color', '#'+hex).data('color', '#'+hex );
							$(el).colpickHide();
						}
					});
				});

			}

			/**
				Apply custom styles
			**/
			$('#sswitcher-apply').click( function() {
				self.compileLess();
				return false;
			});
			
			/**
				Reset all styles to defaults
			**/
			$('#sswitcher-reset').click( function() {
				
				$('#sswitcher-primary-font').val('Roboto');
				$('#sswitcher-secondary-font').val('Raleway');
				
				$('#sswitcher-all-caps').attr('checked', 'checked').iCheck('check');
				
				$('#sswitcher-color-0').data('color', '#ffffff');
				$('#sswitcher-color-1').data('color', '#43474d');
				$('#sswitcher-color-2').data('color', '#f9f9f9');
				$('#sswitcher-color-3').data('color', '#f0f0f0');
				$('#sswitcher-color-4').data('color', '#999');
				$('#sswitcher-color-5').data('color', '#fbfbfb');
				$('#sswitcher-color-6').data('color', '#e0005f');
				$('#sswitcher-color-7').data('color', '#ffffff');
				$('#sswitcher-color-8').data('color', '#000000');
				
				$.removeCookie('sswitcher_color_body', { path: '/' } );
				
				$.removeCookie('sswitcher_primary_font', { path: '/' } );
				$.removeCookie('sswitcher_secondary_font', { path: '/' } );
				$.removeCookie('sswitcher_all_caps', { path: '/' } );
				
				$.removeCookie('sswitcher_color_dark_gray', { path: '/' } );
				$.removeCookie('sswitcher_color_dark_gray_alt', { path: '/' } );
				$.removeCookie('sswitcher_color_light_gray', { path: '/' } );
				$.removeCookie('sswitcher_color_gray', { path: '/' } );
				$.removeCookie('sswitcher_color_alt_gray', { path: '/' } );
				$.removeCookie('sswitcher_color_pink', { path: '/' } );
				$.removeCookie('sswitcher_color_white', { path: '/' } );
				$.removeCookie('sswitcher_color_black', { path: '/' } );
				
				$.removeCookie('sswitcher_change', { path: '/' } );
				
				self.compileLess();
				return false;
			});

			
		},
		
		/**************************************************************************************************************************************
			METHODS
		**************************************************************************************************************************************/
		/**
			Compile LESS
		**/
		compileLess: function() {
			
			var primary_font = $('#sswitcher-primary-font').val();
			var secondary_font = $('#sswitcher-secondary-font').val();
			
			var all_caps = $('#sswitcher-all-caps').is(':checked') ? 'uppercase' : 'none';
			
			var body_color = $('#sswitcher-color-0').data('color');
			var color_dark_gray = $('#sswitcher-color-1').data('color');
			var color_dark_gray_alt = $('#sswitcher-color-2').data('color');
			var color_light_gray = $('#sswitcher-color-3').data('color');
			var color_gray = $('#sswitcher-color-4').data('color');
			var color_alt_gray = $('#sswitcher-color-5').data('color');
			var color_pink = $('#sswitcher-color-6').data('color');
			var color_white = $('#sswitcher-color-7').data('color');
			var color_black = $('#sswitcher-color-8').data('color');
			
			
			
			$.cookie('sswitcher_primary_font', primary_font, { path: '/' } );
			$.cookie('sswitcher_secondary_font', secondary_font, { path: '/' } );
			$.cookie('sswitcher_all_caps', all_caps, { path: '/' } );
			
			$.cookie('sswitcher_color_body', body_color, { path: '/' } );
			
			$.cookie('sswitcher_color_dark_gray', color_dark_gray, { path: '/' } );
			$.cookie('sswitcher_color_dark_gray_alt', color_dark_gray_alt, { path: '/' } );
			$.cookie('sswitcher_color_light_gray', color_light_gray, { path: '/' } );
			$.cookie('sswitcher_color_gray', color_gray, { path: '/' } );
			$.cookie('sswitcher_color_alt_gray', color_alt_gray, { path: '/' } );
			$.cookie('sswitcher_color_pink', color_pink, { path: '/' } );
			$.cookie('sswitcher_color_white', color_white, { path: '/' } );
			$.cookie('sswitcher_color_black', color_black, { path: '/' } );
			
			$.cookie('sswitcher_change', 'yes', { path: '/' } );
			
			if( primary_font == null ) {
				primary_font = 'Roboto';
			}
			
			if( secondary_font == null ) {
				secondary_font = 'Raleway';
			}
			
			if( $('#font-' + primary_font ).length == 0 ) {
				$("head").append("<link id='font-" + primary_font + "' href='https://fonts.googleapis.com/css?family=" + primary_font + "' rel='stylesheet' type='text/css'>");
			}
			
			if( $('#font-' + secondary_font ).length == 0 ) {
				$("head").append("<link id='font-" + secondary_font + "' href='https://fonts.googleapis.com/css?family=" + secondary_font + "' rel='stylesheet' type='text/css'>");
			}
			
			$('#style-switcher a.opener i').addClass('fa-spin');
			
			less.modifyVars({
    		'@font-primary': primary_font,
    		'@font-secondary': secondary_font,
    		'@font-text-transform' : all_caps,
    		'@color-dark-gray' : color_dark_gray,
    		'@color-dark-gray-alt' : color_dark_gray_alt,
    		'@color-light-gray' : color_light_gray,
    		'@color-gray' : color_gray,
    		'@color-alt-gray' : color_alt_gray,
    		'@color-pink' : color_pink,
    		'@color-white' : color_white,
    		'@color-black' : color_black,
    		'@body-background' : body_color
			});
			
			$('#style-switcher a.opener i').removeClass('fa-spin');
			
		}
		
	}
	
	if( $('#style-switcher').length ) {
		styleSwitcher.initialize();
	}
	
});