function scroll(trigger, content) {
    trigger.addEventListener('click', function (e) {
        console.log(e)
        content.scrollIntoView(false);
    })
}

function typingAnimation(elm, content, delay = 150, removeAfterFinish = true) {
    let count = 0;
    elm.classList.add("cursor")
    let intervalID = setInterval(function () {
        elm.innerText += content[count++];
        if (count == content.length) {
            clearInterval(intervalID)
            if (removeAfterFinish)
                elm.classList.remove("cursor")
        }
    }, delay)
}

function prevSlide(slider, currentSlide) {
    const slides = slider.querySelectorAll("div.slide");
    slides[currentSlide].classList.remove("current");
    currentSlide = currentSlide == 0 ? slides.length - 1 : currentSlide - 1
    slides[currentSlide].classList.add("current");
    return currentSlide
}

function nextSlide(slider, currentSlide) {
    const slides = slider.querySelectorAll("div.slide");
    slides[currentSlide].classList.remove("current");
    currentSlide = currentSlide == slides.length - 1 ? 0 : currentSlide + 1
    slides[currentSlide].classList.add("current");
    return currentSlide
}

document.addEventListener('DOMContentLoaded', function () {
    const navElms = document.querySelectorAll("nav > ul > li");
    const contentElms = document.querySelectorAll("main > section");
    const nameElm = document.getElementById("name");
    const titleElm = document.getElementById("title");
    const detailsElm = document.getElementById("details");
    const slider = document.getElementById("prev-work");
    if (navElms.length != contentElms.length) {
        console.log("Navigation error");
        return
    }

    navElms.forEach((elm, i) => {
        scroll(elm, contentElms[i])
    })
    const name = "Riad Adel";
    const title = "Computer Engineering Student";
    const details = "I love to work as a front-End developer";
    const delay = 150;

    typingAnimation(nameElm, name, delay)
    setTimeout(() => typingAnimation(titleElm, title, delay), delay * name.length);
    setTimeout(() => typingAnimation(detailsElm, details, delay, false), delay * name.length + delay * title.length);

    const leftArrow = slider.querySelector("#left");
    const rightArrow = slider.querySelector("#right");
    let currentSlide = 0;
    leftArrow.addEventListener('click', () => {
        currentSlide = prevSlide(slider, currentSlide)
    });
    rightArrow.addEventListener('click', () => {
        currentSlide = nextSlide(slider, currentSlide)
    });

})