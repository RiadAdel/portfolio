function scroll(trigger, content) {
  trigger.addEventListener("click", function (e) {
    console.log(e);
    content.scrollIntoView(false);
  });
}

function typingAnimation(elm, content, delay = 100, removeAfterFinish = true) {
  let count = 0;
  elm.classList.add("cursor");
  let intervalID = setInterval(function () {
    elm.innerText += content[count++];
    if (count == content.length) {
      clearInterval(intervalID);
      if (removeAfterFinish) elm.classList.remove("cursor");
    }
  }, delay);
}

function prevSlide(slider, currentSlide) {
  const slides = slider.querySelectorAll("div.slide");
  slides[currentSlide].classList.remove("current");
  currentSlide = currentSlide == 0 ? slides.length - 1 : currentSlide - 1;
  slides[currentSlide].classList.add("current");
  return currentSlide;
}

function nextSlide(slider, currentSlide) {
  const slides = slider.querySelectorAll("div.slide");
  slides[currentSlide].classList.remove("current");
  currentSlide = currentSlide == slides.length - 1 ? 0 : currentSlide + 1;
  slides[currentSlide].classList.add("current");
  return currentSlide;
}

document.addEventListener("DOMContentLoaded", function () {
  const navElms = document.querySelectorAll("nav > ul > li");
  const contentElms = document.querySelectorAll("main > section");
  const detailsElm = document.getElementById("details");
  const slider = document.getElementById("prev-work");
  const sendEmailFormElm = document.getElementById("send-email");
  if (navElms.length != contentElms.length) {
    console.log("Navigation error");
    return;
  }

  navElms.forEach((elm, i) => {
    scroll(elm, contentElms[i]);
  });

  const details =
    "Hi there! 😁\n I am a Frontend Developer and a Javascript Lover 👌";
  const delay = 85;

  typingAnimation(detailsElm, details, delay, false);

  const leftArrow = slider.querySelector("#left");
  const rightArrow = slider.querySelector("#right");
  let currentSlide = 0;
  leftArrow.addEventListener("click", () => {
    currentSlide = prevSlide(slider, currentSlide);
  });
  rightArrow.addEventListener("click", () => {
    currentSlide = nextSlide(slider, currentSlide);
  });

  sendEmailFormElm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(sendEmailFormElm).entries());
    window.open(
      `mailto:riadadel22@gmail.com?subject=${data.subject}&body=${data.content}`
    );
  });
});
