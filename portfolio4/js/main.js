window.addEventListener("load", function(){
    let tabBtn=document.getElementById("tab");
    let dimBtn=document.getElementById("dim");
    let tabM=document.getElementById("tab_menu");
    let tabC=document.getElementById("tab_close");
    let bodyF=document.querySelector("body");

    tabBtn.addEventListener("click", function(){
        tabM.classList.add("active");
        dimBtn.classList.add("active");
        bodyF.classList.add("fixed");
    });
    tabC.addEventListener("click", function(){
        tabM.classList.remove("active");
        dimBtn.classList.remove("active");
        bodyF.classList.remove("fixed");
    });
    dimBtn.addEventListener("click", function(){
        tabM.classList.remove("active");
        dimBtn.classList.remove("active");
        bodyF.classList.remove("fixed");
    });


    let video=document.getElementById("main_video");
        main_video.muted=true;

    video.addEventListener("loadeddata", function() {
        // console.log("loaded event");
        video.play();
    });

    video.addEventListener("ended", function(){
        // console.log("ended event");
        video.currentTime=0;
        video.play();
    });

    // mouse_cover_whale
    // var $circle = $('.circle');

    // function moveCircle(e) {
    //     TweenLite.to($circle, 0.3, {
    //     css: {
    //         left: e.pageX,
    //         top: e.pageY
    //     }
    // });
    // }
    // $(window).on('mousemove', moveCircle);
    // var swiper = new Swiper(".mySwiper", {
    //     slidesPerView: 1,
    //     spaceBetween: 30,
    //     loop: true,
    //     delay: 1,
    //     pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //     },
    //     navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //     },
    // });

    // top_button
    window.addEventListener("load", function(){
	let banner=document.getElementById("arrow");

	banner.style.display="none"; // if문으로 검증 하려고 합니다.
	let t; // window상단 좌표 지정
	

	window.addEventListener("scroll", function(){
		// scroll, resize안에 gsap 넣을 때에는 반드시 예외 처리 해야 함.
		// 예외처리 : if, try ... catch 문으로 정상적인 UI를 만드는 방식 입니다.
		if(window.pageYOffset > 250){
			// banner.style.display="block"; // <div class="ball" style="display: block">
			// console.log("banner가 보입니다");
				if(banner.style.display === "none"){
					console.log("scroll_1");
					gsap.fromTo(banner, {display: "block", opacity: 0},
								{opacity: 1, duration: 0.3});
				}
		}
		else{
			if(banner.style.display === "block"){
				console.log("scroll_2");
				gsap.to(banner, {opacity: 0, duration: 0.3, onComplete: function(){
					banner.style.display="none";
					// console.log("banner는 가려집니다.");
				}});
			}
		}
	});
		//banner클릭 시에 상단으로 이동
	banner.addEventListener("click", function(e){
		e.preventDefault()

		gsap.to(window, {scrollTo: 0, duration: 0.5});
	});
});

});