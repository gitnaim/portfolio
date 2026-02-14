document.addEventListener("DOMContentLoaded", () => {
  // pc logo click scrollEvent
  const Logo = document.getElementById("logoIcon");

  Logo.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // mMenu > mMeuncloseBtn & mMeunDim
  const mMeuncloseBtn = document.querySelector("#mMeuncloseBtn");
  const mMeunDim = document.querySelector("#mMeunDim");
  const mMenueEl = document.querySelector("#mMenueEl");

  const menuIcon = document.querySelector("#mMenuIcon");

  function closeMenuAndDim() {
    mMenueEl.style.display = "none";
    mMeunDim.style.display = "none";
  }

  mMeuncloseBtn.addEventListener("click", closeMenuAndDim);
  mMeunDim.addEventListener("click", closeMenuAndDim);

  // menuIcon, open mMenu and dim
  function openMenuAndDim() {
    mMenueEl.style.display = "block";
    mMeunDim.style.display = "block";
  }

  menuIcon.addEventListener("click", openMenuAndDim);

  // nav menu clickEvent
  const moveMenus = document.querySelectorAll("nav a");

  moveMenus.forEach((moveMenu) => {
    moveMenu.addEventListener("click", (e) => {
      e.preventDefault();

      const targetSelector = moveMenu.getAttribute("data-target");
      const targetSection = document.querySelector(targetSelector);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      if (mMenueEl.contains(moveMenu)) {
        closeMenuAndDim();
      }
    });
  });

  // swiper
  const content = document.querySelector(".content");
  content.classList.add("active");

  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 1,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: { crossFade: true },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    touchEventsTarget: "container",
  });
  // swiper.autoplay.stop();

  // swiper slide .txtBox 제어 함수
  function updateTxtBoxVisibility() {
    const slides = document.querySelectorAll(".swiper-slide");
    slides.forEach((slide, index) => {
      const txtBox = slide.querySelector(".txtBox");
      if (!txtBox) return;

      const isActive = slide.classList.contains("swiper-slide-active");

      if (isActive) {
        txtBox.style.opacity = "1";
        txtBox.style.pointerEvents = "auto";
      } else {
        txtBox.style.opacity = "0";
        txtBox.style.pointerEvents = "none";
      }
    });
  }

  // 초기 실행
  updateTxtBoxVisibility();

  // 슬라이드 변경 시마다 실행
  swiper.on("slideChangeTransitionEnd", () => {
    updateTxtBoxVisibility();
  });

  // swiper.el.addEventListener("mouseenter", () => swiper.autoplay.stop());
  // swiper.el.addEventListener("mouseleave", () => swiper.autoplay.start());

  // hr용 옵저버
  const hrObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  // txtBox--item용 옵저버
  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("txtBox--item--01")) {
            entry.target.classList.add("animate--01");
          } else if (entry.target.classList.contains("txtBox--item--02")) {
            entry.target.classList.add("animate--02");
          } else if (entry.target.classList.contains("txtBox--item--03")) {
            entry.target.classList.add("animate--03");
          }
        } else {
          entry.target.classList.remove(
            "animate--01",
            "animate--02",
            "animate--03",
          );
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  // 각각 따로 관찰
  document.querySelectorAll("section hr").forEach((hr) => {
    hrObserver.observe(hr);
  });

  document.querySelectorAll(".txtBox--item").forEach((item) => {
    itemObserver.observe(item);
  });

  //section--06 img fullscreen Overlay
  const items = document.querySelectorAll(".photoBox--item");
  const overlay = document.getElementById("imageOverlay");
  const dim = document.getElementById("imageDim");
  const closeBtn = document.getElementById("closeBtn");

  // dim
  function closeOverlay() {
    overlay.classList.remove("show");
    overlay.addEventListener(
      "transitionend",
      () => {
        if (!overlay.classList.contains("show")) {
          dim.style.display = "none";
        }
      },
      { once: true },
    );
  }

  // img click -> 세로방향 풀스크린
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const bg = item.querySelector(".bg");
      const bgImage = window.getComputedStyle(bg).backgroundImage;

      overlay.style.backgroundImage = bgImage;
      dim.style.display = "flex";
      overlay.classList.add("show");

      // mobile img click -> 가로방향 풀스크린
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        overlay.style.backgroundImage = bgImage;
        overlay.classList.add("rotate-image");
        dim.style.background = "none";
      }
    });
  });

  // 닫기 버튼 클릭
  closeBtn.addEventListener("click", closeOverlay);

  // 딤 클릭
  dim.addEventListener("click", (e) => {
    if (e.target === dim || e.target === closeBtn) {
      closeOverlay();
    }
  });
});
