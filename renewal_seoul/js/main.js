document.addEventListener("DOMContentLoaded", () => {
  // 상단 로고: 홈에서만 스크롤 위로
  const logoIcon = document.querySelector(".board__navigation__sideLeft a");
  if (logoIcon) {
    logoIcon.addEventListener("click", (e) => {
      const isHome =
        location.pathname === "/" || location.pathname.endsWith("/index.html");
      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // 모바일 GNB
  const mobileGnb = document.querySelector(".mobile-gnb");
  if (mobileGnb) {
    const menuBtn = mobileGnb.querySelector(".menu-icon");
    const menuWrap = mobileGnb.querySelector(".menu_util_wrap");
    const menuCloseBtn = mobileGnb.querySelector(".menu-close-btn");
    const menuDim = document.querySelector(".menu-dim");

    const closeMenu = (focusBack = false) => {
      if (!menuWrap) return;
      menuWrap.classList.remove("show");
      menuDim && menuDim.classList.remove("show");
      menuBtn && menuBtn.setAttribute("aria-expanded", "false");
      menuWrap.setAttribute("aria-hidden", "true");
      if (focusBack && menuBtn) menuBtn.focus();
    };

    // 전역에서 ESC 등으로 닫을 수 있도록 노출
    window.__closeMobileMenu = closeMenu;

    if (menuBtn && menuWrap) {
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menuWrap.classList.toggle("show");
        if (isOpen) {
          menuDim && menuDim.classList.add("show");
          // 메뉴 열릴 때 검색 패널 닫기
          if (window.__closeSearch) window.__closeSearch();
        } else {
          menuDim && menuDim.classList.remove("show");
        }
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuWrap.setAttribute("aria-hidden", String(!isOpen));
      });
    }

    if (menuCloseBtn && menuWrap) {
      menuCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMenu(true);
      });
    }

    // 바깥 클릭으로 닫기
    document.addEventListener("click", () => {
      if (menuWrap && menuWrap.classList.contains("show")) closeMenu();
    });

    // 버블링 방지
    if (menuWrap) {
      menuWrap.addEventListener("click", (e) => e.stopPropagation());
    }
  }

  // 사이트 검색
  (() => {
    const searchBtn = document.querySelector(".search");
    const searchPanel = document.querySelector(".input-search");
    const searchField = searchPanel
      ? searchPanel.querySelector(
          'input[type="search"], input[type="text"], input',
        )
      : null;

    if (!searchBtn || !searchPanel) return;

    // 접근성 속성 초기화
    if (!searchPanel.id) searchPanel.id = "siteSearch";
    searchBtn.setAttribute("aria-controls", searchPanel.id);
    searchBtn.setAttribute("aria-expanded", "false");
    searchPanel.setAttribute("aria-hidden", "true");
    searchPanel.style.display = "none";

    function openSearch(open) {
      searchPanel.style.display = open ? "flex" : "none";
      searchPanel.setAttribute("aria-hidden", String(!open));
      searchBtn.setAttribute("aria-expanded", String(open));
      if (open) setTimeout(() => searchField && searchField.focus(), 0);
    }

    // 외부에서 닫기 위해 노출
    window.__closeSearch = () => openSearch(false);

    // 토글
    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = searchPanel.style.display === "flex";
      openSearch(!isOpen);
    });

    // 패널 내부 클릭 전파막기
    searchPanel.addEventListener("click", (e) => e.stopPropagation());

    // 바깥 클릭 닫기
    document.addEventListener("click", () => openSearch(false));
  })();

  // 전역 ESC 핸들러
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (window.__closeSearch) window.__closeSearch();
    if (window.__closeMobileMenu) window.__closeMobileMenu(true);
  });

  // GSAP: 스크롤 버튼 표시/숨김
  const topBtn = document.querySelector(".top-button");
  const bottomBtn = document.querySelector(".bottom-button");
  let scrollTimeout;

  function hideButtons() {
    if (typeof gsap === "undefined") return;
    gsap.to([topBtn, bottomBtn], {
      opacity: 0,
      y: 10,
      duration: 0.6,
      ease: "power3.in",
      pointerEvents: "none",
      onComplete: () => {
        if (topBtn) topBtn.style.visibility = "hidden";
        if (bottomBtn) bottomBtn.style.visibility = "hidden";
      },
    });
  }
  function showButtons() {
    if (typeof gsap === "undefined") return;
    gsap.to([topBtn, bottomBtn], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      pointerEvents: "auto",
      onStart: () => {
        if (topBtn) topBtn.style.visibility = "visible";
        if (bottomBtn) bottomBtn.style.visibility = "visible";
      },
    });

    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(hideButtons, 3000);
  }
  window.addEventListener("wheel", showButtons);
  window.addEventListener("scroll", showButtons, { passive: true });

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  if (bottomBtn) {
    bottomBtn.addEventListener("click", () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
  }

  //배너 닫힘
  const gnb = document.querySelector(".board__navigation");
  let gnbOffsetTop = gnb ? gnb.offsetTop : 0;

  window.addEventListener("scroll", () => {
    if (!gnb) return;
    if (window.scrollY >= gnbOffsetTop) {
      gnb.classList.add("fixed");
    } else {
      gnb.classList.remove("fixed");
    }
  });

  // 배너 숨기기
  const banner = document.querySelector(".board__banner");
  const closeBtn = document.querySelector(".close-btn");
  const checkbox = document.getElementById("hide-today");
  const isHidden = localStorage.getItem("hideBannerToday");
  const today = new Date().toDateString();

  if (banner && isHidden === today) {
    banner.classList.add("hide");
    banner.setAttribute("aria-hidden", "true");
    banner.setAttribute("inert", "");
    banner.style.display = "none";

    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    banner.querySelectorAll(FOCUSABLE + ", [tabindex]").forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.setAttribute("aria-hidden", "true");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (!banner) return;

      // 배너 다음의 첫 포커스 대상으로 이동
      const FOCUSABLE =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

      const nextSection =
        banner.parentElement.nextElementSibling ||
        document.querySelector(".board__navigation") ||
        document.body;

      const nextFocusable =
        nextSection.querySelector(FOCUSABLE) ||
        document.querySelector(FOCUSABLE);

      if (banner.contains(document.activeElement)) {
        if (nextFocusable) nextFocusable.focus();
        else document.activeElement.blur();
      }

      // 포커스/상호작용 차단 (inert)
      banner.setAttribute("inert", "");

      // 내부 모든 포커스 요소 탭 제외(폴백)
      banner.querySelectorAll(FOCUSABLE + ", [tabindex]").forEach((el) => {
        el.setAttribute("tabindex", "-1");
        // 버튼/링크 등은 스크린리더 잔여 탐색 방지용
        if (!el.hasAttribute("aria-hidden"))
          el.setAttribute("aria-hidden", "true");
      });

      banner.classList.add("hide");

      // '오늘 하루 보지 않기' 저장
      if (checkbox && checkbox.checked) {
        const today = new Date().toDateString();
        localStorage.setItem("hideBannerToday", today);
      }

      // 트랜지션 종료 후 완전 숨김
      const onEnd = (e) => {
        if (e.propertyName === "height") {
          banner.setAttribute("aria-hidden", "true");
          banner.style.display = "none";
          gnbOffsetTop = gnb ? gnb.offsetTop : 0;
          banner.removeEventListener("transitionend", onEnd);
        }
      };
      banner.addEventListener("transitionend", onEnd);
    });
  }

  // Swiper 1 & 2
  let swiper1 = null;
  let swiper2 = null;

  function initSwiper1() {
    swiper1 = new Swiper(".mySwiper1", {
      loop: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".mySwiper1 .swiper-button-next",
        prevEl: ".mySwiper1 .swiper-button-prev",
      },
      pagination: {
        el: ".mySwiper1 .swiper-pagination",
        type: "fraction",
        renderFraction(currentClass, totalClass) {
          return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
        },
      },
      autoplay: { delay: 2500, disableOnInteraction: false },
      on: {
        init() {
          const container = document.querySelector(".swiper__news .mySwiper1");
          if (!container) return;
          const btnPause = container.querySelector(".btn-pause");
          const btnPlay = container.querySelector(".btn-play");
          if (btnPause) {
            btnPause.addEventListener(
              "click",
              () => {
                swiper1.autoplay.stop();
                btnPause.style.display = "none";
                if (btnPlay) btnPlay.style.display = "inline-block";
              },
              { once: true },
            );
          }
          if (btnPlay) {
            btnPlay.addEventListener(
              "click",
              () => {
                swiper1.autoplay.start();
                btnPlay.style.display = "none";
                if (btnPause) btnPause.style.display = "inline-block";
              },
              { once: true },
            );
          }
        },
      },
    });
  }
  function initSwiper2() {
    swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".mySwiper2 .swiper-button-next",
        prevEl: ".mySwiper2 .swiper-button-prev",
      },
      pagination: {
        el: ".mySwiper2 .swiper-pagination",
        type: "fraction",
        renderFraction(currentClass, totalClass) {
          return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
        },
      },
      autoplay: { delay: 2500, disableOnInteraction: false },
      on: {
        init() {
          const container = document.querySelector(
            ".swiper__citizen .mySwiper2",
          );
          if (!container) return;
          const btnPause = container.querySelector(".btn-pause");
          const btnPlay = container.querySelector(".btn-play");
          if (btnPause) {
            btnPause.addEventListener(
              "click",
              () => {
                swiper2.autoplay.stop();
                btnPause.style.display = "none";
                if (btnPlay) btnPlay.style.display = "inline-block";
              },
              { once: true },
            );
          }
          if (btnPlay) {
            btnPlay.addEventListener(
              "click",
              () => {
                swiper2.autoplay.start();
                btnPlay.style.display = "none";
                if (btnPause) btnPause.style.display = "inline-block";
              },
              { once: true },
            );
          }
        },
      },
    });
  }
  initSwiper1();

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".swiper__item").forEach((item) => {
        item.classList.toggle("active", item.dataset.name === target);
      });

      if (target === "news") {
        if (swiper1) swiper1.destroy(true, true);
        initSwiper1();
      } else if (target === "citizen") {
        if (swiper2) swiper2.destroy(true, true);
        initSwiper2();
      }

      document
        .querySelectorAll(".btn-pause")
        .forEach((b) => (b.style.display = "inline-block"));
      document
        .querySelectorAll(".btn-play")
        .forEach((b) => (b.style.display = "none"));
    });
  });

  // 제목 토글
  const newsTitle = document.querySelector(".news__title");
  const citizenTitle = document.querySelector(".citizen__title");
  const newsContent = document.querySelector(".news__content");
  const citizenContent = document.querySelector(".citizen__content");

  function setInitialTabState() {
    if (newsContent) newsContent.style.display = "block";
    if (citizenContent) citizenContent.style.display = "none";
    if (newsTitle) newsTitle.classList.add("active");
    if (citizenTitle) citizenTitle.classList.remove("active");
  }
  setInitialTabState();

  if (newsTitle) {
    newsTitle.addEventListener("click", () => {
      if (newsContent) newsContent.style.display = "block";
      if (citizenContent) citizenContent.style.display = "none";
      newsTitle.classList.add("active");
      if (citizenTitle) citizenTitle.classList.remove("active");
    });
  }
  if (citizenTitle) {
    citizenTitle.addEventListener("click", () => {
      if (newsContent) newsContent.style.display = "none";
      if (citizenContent) citizenContent.style.display = "block";
      citizenTitle.classList.add("active");
      if (newsTitle) newsTitle.classList.remove("active");
    });
  }

  //weather
  const KMA_API_KEY =
    "f5ea7c60347fa1523b30bd1c43e5f2325708a803d29da3847e9eda7cb0dacdc8";

  // 서울시청(중구) 좌표
  const nx = 60;
  const ny = 127;

  // 오늘 날짜와 시간
  function getBaseDateTime() {
    const now = new Date();
    // 30분 이전이면 1시간 전
    now.setMinutes(now.getMinutes() - 30);
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    return {
      base_date: `${yyyy}${mm}${dd}`,
      base_time: `${hh}00`,
    };
  }

  async function loadWeather() {
    const box = document.getElementById("weatherBox");
    const { base_date, base_time } = getBaseDateTime();

    try {
      // 기상청 초단기실황 API
      const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${KMA_API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("기상청 API 오류");
      const data = await res.json();

      const items = data.response.body.items.item;
      // 필요한 값 추출
      const temp = items.find((i) => i.category === "T1H")?.obsrValue;
      const humi = items.find((i) => i.category === "REH")?.obsrValue;
      const rain = items.find((i) => i.category === "RN1")?.obsrValue;
      const sky = items.find((i) => i.category === "PTY")?.obsrValue;

      // 날씨 설명
      let desc = "맑음";
      if (sky === "1") desc = "비";
      else if (sky === "2") desc = "비/눈";
      else if (sky === "3") desc = "눈";
      else if (sky === "4") desc = "소나기";

      box.innerHTML = `
  <div class="weather-top">
    <div>
      <div class="weather-temp">${temp ?? "-"}°C</div>
      <div class="weather-desc">${desc}</div>
    </div>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="weather-icon" onerror="this.style.display='none'">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>

  </div>
  <div class="weather-meta">
    <span>습도 ${humi ?? "-"}%</span>
    <span>강수 ${rain ?? "0"}mm</span>
  </div>
`;
    } catch (err) {
      box.innerHTML = `<p>날씨 정보를 불러오지 못했습니다.</p>`;
      console.error(err);
    }
  }

  loadWeather();

  // Swiper 3
  const sliderEl =
    document.querySelector(
      ".inner--03 .slider__cover .main_banner .mySwiper3",
    ) || document.querySelector(".slider__cover .mySwiper3");
  const wrapperEl = sliderEl?.querySelector(".swiper-wrapper");
  const controllerEl =
    document.querySelector(".inner--03 .slider__cover .controller") ||
    document.querySelector(".slider__cover .controller");

  function controllerFirstFocusable() {
    return (
      controllerEl?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) || document.querySelector(".slider__cover .controller .btn-pause")
    );
  }

  const SEL_DUPES =
    ".swiper-slide-duplicate a[href], .swiper-slide-duplicate button, .swiper-slide-duplicate [tabindex]";
  const SEL_ORIGINAL_FOCUSABLE =
    ".swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate) a[href], " +
    ".swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate) button:not([disabled]), " +
    ".swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate) [tabindex]:not([tabindex='-1'])";

  // 복제 슬라이드 탭 제외 / 원본 탭 가능
  function setTabbables() {
    if (!sliderEl) return;
    sliderEl.querySelectorAll(SEL_DUPES).forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.setAttribute("aria-hidden", "true");
    });
    sliderEl.querySelectorAll(SEL_ORIGINAL_FOCUSABLE).forEach((el) => {
      el.removeAttribute("aria-hidden");
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
      if (el.getAttribute("tabindex") === "-1")
        el.setAttribute("tabindex", "0");
    });
  }

  // “원본의 마지막 인덱스” 구하기
  function getLastOriginalIndex() {
    const originals =
      sliderEl?.querySelectorAll(
        ".swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)",
      ) || [];
    const idxSet = new Set(
      [...originals].map((s) =>
        Number(s.getAttribute("data-swiper-slide-index") || 0),
      ),
    );
    return Math.max(...idxSet);
  }

  // 래퍼에서 Tab 캡처: 마지막 원본에서만 컨트롤러로 보냄
  function onWrapperKeydown(e) {
    if (e.key !== "Tab" || e.shiftKey) return;

    const slide = e.target.closest(".swiper-slide");
    if (!slide) return;
    if (slide.classList.contains("swiper-slide-duplicate")) return;

    const idx = Number(slide.getAttribute("data-swiper-slide-index") || -1);
    if (idx === -1) return;

    const lastIdx = getLastOriginalIndex();
    if (idx === lastIdx) {
      e.preventDefault();
      const t = controllerFirstFocusable();
      if (t) t.focus();
    }
  }

  const swiper3 = new Swiper(".mySwiper3", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".slider__cover .swiper-button-next",
      prevEl: ".slider__cover .swiper-button-prev",
    },
    pagination: {
      el: ".slider__cover .swiper-pagination",
      type: "fraction",
      renderFraction(currentClass, totalClass) {
        return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
      },
    },
    autoplay: { delay: 2500, disableOnInteraction: false },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 30 },
      937: { slidesPerView: 2, spaceBetween: 30 },
      1226: { slidesPerView: 3, spaceBetween: 30 },
    },
    on: {
      init() {
        const container = document.querySelector(".slider__cover");
        if (container) {
          const btnPause = container.querySelector(".btn-pause");
          const btnPlay = container.querySelector(".btn-play");
          if (btnPause) {
            btnPause.addEventListener(
              "click",
              () => {
                swiper3.autoplay.stop();
                btnPause.style.display = "none";
                if (btnPlay) btnPlay.style.display = "inline-block";
              },
              { once: true },
            );
          }
          if (btnPlay) {
            btnPlay.addEventListener(
              "click",
              () => {
                swiper3.autoplay.start();
                btnPlay.style.display = "none";
                if (btnPause) btnPause.style.display = "inline-block";
              },
              { once: true },
            );
          }
        }
        setTabbables();
        if (wrapperEl) {
          wrapperEl.removeEventListener("keydown", onWrapperKeydown, true);
          wrapperEl.addEventListener("keydown", onWrapperKeydown, true);
        }
      },
    },
  });

  // Swiper가 DOM을 재구성할 때마다 탭 상태 보정
  swiper3.on("loopFix", setTabbables);
  swiper3.on("update", setTabbables);
  swiper3.on("slidesLengthChange", setTabbables);

  // 포커스 들어오면 자동재생 일시정지, 빠지면 재개
  if (sliderEl) {
    sliderEl.addEventListener("focusin", () => {
      if (swiper3.autoplay) swiper3.autoplay.stop();
    });
    sliderEl.addEventListener("focusout", (e) => {
      if (!sliderEl.contains(e.relatedTarget) && swiper3.autoplay) {
        swiper3.autoplay.start();
      }
    });

    // (백업) 센티넬
    const sentinel = document.createElement("button");
    sentinel.type = "button";
    sentinel.textContent = "슬라이더 컨트롤로 이동";
    Object.assign(sentinel.style, {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      whiteSpace: "nowrap",
      border: "0",
    });
    sentinel.addEventListener("focus", () => {
      const t = controllerFirstFocusable();
      if (t) t.focus();
    });
    sliderEl.insertAdjacentElement("afterend", sentinel);
  }

  // 연관 링크 리스트
  (() => {
    const dim = document.querySelector(".dim");
    const usesAria = (btn) =>
      btn.tagName === "BUTTON" && btn.hasAttribute("aria-controls");

    const getPanel = (li, btn) => {
      const id = btn && btn.getAttribute("aria-controls");
      if (id) {
        const p = document.getElementById(id);
        if (p) return p;
      }
      return li.querySelector(".item__list__wrap");
    };

    const closeAllMenus = () => {
      document.querySelectorAll(".relate .list__item").forEach((li) => {
        const btn = li.querySelector(".list__item__btn");
        const panel = getPanel(li, btn);
        if (!btn || !panel) return;

        if (usesAria(btn)) {
          btn.setAttribute("aria-expanded", "false");
          panel.hidden = true;
          panel.classList.remove("active");
        } else {
          panel.classList.remove("active");
          btn.classList.remove("active");
          const title = li.querySelector(".list__item__title");
          title && title.classList.remove("active");
        }
      });
      if (dim) dim.style.display = "none";
    };

    document.querySelectorAll(".relate .list__item").forEach((li) => {
      const btn = li.querySelector(".list__item__btn");
      if (!btn) return;
      const panel = getPanel(li, btn);
      if (!panel) return;

      // 초기 상태
      if (usesAria(btn)) {
        if (!panel.hasAttribute("hidden")) panel.hidden = true;
        panel.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      }

      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (usesAria(btn)) {
          const willOpen = panel.hidden;
          closeAllMenus();
          btn.setAttribute("aria-expanded", String(willOpen));
          panel.hidden = !willOpen;
          if (willOpen) panel.classList.add("active");
          else panel.classList.remove("active");
        } else {
          const isOpen = panel.classList.contains("active");
          closeAllMenus();
          if (!isOpen) {
            panel.classList.add("active");
            btn.classList.add("active");
            const title = li.querySelector(".list__item__title");
            title && title.classList.add("active");
          }
        }

        if (dim) dim.style.display = "block";
      });
    });

    // 바깥/ESC 닫기
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".relate .list__item")) closeAllMenus();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllMenus();
    });
  })();

  // 메일 툴팁
  const mailItem = document.querySelector(".util-list .mail");
  if (mailItem) {
    const mailBtn = mailItem.querySelector(".mail-toggle");
    const mailTip = mailItem.querySelector("#mailInfo");

    const openTip = () => {
      mailBtn && mailBtn.setAttribute("aria-expanded", "true");
      mailTip && mailTip.setAttribute("aria-hidden", "false");
    };
    const closeTip = () => {
      mailBtn && mailBtn.setAttribute("aria-expanded", "false");
      mailTip && mailTip.setAttribute("aria-hidden", "true");
    };

    if (mailBtn) {
      mailBtn.addEventListener("mouseenter", openTip);
      mailBtn.addEventListener("focus", openTip);
      mailBtn.addEventListener("blur", closeTip);
      mailBtn.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeTip();
          mailBtn.focus();
        }
      });
    }
    mailItem.addEventListener("mouseleave", closeTip);
  }

  // 언어 선택 드롭다운
  const lang = document.querySelector(".util-list .lang");
  if (lang) {
    const langBtn = lang.querySelector(".lang-toggle");
    const langSel = lang.querySelector("#cityLang");
    const openLang = (open) => {
      lang.classList.toggle("open", open);
      langBtn && langBtn.setAttribute("aria-expanded", String(open));
      langSel && langSel.setAttribute("aria-hidden", String(!open));
      if (open) langSel && langSel.focus();
    };
    langBtn &&
      langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openLang(!lang.classList.contains("open"));
      });
    document.addEventListener("click", (e) => {
      if (!lang.contains(e.target)) openLang(false);
    });
    langSel &&
      langSel.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          openLang(false);
          langBtn && langBtn.focus();
        }
      });
    langSel &&
      langSel.addEventListener("change", (e) => {
        const url = e.target.value;
        if (url) location.href = url;
      });
  }

  // 정부24 버튼
  const govBtn = document.getElementById("govBtn");
  if (govBtn) {
    govBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("https://www.gov.kr/portal/orgInfo?Mcode=11180");
      if (typeof action_logging === "function") {
        action_logging({ tr_code: "spread_04" });
      }
    });
  }
});
