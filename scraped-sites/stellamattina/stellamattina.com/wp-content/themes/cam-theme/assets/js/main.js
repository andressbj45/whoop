(function ($) {
	"use strict";

	$('p:empty').remove();

	jQuery('.navbar-nav > li > a.dropdown-toggle').unbind('click').click(function() {
		if (jQuery(this).attr('href') != '' && jQuery(this).attr('href') != '#') location.href = jQuery(this).attr('href');
	});

	// Header fix js
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		if (scroll >= 1) {
			$(".sticky-header").addClass("shrink-header");
		} else {
			$(".sticky-header").removeClass("shrink-header");
		}
	});

    // Mobile menu Toggle
    $('body').on('click', '.header_nav_mobile_wrapper .mobile_menu_trigger', function () {
        $(this).parents('.header_nav_mobile_wrapper').toggleClass('clicked');
    });
	
	
	// Mobile menu Toggle
	 $('body').on('click', '.sub_menu_trigger', function(){
      if( $(this).hasClass('menu-clicked') ) {
        $(this).html('<i aria-hidden="true" class="fa fa-angle-right"></i>');
        $(this).parent().next('ul').slideUp(300);
        $(this).removeClass("menu-clicked");
      } else {
        $(this).html('<i aria-hidden="true" class="fa fa-angle-down"></i>'),
        $(this).parent().next('ul').slideDown(300),
        $(this).addClass("menu-clicked");
      }
    });
    
    $('.single-team-member').on('click', function() {
			var id = $(this).find('.modal_id').data('target');
			//console.log(id);
			var final_id = id.replace('#', '');
			var text = $(this).find('.team-member-details-hidden-text').html();
			$('.team-member-modal').attr('id', final_id);
			$('.modal-content-text').html(text);
		});

		$('.resources_addon_wrapper').on('click', function() {
			var id = $(this).find('.modal_id').data('target');
			//console.log(id);
			var final_id = id.replace('#', '');
			var text = $(this).find('.team-member-details-hidden-text').html();
			$('.team-member-modal').attr('id', final_id);
			$('.modal-content-text').html(text);
		});

		$('.case_studies_modal').on('click', function() {
			var id = $(this).attr('data-target');
			//console.log(id);
			var final_id = id.replace('#', '');
			var text = $(this).find('.case-details-hidden-text').html();
			$('.team-member-modal').attr('id', final_id);
			$('.modal-content-text').html(text);
		});
    

   
	
	
	if ($('.cla_single-post-text').length) {
	  $(function() {
		  $('a[href*=#]:not([href=#])').click(function() {
			  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) 				{
				  var target = $(this.hash);
				  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				  if (target.length) {
					  $('html,body').animate({
						  scrollTop: target.offset().top - 120
					  }, 800);
					  return false;
				  }
			  }
		  });
	  });	
	}






	$('.practitioner-slider').each(function() {
		var $this = $(this);
		var sliderPerView = $this.data('perview') || 4;
		var spaceBetween = $this.data('space-between') || 20;
		var loop = $this.data('loop') || false;
		var autoplay = $this.data('autoplay') || true;
		var speed = $this.data('speed') || 700;
		var autoplayDelay = $this.data('autoplay-delay') || 5000;

		new Swiper(this, {
			spaceBetween: spaceBetween,
			loop: loop,
			speed: speed,
			autoplay: {
				delay: autoplayDelay,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.slide-next',
				prevEl: '.slide-prev',
			},
			breakpoints: {
				320: { slidesPerView: 1 },
				480: { slidesPerView: 2 },
				768: { slidesPerView: 3 },
				1024: { slidesPerView: sliderPerView },
			}
		});
	});
	
	const dropdowns = document.querySelectorAll(".cam-dropdown");

// Toggle individual dropdown
dropdowns.forEach((dropdown) => {
   dropdown.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling to window
      // Close other dropdowns
      dropdowns.forEach((d) => {
         if (d !== dropdown) d.classList.remove("is-active");
      });
      dropdown.classList.toggle("is-active");
   });
});

// Hide all dropdowns when clicked outside
window.addEventListener("click", (e) => {
   if (!e.target.closest(".cam-dropdown")) {
      dropdowns.forEach((dropdown) => {
         dropdown.classList.remove("is-active");
      });
   }
});
	
	
	
	
	
// 	     const dropdown = document.querySelector(".cam-dropdown");

//     const dropdownMenu = () => {
//        dropdown.classList.toggle("is-active");
//     };

//     dropdown.addEventListener("click", () => {
//        dropdownMenu();
//     });

//     // Hide when clicked outside the dropdown
//     window.addEventListener("click", (e) => {
//        if (!e.target.closest(".cam-dropdown")) {
//           if (dropdown.classList.contains("is-active")) {
//              dropdownMenu();
//           }
//        }
//     });	
	
	
})(jQuery);


