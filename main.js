//--~~~~~~ TESTIMONIAL~~~~~~//

var swiper = new Swiper(".testimonial-wrapper", {
  spaceBetween: 30,
  loop: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

//--~~~~~~ SHOW MENU~~~~~~//

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

//--~~~~~~ MENU HIDDEN~~~~~~//

if ("nav-close") {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

//--~~~~~~ REMOVE MENU MOBILE~~~~~~//

const navLinks = document.querySelectorAll(".nav-link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //when we click on each nav, we remove the show menu class
  navMenu.classList.remove("show-menu");
}
navLinks.forEach((n) => n.addEventListener("click", linkAction));

//--~~~~~~ CHANGE BACKGROUND HEADER~~~~~~//
function scrollHeader() {
  const header = document.getElementById("header");
  //when the scroll is greater than 80 viewport height ,add the class scroll header to the tag header
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

//--~~~~~~ SCROLL SELECTION ACTIVE LINK~~~~~~//
// get all sections that have an id defined
const sections = document.querySelectorAll("section[id]");

// add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // get current scroll position
  let scrollY = window.pageYOffset;
  // Now we loop through sections to get height, top, and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");

    /* if our current scroll position enters the space where the current section is, 
    add .active class to the corresponding navigation link, else remove it - 
    To know which link needs an active class, we use the sectionId variable
    we are getting while looping through sections as a selector */

    // check if the navigation link exists before manipulating its classList
    const navLink = document.querySelector(
      ".nav-menu a[href*=" + sectionId + "]"
    );
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    }
  });
}

//--~~~~~~ THEME DISPLAY CUSTOMIZATION~~~~~~//
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const colorPalette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const fontSizes = document.querySelectorAll(".choose-size span");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");
//open modal
const openThemeModal = () => {
  themeModal.style.display = "grid";
};

//close modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.style.display = "none";
  }
};
theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);

//--~~~~~~ FONTS~~~~~~//

//remove active class from spans or font size selectors
const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};
fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle("active");
    if (size.classList.contains("font-size-1")) {
      fontSize = "12px";
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "14px";
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "18px";
    }
    //change font size of the root elelment
    document.querySelector("html").style.fontSize = fontSize;
  });
});

//--~~~~~~ PRIMARY COLORS~~~~~~//
//remove active class from colors
const changeActiveColorClass = () => {
  colorPalette.forEach((colorPicker) => {
    colorPicker.classList.remove("active");
  });
};
colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    let primaryHue;
    changeActiveColorClass();

    if (color.classList.contains("color-1")) {
      primaryHue = 252;
    } else if (color.classList.contains("color-2")) {
      primaryHue = 3;
    } else if (color.classList.contains("color-3")) {
      primaryHue = 210;
    } else if (color.classList.contains("color-4")) {
      primaryHue = 152;
    } else if (color.classList.contains("color-5")) {
      primaryHue = 52;
    }
    color.classList.add("active");
    root.style.setProperty("--primary-color-hue", primaryHue);
  });
});

//--~~~~~~ THEME BACKGROUND~~~~~~//

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//change background color
const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightness);
  root.style.setProperty("--white-color-lightness", whiteColorLightness);
  root.style.setProperty("--dark-color-lightness", darkColorLightness);
};
Bg1.addEventListener("click", () => {
  //add active class
  Bg1.classList.add("active");

  //remove active from the others
  Bg2.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();

  //remove customized changes from local storage
  window.location.reload();
});

Bg2.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "20%";
  lightColorLightness = "15%";

  //add active class
  Bg2.classList.add("active");

  //remove active class from the others
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
});
Bg3.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "10%";
  lightColorLightness = "0%";

  //add active class
  Bg3.classList.add("active");

  //remove active class from the others
  Bg2.classList.remove("active");
  Bg1.classList.remove("active");
  changeBG();
});
