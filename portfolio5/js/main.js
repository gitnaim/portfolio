$(function () {
    //sitemap
    $("header .tab").click(function(e){
        e.preventDefault();
        $("#sitemap").addClass("on");
    });
    $("#exit_1").click(function(e){
        e.preventDefault();
        $("#sitemap").removeClass("on");
    });
    //tab
    $("header .tab").click(function(e){
        e.preventDefault();
        $("#tab_menu").addClass("active");
    });
    $("#tab_menu .close").click(function(e){
        e.preventDefault();
        $("#tab_menu").removeClass("active");
    });
    //gnb
    $("#gnb ul li").mouseenter(function(e){
        e.preventDefault();
        $("header").addClass("active");
    });
    $("#gnb ul li").mouseleave(function(e){
        e.preventDefault();
        $("header").removeClass("active");
    });
    //main_slider
    let mainCurrent, mainTotal;
    let mainSwiper=new Swiper(".mainSwiper", {
        fadeEffect:{crossFade:true},
        autoplay:{delay:3000},
        pagination:{el:".mainSwiper  .swiper-pagination", clickable:true},
        on:{                        
            init:function(){        
                mainCurrent=this.realIndex+1;
                mainTotal=this.slides.length;
                $(".main_slider .current_num .current").text(mainCurrent);
                $(".main_slider .current_num .total").text(mainTotal);
            },
            slideChangeTransitionEnd:function(){
                mainCurrent=this.realIndex+1;
                $(".main_slider .current_num .current").text(mainCurrent);
            }
        },
    });
    $(".main_slider .prev").click(function(e){ 
        e.preventDefault();
        mainSwiper.slidePrev();
    });
    $(".main_slider .next").click(function(e){
        e.preventDefault();
        mainSwiper.slideNext(); 
    });
    $(".controller #pause_play").click(function(e){
        e.preventDefault();
                            
        if($(this).hasClass("play")){
            $(this).removeAttr("class");
            $(this).addClass("pause");
            $(this).text("pause");
            mainSwiper.autoplay.start();
        }
        else { 
            $(this).removeAttr("class");
            $(this).addClass("play");
            $(this).text("play");
            mainSwiper.autoplay.stop();
        }
    });

    //sub_slider
    let subSwiper=new Swiper(".subSwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        autoplay: {
            delay: 1500,
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 25,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            850: {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            1100: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
        pagination: {
            el: ".subSwiper .swiper-pagination",
            type: "progressbar",
            clickable: true,
        },
        scrollbar: {
            el:'.subSwiper .swiper-scrollbar',
            draggable: true,
            hide: false
        },
        navigation: {
            nextEl: ".swiper .controller ul li a.next",
            prevEl: ".swiper .controller ul li a.prev",
            clickable: true
        },
        on:{                         
            init:function(){         
                mainCurrent=this.realIndex+1;
                mainTotal=this.slides.length;
                $(".sub_slider .current_num .current").text(mainCurrent);
                $(".sub_slider .current_num .total").text(mainTotal);
            },
            slideChangeTransitionEnd: function(){
                mainCurrent=this.realIndex+1;
                $(".sub_slider .current").text(mainCurrent);
            }
        },
    });
    $(".sub_slider .prev").click(function(e){
        e.preventDefault();
        subSwiper.slidePrev();
    });
    $(".sub_slider .next").click(function(e){
        e.preventDefault();
        subSwiper.slideNext();
    });
    // family_site
    $("#family_site > a").click(function(e){
        e.preventDefault();

        if($(this).hasClass("open")){
            $("#familt_site ul").slideDown(300);
            $("#open_close").removeAttr("class").addClass("close");
        }
        else{
            $("#family_site ul").slideUp(300);
            $("#open_close").removeAttr("class").addClass("open");
        }
    });
});