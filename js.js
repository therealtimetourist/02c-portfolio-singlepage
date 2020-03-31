
const filterButtons = document.querySelector("#filter-btns").children;
const items = document.querySelector(".portfolio-gallery").children;

// filter buttons
for(let i=0; i < filterButtons.length; i++){
    filterButtons[i].addEventListener("click", function(){
        // remove active class from all buttons
        for(let j=0; j < filterButtons.length; j++){
            filterButtons[j].classList.remove("active");
        }
        // add active class to clicked button
        this.classList.add("active");
        const target = this.getAttribute("data-target");

        // filter gallery items
        for(let k=0; k < items.length; k++){
            items[k].style.display="none";
            if(target == items[k].getAttribute("data-id")){
                items[k].style.display="block ";
            }
            if(target == "all"){
                items[k].style.display="block ";
            }
        }
    });
}

const gallery = document.querySelector(".portfolio-gallery");
const galleryItem = gallery.querySelectorAll(".item");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const closeLightBox = document.querySelector(".close-lightbox");

// close by click outside lightbox image
lightbox.addEventListener("click", function(){
    if(event.target != lightboxImg){
        lightbox.classList.remove("show");
        lightbox.classList.add("hide");
    }
});

// open lightbox
galleryItem.forEach(function(ele){
    ele.querySelector(".fa-plus").addEventListener("click", function(){
        lightbox.classList.remove("hide");
        lightbox.classList.add("show");
        lightboxImg.src = ele.querySelector("img").getAttribute("src");
        closeLightBox.focus();
    });
});

// close lightbox
["click", "keypress"].forEach(ev=>{
    closeLightBox.addEventListener(ev, function(e){
        if(ev == "click" || e.keyCode == 13){
            lightbox.classList.remove("show");
            lightbox.classList.add("hide");
        }
    });
});

// testimonial slider
const sliderContainer = document.querySelector(".testimonials-slider");
const slides = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;
const margin = 30;
let itemPerSlide = 0;
let slideDots;
// responsive
const responsive = [
    {breakpoint:{width:0, item:1}},     // if window width > 0 then show 1 item in slideshow
    {breakpoint:{width:991, item:2}}    // if window width 992 then show 2 items in slideshow
];

function load(){
    for(let i = 0; i < responsive.length; i++){
        if(window.innerWidth > responsive[i].breakpoint.width){
            itemPerSlide = responsive[i].breakpoint.item;
        }
    }
    start();
}

function start(){
    //set width of containerWidth and slides
    totalWidth = 0;
    for(let i = 0; i < slides.length; i++){
        slides[i].style.width = (containerWidth/itemPerSlide) - margin + "px";
        slides[i].style.margin = margin/2 + "px";
        totalWidth += containerWidth/itemPerSlide;
    }
    // set containerWidth
    sliderContainer.style.width = totalWidth + "px";
    // set slider controls
    slideDots = Math.ceil(slides.length/itemPerSlide);
    // console.log(slideDots);
    for(let i = 0; i < slideDots; i++){
        const div = document.createElement("div");
        div.id = i;
        div.setAttribute("onclick", "controlSlide(this)");
        if(i == 0){
            div.classList.add("active");
        }
        document.querySelector(".slider-controls").appendChild(div);
    }
}

let currentSlide = 0;
let autoSlide = 0;

function controlSlide(element){
    clearInterval(timer);
    timer = setInterval(autoPlay, 5000);
    currentSlide = element.id;
    autoSlide = element.id;
    changeSlide(currentSlide);
}

function changeSlide(currentSlide){
    // get all slider buttons
    controlButtons = document.querySelector(".slider-controls").children;
    // remove active class
    for(let i = 0; i < controlButtons.length; i++){
        controlButtons[i].classList.remove("active");
    }
    // add active class to selected
    controlButtons[currentSlide].classList.add("active");
    sliderContainer.style.marginLeft =- (containerWidth * currentSlide) + "px";
}

function autoPlay(){
    if(autoSlide == slideDots - 1){
        autoSlide = 0;
    } else{
        autoSlide++;
    }
    changeSlide(autoSlide);
}

let timer = setInterval(autoPlay, 5000);
window.onload = load();

// fixed header
window.onscroll = function(){
    const docScrollTop = document.documentElement.scrollTop;
    if(window.innerWidth > 991){
        if(docScrollTop > 100){
            document.querySelector("header").classList.add("fixed");
        } else{
            document.querySelector("header").classList.remove("fixed");
        }
    }
}

//add active class to header links
const navbar = document.querySelector(".navbar");
a = navbar.querySelectorAll("a");
a.forEach(function(element){
    element.addEventListener("click", function(){
        for(let i=0; i < a.length; i++){
            a[i].classList.remove("active");
        }
        this.classList.add("active");
        document.querySelector(".navbar").classList.toggle("show");
    });
});

// hamburger menu toggle (responsive menu)
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function(){
    document.querySelector(".navbar").classList.toggle("show");
});