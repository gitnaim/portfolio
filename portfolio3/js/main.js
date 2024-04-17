$(function(){
	var w; // 윈도우의 가로 크기를 정의하는 변수입니다.
	var h; // 메뉴의 세로 크기를 정의하는 변수입니다.

	/*
	반응형에 따른 h 세로 크기의 변화

	920px 이하 : h 200px
	1070px 이하 : h 290px
	PC 해상도 : h 376px
	*/

	$(window).resize(function(){
		w=$(this).width();

		if(w > 760){
			if($("body").hasClass("prevent")){
				$(".dim").trigger("click");
			}
		}
		if(w <= 920){
			h=200;
		}
		else if(w <= 1070){
			h=290;
		}
		else{
			h=376;
		}
	})
	$(window).trigger("resize");

	// GNB
	$(".gnb_wrap > ul > li").mouseenter(function(){
		$(this).find(".sub").stop().css({display:"block", height:0}).animate({height:h}, 400);
	});
	$(".gnb_wrap > ul > li").mouseleave(function(){
		$(this).find(".sub").stop().animate({height:0}, 400, function(){
			$(this).css({display:"none"});
		});
	});
	$(".gnb_wrap > ul > li > a").focusin(function(){
		$(this).parent().addClass("active");
		$(".gnb_wrap .sub").css({display:"none", height:0});
		$(this).next(".sub").css({display:"block", height:h});
	});
	$(".gnb_wrap .brand a").focusout(function(){
		$(this).parents(".sub").css({display:"none", height:0});
		$(this).parents(".sub").parent().removeClass("active");
	});
	$(".tab").click(function(e){
		e.preventDefault();
		$("body").addClass("prevent");
		$("#mobile").addClass("active");
		$(".dim").addClass("active");
	});
	$(".dim").click(function(){
		$("body").removeClass("prevent");
		$("#mobile").removeClass("active");
		$(".dim").removeClass("active");

		if($(".mobile_inner > ul > li").hasClass("active") == true){
			$(".mobile_inner > ul > li").removeClass("active");
			$(".mobile_inner .sub").removeClass("active");
		}
	});
	$("#mobile .mobile_inner > ul > li").click(function(e){
		e.preventDefault();
		if($(this).hasClass("active") == false){
			$("#mobile .mobile_inner > ul > li").removeClass("active");
			$(this).addClass("active");
			$(".sub").removeClass("active");
			$(this).find(".sub").addClass("active");
		}else{
			$(this).removeClass("active");
			$(this).find(".sub").removeClass("active");
		}
	});

	// Slim Scroll
	$(".mobile_inner").slimscroll({
		height: "100%"
	});

	// Owl Carousel
	var $owl1=$("#carousel1");
	var pageIndex=0;
	$(".main_roll_nav li").eq(pageIndex).addClass("active");

	$owl1.owlCarousel({
		margin: 1,
		autoplay: true,
		loop: true,
		responsive: {
			0: {
				items: 1
			}
		},
		onChanged: callback
	});
	function callback(e){
		// https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html
		// console.log("index : "+e.item.index);
		// console.log("page index : "+e.page.index);
		pageIndex=e.page.index;

		if(pageIndex == -1) return;

		$(".main_roll_nav li").removeClass("active");
		$(".main_roll_nav li").eq(pageIndex).addClass("active");
	}
	$(".main_roll_nav li").click(function(e){
		e.preventDefault();
		pageIndex=$(this).index();
		$owl1.find(".owl-dot").eq(pageIndex).trigger("click");
	});

	var $owl2=$("#carousel2");

	$owl2.owlCarousel({
		margin: 1,
		autoplay: true,
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			}
		}
	});

	// Video
	var video=document.getElementById("my_video");

	$("#toggle").click(function(e){
		e.preventDefault();
		video.play();
		$(this).fadeOut(300);
	});
	$("#my_video").click(function(){
		video.pause();
		$('#toggle').fadeIn(300);
	});
	video.addEventListener("ended", function(){
		$("#toggle").fadeIn(300);
		video.pause();
		video.currentTime=0;
	});
});