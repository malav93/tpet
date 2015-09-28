/*---------------------------------------------------------------------*/
;(function($){
/*================= Global Variable Start =================*/		   
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var IEbellow9 = !$.support.leadingWhitespace;
var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);


	// Utilizing the Modernizr object created to implement placeholder functionality
	function hasPlaceholderSupport() {
	   var input = document.createElement('input');
	   return ('placeholder' in input);
	}
	
	$(document).ready(function(){
        
		if(!Modernizr.input.placeholder){ 
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$('[placeholder]').parents('form').submit(function() {
				$(this).find('[placeholder]').each(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
					}
				})
			});
		}
		$( 'a[href="#"]' ).click( function(e) {		
			e.preventDefault();
		});
		
		
		/*Navigation */
		if( $(".mainNav").length) {
			/*document.querySelector(".menu-toggle")
			  .addEventListener( "click", function() {
				this.classList.toggle( "active" );
			  });*/  
			
			$(".mainNav li a").each(function() {
				if ($(this).next().length) {
					$(this).parent().addClass("parent");
				};
			});
			
			$('#mainNav li').children('ul').hide();
			$('#mainNav li.first').addClass('active').find('ul:first').show();	
			$('#mainNav a').click(function() {	
				$(this).parent().siblings('.active').removeClass('active').find('ul').slideUp('fast');
				if ($(this).parent().hasClass('active')) {
					$(this).next('ul').slideUp('fast');
					$(this).parent().removeClass('active');
				} else {
					$(this).next('ul').slideDown('fast');
					$(this).parent().addClass('active');
				}	
			});
			
		};
		
		/*Search droupdown Code*/
		if( $(".search-form").length > 0){		
			$('.searchIcon').click(function() {
				if ($('.search-frmrow').css("display") == "block") {
					$(this).removeClass('active');
					$('.search-frmrow').slideUp();
				} else {
					$(this).addClass('active');
					$('.search-frmrow').slideDown();
				}
			});	
		}
		
		// Back to Top function
		if( $("#backtotop").length){
			$(window).scroll(function(){
				if ($(window).scrollTop()>120){
				$('#backtotop').fadeIn('250').css('display','block');}
				else {
				$('#backtotop').fadeOut('250');}
			});
			$('#backtotop').click(function(){
				$('html, body').animate({scrollTop:0}, '200');
				return false;
			});
		};
		
        $(".menu-toggle").on("click", ".clickme", function() {
            alert('hi');
			if ($(".menu-toggle").hasClass('active')){
				$(this).removeClass('active');
				$("#wrapper").removeClass('openMenu');
				$("html, body").removeClass('menuscoll');
			} else {
				$(this).addClass('active');
				$("#wrapper").addClass('openMenu');
				$("html, body").addClass('menuscoll');
			}
		}).click();
		
		//Reply Popup
		$('.reply-btn').click(function(){
			if ($('#reply-popup').hasClass('openPopup')){
				$('#reply-popup').hide();
				$('#reply-popup').removeClass('openPopup');
				$("html, body").removeClass('replyPopup');
			} else{
				$('#reply-popup').show();
				$('#reply-popup').addClass('openPopup');
				$("html, body").addClass('replyPopup');
			}
		});
		
		$('.close-reply').on('click', function(){
			$('#reply-popup').hide();
			$('#reply-popup').removeClass('openPopup');
		});
		
		//Edit Photo Popup
		$('.profedit-link a').click(function(){
			if ($('#editphoto-popup').hasClass('openPopup')){
				$('#editphoto-popup').hide();
				$('#editphoto-popup').removeClass('openPopup');
				$("html, body").removeClass('replyPopup');
			} else{
				$('#editphoto-popup').show();
				$('#editphoto-popup').addClass('openPopup');
				$("html, body").addClass('replyPopup');
			}
		});
		
		$('.close-editphoto').on('click', function(){
			$('#editphoto-popup').hide();
			$('#editphoto-popup').removeClass('openPopup');
		});
		
		
		/*Custom Select heapbox*/
		if ($('select').length) {
			$("select").heapbox();
		}
		
		if ($('.datepicker').length){
			$( ".datepicker" ).datepicker({
				showOn: "button",
				buttonImage: "img/caldate-icon.png",
				buttonImageOnly: true,
				buttonText: "Select date"
			});
		}
		/*================= On Document Load and Resize Start =================*/
		$(window).on('resize', function () {
			
			if( $(".wrap-sidebar").length > 0) {
				var winHeight = $(window).height();
				var winHead = $('#header').height();
				
				$('.wrap-sidebar').height(winHeight);
				$('.leftmenu').height(winHeight - winHead);			
				
			
			}
			
		}).trigger('resize');
        
		/*================= On Document Load and Resize End =================*/
	});
})(jQuery);