const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function typingAnimation(elm, content, delay = 100, removeAfterFinish = true) {
  if (prefersReducedMotion) {
    elm.innerText = content;
    return;
  }
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

function showSlide(slides, dots, index) {
  slides.forEach((s, i) => s.classList.toggle("current", i === index));
  if (dots) {
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const detailsElm = document.getElementById("details");
  const slider = document.getElementById("prev-work");
  const sendEmailFormElm = document.getElementById("send-email");
  const yearElm = document.getElementById("year");

  if (yearElm) yearElm.textContent = new Date().getFullYear();

  if (detailsElm) {
    const tagline = "From raw data to real-time insight.";
    typingAnimation(detailsElm, tagline, 70, false);
  }

  if (slider) {
    const slides = Array.from(slider.querySelectorAll("div.slide"));
    const dots = Array.from(slider.querySelectorAll(".slide-dots .dot"));
    const leftArrow = slider.querySelector("#left");
    const rightArrow = slider.querySelector("#right");
    let currentSlide = 0;

    const go = (i) => {
      currentSlide = (i + slides.length) % slides.length;
      showSlide(slides, dots, currentSlide);
    };

    leftArrow.addEventListener("click", () => go(currentSlide - 1));
    rightArrow.addEventListener("click", () => go(currentSlide + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));

    document.addEventListener("keydown", (e) => {
      const rect = slider.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowLeft") go(currentSlide - 1);
      if (e.key === "ArrowRight") go(currentSlide + 1);
    });
  }

  if (sendEmailFormElm) {
    sendEmailFormElm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries(
        new FormData(sendEmailFormElm).entries()
      );
      window.open(
        `mailto:riadadel22@gmail.com?subject=${encodeURIComponent(
          data.subject || ""
        )}&body=${encodeURIComponent(data.content || "")}`
      );
    });
  }
});
