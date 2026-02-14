document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const sectionTops = document.querySelectorAll(".section .section__top");

  sectionTops.forEach(function (stTop) {
    gsap.fromTo(
      stTop,
      { y: 30, opacity: 0 }, // 숨김 상태(아래로 + 투명)
      {
        y: 0,
        opacity: 1, // 보임 상태(제자리 + 불투명)
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stTop,
          start: "top 95%",
          end: "top 90%",
          toggleActions: "play none reverse none",
        },
      },
    );
  });

  // 공통: 데스크톱 GNB 메뉴
  const header = document.querySelector(".board__header");
  const gnbButtons = document.querySelectorAll(".gnb__toggle");
  // const langBtn = document.querySelector(".lang-toggle");

  function closeAllGnbPanels() {
    let i;

    for (i = 0; i < gnbButtons.length; i++) {
      const button = gnbButtons[i];
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      button.setAttribute("aria-expanded", "false");
      button.classList.remove("is-open");

      if (panel) {
        panel.hidden = true;
      }
    }
  }

  function openGnbPanel(button, panel) {
    button.setAttribute("aria-expanded", "true");
    button.classList.add("is-open");
    panel.hidden = false;
  }

  function toggleGnbPanel(button) {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    if (!panel) {
      return;
    }

    if (isExpanded) {
      // 열려 있으면 닫기
      button.setAttribute("aria-expanded", "false");
      button.classList.remove("is-open");
      panel.hidden = true;
      //!!!!!!!!!
      // if(allLangToggles[i].getAttribute("aria-expanded") === "true"){
      //   setupLangDropdown(toggleBtn)
      // }
    } else {
      // 다른 메뉴는 모두 닫고, 이 버튼만 열기
      closeAllGnbPanels();
      openGnbPanel(button, panel);
    }
  }

  // 버튼 클릭 시 열고/닫기
  let i;
  for (i = 0; i < gnbButtons.length; i++) {
    gnbButtons[i].addEventListener("click", function (event) {
      const button = event.currentTarget;
      toggleGnbPanel(button);
    });
  }

  // 헤더 영역 밖을 클릭하면 GNB 닫기
  document.addEventListener("click", function (event) {
    const target = event.target;
    const isInsideHeader = header.contains(target);

    if (!isInsideHeader) {
      closeAllGnbPanels();
    }
  });

  // 포커스가 헤더 밖으로 나가면 GNB 닫기 (Tab 이동 대비)
  // document.addEventListener("focusin", function (event) {
  //   const target = event.target;
  //   const isInsideHeader = header.contains(target);

  //   if (!isInsideHeader) {
  //     closeAllGnbPanels();
  //   }
  // });

  // esc키 누르면 메뉴창 닫힌다
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllGnbPanels();
    }
  });

  // mGnb menu list + .mGnb-toggle
  const mGnbBtn = document.querySelector(".mGnb-toggle");
  const mGnb = document.querySelector(".mGnb");
  const mGnbList = document.querySelectorAll(".mGnb-menu > li");
  const mGnbSubList = document.querySelectorAll(
    ".mGnb-menu > li > .mGnb-menu-sub",
  );
  const dim = document.querySelector(".dim");
  const closeBtn = document.querySelector(".close-btn");
  const mGnbLogo = document.querySelector(".mGnb-logo");

  // // 1) 모든 li / sub 초기화 함수
  function resetMGnbMenu() {
    // li에서 active 제거
    mGnbList.forEach(function (li) {
      li.classList.remove("active");
    });

    // sub 메뉴에서 is-visible 제거
    mGnbSubList.forEach(function (sub) {
      sub.classList.remove("active");
    });
  }

  // 2) 특정 인덱스의 li / sub만 활성화하는 함수
  function activateMGnbItem(index) {
    // index가 유효한지 체크
    if (index < 0) {
      return;
    }
    if (index >= mGnbList.length) {
      return;
    }
    if (index >= mGnbSubList.length) {
      return;
    }

    mGnbList[index].classList.add("active"); // li 배경색
    mGnbSubList[index].classList.add("active"); // 해당 ul 보이기
  }

  // 3) 메뉴 버튼 클릭 시: 메뉴 열고, 0번 항목 활성화
  mGnbBtn.addEventListener("click", function () {
    mGnb.classList.add("is-visible");
    dim.classList.add("is-visible");

    // 열릴 때마다 "0번 li + 0번 sub"를 기본으로 보여주기
    resetMGnbMenu();
    activateMGnbItem(0);

    if (mGnbLogo) {
      mGnbLogo.focus();
    }
  });

  // 4) 각 li 클릭 시: 해당 li + sub만 보이게 만들기
  mGnbList.forEach(function (item, index) {
    item.addEventListener("click", function () {
      // 1) 전체 초기화
      resetMGnbMenu();

      // 2) 클릭한 li + 매칭되는 sub만 활성화
      activateMGnbItem(index);
    });
  });

  // 5) 딤 클릭하면 메뉴창 닫힌다
  dim.addEventListener("click", function () {
    if (dim.classList.contains("is-visible")) {
      mGnb.classList.remove("is-visible");
      dim.classList.remove("is-visible");
    }
  });

  // 6) 엑스 버튼 클릭하면 메뉴창 닫힌다
  closeBtn.addEventListener("click", function () {
    mGnb.classList.remove("is-visible");
    dim.classList.remove("is-visible");
  });

  // esc키 누르면 메뉴창 닫힌다
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      mGnb.classList.remove("is-visible");
      dim.classList.remove("is-visible");
    }
  });

  window.addEventListener("resize", function () {
    const windowWidth = window.innerWidth;

    // 971px 이상이고, mGnb가 열려 있는 경우에만 닫기
    if (windowWidth >= 971 && mGnb.classList.contains("is-visible")) {
      mGnb.classList.remove("is-visible");
      dim.classList.remove("is-visible");
    }
  });

  // 언어 드롭다운(버튼 + ul)을 공통으로 세팅하는 함수
  function setupLangDropdown(toggleBtn) {
    // 1) 버튼이 없으면 종료
    if (!toggleBtn) {
      return;
    }

    // 2) aria-controls로 연결된 ul id 가져오기
    const listId = toggleBtn.getAttribute("aria-controls");

    if (!listId) {
      return;
    }

    // 3) 해당 id를 가진 ul 찾기
    const langList = document.getElementById(listId);

    if (!langList) {
      return;
    }

    // 4) 열기
    function openLangList() {
      closeAllGnbPanels();

      toggleBtn.setAttribute("aria-expanded", "true");
      langList.hidden = false;
    }

    // 5) 닫기
    function closeLangList() {
      toggleBtn.setAttribute("aria-expanded", "false");
      langList.hidden = true;
    }

    // 6) 버튼 클릭: 토글
    toggleBtn.addEventListener("click", function () {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeLangList();
      } else {
        openLangList();
      }
    });

    // 7) ul 내부 a 클릭 시 닫기
    langList.addEventListener("click", function (event) {
      const link = event.target.closest("a");

      if (link) {
        closeLangList();
      }
    });

    // 8) 바깥 클릭 시 닫기
    document.addEventListener("click", function (event) {
      const isClickOnBtn = toggleBtn.contains(event.target);
      const isClickOnList = langList.contains(event.target);

      if (!isClickOnBtn && !isClickOnList) {
        closeLangList();
      }
    });

    // 9) ESC 키 누르면 닫기
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLangList();
      }
    });
  }

  // 여기부터 실행부: 두 버튼 모두에 같은 로직 적용
  const allLangToggles = document.querySelectorAll(
    ".mGnb-lang-toggle, .lang-toggle",
  );

  for (let i = 0; i < allLangToggles.length; i++) {
    setupLangDropdown(allLangToggles[i]);
  }

  // 스와이퍼 슬라이드
  const progressLinks = document.querySelectorAll(".progressbar li a");

  function updateProgress(sw) {
    const active = sw.realIndex; // 0부터 시작
    let i;
    for (i = 0; i < progressLinks.length; i++) {
      if (i === active) {
        progressLinks[i].classList.add("active");
      } else {
        progressLinks[i].classList.remove("active");
      }
    }
  }
  for (let idx = 0; idx < progressLinks.length; idx++) {
    progressLinks[idx].addEventListener("click", function (e) {
      e.preventDefault();
      swiper.slideToLoop(idx, 500);
      updateProgress(swiper);
    });
  }

  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: { delay: 3500, pauseOnMouseEnter: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        updateProgress(this);
      },
      slideChange: function () {
        updateProgress(this);
      },
    },
  });

  const toggleBtn = document.querySelector(".swiper-toggle");
  let isPlaying = true;

  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", String(isPlaying));
    toggleBtn.setAttribute("aria-label", "일시정지");
    toggleBtn.addEventListener("click", function () {
      if (isPlaying) {
        swiper.autoplay.stop();
        toggleBtn.classList.add("is-paused");
        toggleBtn.setAttribute("aria-label", "재생");
      } else {
        swiper.autoplay.start();
        toggleBtn.classList.remove("is-paused");
        toggleBtn.setAttribute("aria-label", "일시정지");
      }
      isPlaying = !isPlaying;
      toggleBtn.setAttribute("aria-pressed", String(isPlaying));
    });
  }

  const swiperSlides = document.querySelectorAll(".mySwiper .swiper-slide");
  const moreBtn = document.querySelector(".spot-more-btn");
  let isOpen = false;

  const mq = window.matchMedia("(max-width: 750px)");
  function updateSpotCardExtra(e) {
    let i;
    if (e.matches) {
      for (i = 3; i < swiperSlides.length; i++) {
        swiperSlides[i].classList.add("spot-card-extra");
      }
    } else {
      for (i = 3; i < swiperSlides.length; i++) {
        swiperSlides[i].classList.remove("spot-card-extra");
        swiperSlides[i].classList.remove("is-visible");
      }
      if (moreBtn) {
        moreBtn.textContent = "View More";
        moreBtn.setAttribute("aria-expanded", "false");
        //
        moreBtn.classList.remove("is-open");
      }
      isOpen = false;
    }
    if (typeof swiper !== "undefined") {
      swiper.update();
    }
  }
  updateSpotCardExtra(mq);
  mq.addEventListener("change", updateSpotCardExtra);
  if (moreBtn) {
    moreBtn.addEventListener("click", function () {
      const extraCards = document.querySelectorAll(".spot-card-extra");
      if (isOpen === false) {
        let j;
        for (j = 0; j < extraCards.length; j++) {
          extraCards[j].classList.add("is-visible");
        }
        moreBtn.textContent = "Fold";
        moreBtn.setAttribute("aria-expanded", "true");
        moreBtn.classList.add("is-open");
        isOpen = true;
      } else {
        let j;
        for (j = 0; j < extraCards.length; j++) {
          extraCards[j].classList.remove("is-visible");
        }
        moreBtn.textContent = "View More";
        moreBtn.setAttribute("aria-expanded", "false");
        moreBtn.classList.remove("is-open");
        isOpen = false;
      }
    });
  }

  // ===============================
  // 최상단 이동 버튼 (top-btn)
  // ===============================
  const topBtn = document.querySelector(".top-btn");

  if (topBtn) {
    // 현재 버튼이 화면에 보이는 상태인지
    let isTopBtnVisible = false;

    // 마지막 스크롤 위치(스크롤 방향 판별용)
    let lastScrollTop = 0;

    // 타이머
    let scrollTimer = null;

    // 처음에는 숨김 상태
    gsap.set(topBtn, {
      autoAlpha: 0,
      y: 30,
    });

    // 클릭 시 최상단으로 스무스 스크롤
    topBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    function handleTopScroll() {
      // 현재 스크롤 위치
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // 스크롤 방향: 이전보다 작으면 위로 스크롤
      const isScrollingUp = scrollTop < lastScrollTop;

      // 브라우저 top에서 500px 미만이면: 숨기고 종료
      if (scrollTop < 500) {
        if (scrollTimer !== null) {
          clearTimeout(scrollTimer);
          scrollTimer = null;
        }

        if (isTopBtnVisible) {
          gsap.to(topBtn, {
            autoAlpha: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.inOut",
          });
          isTopBtnVisible = false;
        }

        lastScrollTop = scrollTop;
        return;
      }

      // 아래로 스크롤 중이면: 숨기고 종료
      if (!isScrollingUp) {
        if (scrollTimer !== null) {
          clearTimeout(scrollTimer);
          scrollTimer = null;
        }

        if (isTopBtnVisible) {
          gsap.to(topBtn, {
            autoAlpha: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.inOut",
          });
          isTopBtnVisible = false;
        }

        lastScrollTop = scrollTop;
        return;
      }

      // ===== 여기까지 왔으면: 500px 이상 + 위로 스크롤 중 =====

      // 처음 보일 때만 나타나기
      if (!isTopBtnVisible) {
        gsap.to(topBtn, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        isTopBtnVisible = true;
      }

      // 타이머 초기화
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
      }

      // 1초 뒤 숨기기
      scrollTimer = setTimeout(function () {
        if (isTopBtnVisible) {
          gsap.to(topBtn, {
            autoAlpha: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.in",
          });
          isTopBtnVisible = false;
        }
      }, 1000);

      lastScrollTop = scrollTop;
    }

    window.addEventListener("scroll", function () {
      handleTopScroll();
    });
  }

  // ===============================
  // 최하단 이동 버튼 (bottom-btn)
  // ===============================
  const bottomBtn = document.querySelector(".bottom-btn");

  if (bottomBtn) {
    let isBottomBtnVisible = false;
    let lastScrollTopForBottom = 0;
    let bottomScrollTimer = null;

    gsap.set(bottomBtn, {
      autoAlpha: 0,
      y: 30,
    });

    // 클릭 시 최하단으로 스무스 스크롤
    bottomBtn.addEventListener("click", function (event) {
      event.preventDefault();

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      );

      window.scrollTo({
        top: docHeight,
        behavior: "smooth",
      });
    });

    function handleBottomScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // 아래로 스크롤인지 판별
      const isScrollingDown = scrollTop > lastScrollTopForBottom;

      // 문서 끝까지 남은 거리 계산
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      );

      const viewportHeight = window.innerHeight;

      const distanceToBottom = docHeight - (scrollTop + viewportHeight);

      // "브라우저 화면의 최하단"에서 500px 미만이면: 숨기고 종료
      if (distanceToBottom < 500) {
        if (bottomScrollTimer !== null) {
          clearTimeout(bottomScrollTimer);
          bottomScrollTimer = null;
        }

        if (isBottomBtnVisible) {
          gsap.to(bottomBtn, {
            autoAlpha: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.inOut",
          });
          isBottomBtnVisible = false;
        }

        lastScrollTopForBottom = scrollTop;
        return;
      }

      // 위로 스크롤 중이면: 숨기고 종료 (top-btn과 반대)
      if (!isScrollingDown) {
        if (bottomScrollTimer !== null) {
          clearTimeout(bottomScrollTimer);
          bottomScrollTimer = null;
        }

        if (isBottomBtnVisible) {
          gsap.to(bottomBtn, {
            autoAlpha: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.inOut",
          });
          isBottomBtnVisible = false;
        }

        lastScrollTopForBottom = scrollTop;
        return;
      }

      // ===== 여기까지 왔으면: 아래로 스크롤 중 + 바닥 500px 이상 남음 =====

      if (!isBottomBtnVisible) {
        gsap.to(bottomBtn, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        isBottomBtnVisible = true;
      }

      if (bottomScrollTimer !== null) {
        clearTimeout(bottomScrollTimer);
      }

      bottomScrollTimer = setTimeout(function () {
        if (isBottomBtnVisible) {
          gsap.to(bottomBtn, {
            autoAlpha: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.in",
          });
          isBottomBtnVisible = false;
        }
      }, 1000);

      lastScrollTopForBottom = scrollTop;
    }

    window.addEventListener("scroll", function () {
      handleBottomScroll();
    });
  }
});
