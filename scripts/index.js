function scroll(trigger, content){
    trigger.addEventListener('click',function(e){
        console.log(e)
        content.scrollIntoView(false);
    })
}

function typingAnimation(elm,content,delay = 150,removeAfterFinish = true){
    let count =0;
    elm.classList.add("cursor")
    let intervalID = setInterval(function(){
        elm.innerText += content[count++];
        if(count == content.length){
            clearInterval(intervalID)
            if(removeAfterFinish)
                elm.classList.remove("cursor")
        }
    },delay)
}

document.addEventListener('DOMContentLoaded',function(){
    const navElms = document.querySelectorAll("nav > ul > li");
    const contentElms = document.querySelectorAll("main > section");
    const nameElm = document.getElementById("name");
    const titleElm = document.getElementById("title");
    const detailsElm = document.getElementById("details");
    if(navElms.length != contentElms.length){
        console.log("Navigation error");
        return
    }

    navElms.forEach((elm,i)=>{
        scroll(elm,contentElms[i])
    })
    const  name = "Riad Adel";
    const  title = "Computer Engineering Student";
    const  details = "I love javascript";
    const delay = 150;

    typingAnimation(nameElm,"Riad Adel",delay)
    setTimeout(()=>typingAnimation(titleElm,"computer Engineering Student",delay),delay*name.length);
    setTimeout(()=>typingAnimation(detailsElm,"I love to work as a front End",delay,false),delay*name.length + delay*title.length);    
})