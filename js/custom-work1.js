(function($) { "use strict";

	function Selector_Cache() {
		var collection = {};

		function get_from_cache( selector ) {
			if ( undefined === collection[ selector ] ) {
				collection[ selector ] = $( selector );
			}

			return collection[ selector ];
		}

		return { get: get_from_cache };
	}

	var selectors = new Selector_Cache();



	//Preloader

	Royal_Preloader.config({
		mode           : 'progress',
		background     : '#ffffff',
		showProgress   : true,
		showPercentage : false
	});	

	
	//Parallax fade on scroll	
	
	function scrollBanner() {
	  $(document).scroll(function(){
		var scrollPos = $(this).scrollTop();
		$('.parallax-fade-top').css({
		  'top' : (scrollPos/2)+'px',
		  'opacity' : 1-(scrollPos/650)
		});
	  });    
	}
	scrollBanner();	

	
	/* Scroll Animation */
	
	window.scrollReveal = new scrollReveal();
	
	
	jQuery(document).ready(function(){	
			
	
		//Top slider
	
		  var time = 6; // time in seconds
		 
		  var $progressBar,
			  $bar, 
			  $elem, 
			  isPause, 
			  tick,
			  percentTime;
		 
			//Init the carousel
			$("#owl-top").owlCarousel({
				pagination : false,
				transitionStyle : "fade",
				slideSpeed : 500,
				paginationSpeed : 500,
				singleItem:true,
				afterInit : progressBar,
				afterMove : moved,
				startDragging : pauseOnDragging			
				
			});

			
			//Init progressBar where elem is $("#owl-demo")
			function progressBar(elem){
			  $elem = elem;
			  //build progress bar elements
			  buildProgressBar();
			  //start counting
			  start();
			}
		 
			//create div#progressBar and div#bar then prepend to $("#owl-demo")
			function buildProgressBar(){
			  $progressBar = $("<div>",{
				id:"progressBar"
			  });
			  $bar = $("<div>",{
				id:"bar"
			  });
			  $progressBar.append($bar).prependTo($elem);
			}
		 
			function start() {
			  //reset timer
			  percentTime = 0;
			  isPause = false;
			  //run interval every 0.01 second
			  tick = setInterval(interval, 10);
			};
		 
			function interval() {
			  if(isPause === false){
				percentTime += 1 / time;
				$bar.css({
				   width: percentTime+"%"
				 });
				//if percentTime is equal or greater than 100
				if(percentTime >= 100){
				  //slide to next item 
				  $elem.trigger('owl.next')
				}
			  }
			}
		 
			//pause while dragging 
			function pauseOnDragging(){
			  isPause = true;
			}
		 
			//moved callback
			function moved(){
			  //clear interval
			  clearTimeout(tick);
			  //start again
			  start();
			}
		 
			//uncomment this to make pause on mouseover 
			// $elem.on('mouseover',function(){
			//   isPause = true;
			// })
			// $elem.on('mouseout',function(){
			//   isPause = false;
			// })
		 
		  var owl = $("#owl-top");
		 
		  owl.owlCarousel();
		 
		  // Custom Navigation Events
		  $(".next").click(function(){
			owl.trigger('owl.next');
		  })
		  $(".prev").click(function(){
			owl.trigger('owl.prev');
		  })
	
	
		//Fade on portfolio item hover
	
		$('#projects-grid').children().hover(function() {
		$(this).siblings().stop().fadeTo(400,0.2);
		}, function() {
			$(this).siblings().stop().fadeTo(400,1);
		});

		//Menu accordion
		
		var accordionsMenu = $('.cd-accordion-menu');

		if( accordionsMenu.length > 0 ) {
			
			accordionsMenu.each(function(){
				var accordion = $(this);
				//detect change in the input[type="checkbox"] value
				accordion.on('change', 'input[type="checkbox"]', function(){
					var checkbox = $(this);
					console.log(checkbox.prop('checked'));
					( checkbox.prop('checked') ) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
				});
			});
		}
	
		
		//Scroll back to top
	
		var offset = 300;
		var duration = 300;
		jQuery(window).scroll(function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.scroll-to-top').fadeIn(duration);
			} else {
				jQuery('.scroll-to-top').fadeOut(duration);
			}
		});
				
		jQuery('.scroll-to-top').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
		
				
		//Tooltip

		$(".tipped").tipper();


		/* Portfolio Sorting */

		(function ($) { 
		
		
			var container = $('#projects-grid');
			
			
			function getNumbColumns() { 
				var winWidth = $(window).width(), 
					columnNumb = 1;
				
				
				if (winWidth > 1500) {
					columnNumb = 4;
				} else if (winWidth > 1200) {
					columnNumb = 3;
				} else if (winWidth > 900) {
					columnNumb = 2;
				} else if (winWidth > 600) {
					columnNumb = 2;
				} else if (winWidth > 300) {
					columnNumb = 1;
				}
				
				return columnNumb;
			}
			
			
			function setColumnWidth() { 
				var winWidth = $(window).width(), 
					columnNumb = getNumbColumns(), 
					postWidth = Math.floor(winWidth / columnNumb);

			}
			
			$('#portfolio-filter #filter a').click(function () { 
				var selector = $(this).attr('data-filter');
				
				$(this).parent().parent().find('a').removeClass('current');
				$(this).addClass('current');
				
				container.isotope( { 
					filter : selector 
				});
				
				setTimeout(function () { 
					reArrangeProjects();
				}, 300);
				
				
				return false;
			});
			
			function reArrangeProjects() { 
				setColumnWidth();
				container.isotope('reLayout');
			}
			
			
			container.imagesLoaded(function () { 
				setColumnWidth();
				
				
				container.isotope( { 
					itemSelector : '.portfolio-box-1', 
					layoutMode : 'masonry', 
					resizable : false 
				} );
			} );
			
			
		
			
		
			$(window).on('debouncedresize', function () { 
				reArrangeProjects();
				
			} );
			
		
		} )(jQuery);
		
	});	
 
	/* DebouncedResize Function */
		(function ($) { 
			var $event = $.event, 
				$special, 
				resizeTimeout;
			
			
			$special = $event.special.debouncedresize = { 
				setup : function () { 
					$(this).on('resize', $special.handler);
				}, 
				teardown : function () { 
					$(this).off('resize', $special.handler);
				}, 
				handler : function (event, execAsap) { 
					var context = this, 
						args = arguments, 
						dispatch = function () { 
							event.type = 'debouncedresize';
							
							$event.dispatch.apply(context, args);
						};
					
					
					if (resizeTimeout) {
						clearTimeout(resizeTimeout);
					}
					
					
					execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
				}, 
				threshold : 150 
			};
		} )(jQuery);

	
 
  })(jQuery); 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 





	