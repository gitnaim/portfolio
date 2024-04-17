$(function(){
	$(".pop_wrap").addClass("active");

	$(".pop_wrap > .close > a").click(function(e){
		e.preventDefault();
		$(".pop_wrap").removeClass("active");
	});

	var t=0;
	var n=0;
	var winHalf;

	$(window).scroll(function(){
		t=$(window).scrollTop();

		if(t < $("#page1").offset().top-winHalf){
		}
		else if(t < $("#page2").offset().top-winHalf){
		}
		else if(t < $("#page3").offset().top-winHalf){
			$("#page2").addClass("active");
		}
		else if(t < $("#page4").offset().top-winHalf){
		}
		else if(t < $("#footer").offset().top-winHalf){
			$("#page4").addClass("active");
		}
	});
	$(window).resize(function(){
		winHalf=$(window).height()/2;
	});
	$(window).trigger("resize");

	$(".language dt a").click(function(e){
		e.preventDefault();
		$(".language dd").slideToggle(300);
	});
	$("#gnb > ul > li").hover(
		function(){
			$(this).find("a").next(".sub").css({height:260});
		},
		function(){
			$(this).find("a").next(".sub").css({height:0});
		}
	);
	$("#gnb > ul > li > a").focusin(function(){
		$(this).next(".sub").addClass("active");
		$(this).next(".sub").css({height:260});
	});
	$("#gnb li:last-child li:last-child").focusout(function(){
		$(this).parents(".sub").removeClass("active");
		$(this).parents(".sub").css({height:0});
	});
	$("#gnb > ul > li:first-child > a").click(function(e){
		e.preventDefault();
		$(".search_pop").slideDown(300);
	});
	$(".search_pop > .close").click(function(e){
		e.preventDefault();
		$(".search_pop").slideUp(300);
	});

	$(".pop_notice").addClass("on");
	$(".pop_button").addClass("active");

	setTimeout(function(){
		$(".pop_notice").removeClass("on");
		$(".pop_button").removeClass("active");
	}, 3000);

	$(".pop_button").click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".pop_notice").removeClass("on");
		}
		else{
			$(this).addClass("active");
			$(".pop_notice").addClass("on");
		}
	});

	$(window).scroll(function(){
		t=$(window).scrollTop();

		if(t > 100){
			$("#gnb").addClass("fixed");
		}
		else{
			$("#gnb").removeClass("fixed");
		}
	});

	var mainSwiper=new Swiper(".main-swiper", {
		speed: 1200,
		effect: "horizontal",
		fadeEffect: {
			crossFade: true
		},
		autoplay: {
			delay: 4000
		},
		pagination: {
			el: ".swiper-pagination"
		}
	});
	$(".prev").click(function(e){
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	$(".next").click(function(e){
		e.preventDefault();
		mainSwiper.slideNext();
	});
	$(".play").click(function(e){
		e.preventDefault();
		mainSwiper.autoplay.start();
	});
	$("#pause_play").click(function(e){
		e.preventDefault();
		if($(this).hasClass("play")){
			$(this).removeAttr("class");
			$(this).addClass("pause");
			$(this).text("pause");
			mainSwiper.autoplay.start();
		}
		else{
			$(this).removeAttr("class");
			$(this).addClass("play");
			$(this).text("play");
			mainSwiper.autoplay.stop();
		}
	});

	var bgn=0;

	motionBackground(bgn);

	$("#page1 .logo > ul > li").mouseenter(function(e){
		e.preventDefault();
		bgn=$(this).index();
		motionBackground(bgn);
	});
	$("#page1 .logo > ul > li").focusin(function(e){
		e.preventDefault();
		bgn=$(this).index();
		motionBackground(bgn);
	});
	function motionBackground(n){
		$("#page1_bg").addClass("active");
		$("#page1_bg").attr({"class":"case"+n})

		$("#page1_bg").fadeIn(500, function(){
			$("#page1").attr("class", "case"+n);
			$("#page1").addClass("active");
			$(this).hide();
			$(this).removeClass("active");
		});
		$("#page1 .logo > ul > li").each(function(i){
			if(i == bgn){
				$(this).addClass("active");
			}
			else{
				$(this).removeClass("active");
			}
		});
	}

	var galleryw=1100;
	var galleryAmount=0;

	$(".gallery .controls .left").click(function(e){
		e.preventDefault();
		if(!$(".gallery ul").is(":animated")) rightMoving();
	});
	$(".gallery .controls .right").click(function(e){
		e.preventDefault();
		if(!$(".gallery ul").is(":animated")) leftMoving();
	});
	$(".gallery .controls .left, .gallery .controls .right").hover(
		function(){
			clearInterval(id);
		},
		function(){
			id=setInterval(rightMoving, 6000);
		}
	);

	function leftMoving(){
		galleryAmount-=galleryw;

		$(".gallery ul").animate({left:galleryAmount}, 600, function(){

			$(this).append($(".gallery ul li:first-child"));
			galleryAmount+=galleryw;
			$(this).css({left:galleryAmount});

			$(".gallery li").each(function(n){
				if(n == 1){
					$(this).addClass("active");
				}
				else{
					$(this).removeClass("active");
				}
			});
		});
	}
	function rightMoving(){
		$(".gallery ul").prepend($(".gallery ul li:last-child"));
		galleryAmount-=galleryw;
		$(".gallery ul").css({left:galleryAmount});
		galleryAmount+=galleryw;

		$(".gallery ul").animate({left:galleryAmount}, 600, function(){
			$(".gallery li").each(function(n){
				if(n == 1){
					$(this).addClass("active");
				}
				else{
					$(this).removeClass("active");
				}
			});
		});
	}

	$("#page4 .inner .subscribe .email").click(function(e){
		e.preventDefault();
		if($("#page4").hasClass("active") == false){
			$("#page4").addClass("active");
		}
		else {
			$("#page4").removeClass("active");
		}
	});

	var str="";
	var m;

	$("#footer .bottom2 .inner .right dl dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("#footer .bottom2 .inner .right dl dd").slideToggle(300);
	});
	$("#footer .bottom2 .inner .right dl dt a").focusin(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("#footer .bottom2 .inner .right dl dd").slideToggle(300);
	});
	$("#footer .bottom2 .inner .right dl dd li a").click(function(e){
		e.preventDefault();
			$("#footer .bottom2 .inner .right dl dt a").removeClass("active");
			$("#footer .bottom2 .inner .right dl dd").slideUp(300);
			m=$(this).parent().index();
			str=$(this).text();
	});
});