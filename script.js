const body = document.body;
const themeBtn = document.getElementById("theme-toggle");
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");
const progressBar = document.querySelector(".progress-bar");
const backToTop = document.getElementById("backToTop");
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");
/*THEME*/
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "light"){
    body.classList.add("light-mode");
    themeBtn.innerHTML =
    '<i class="fa-solid fa-moon"></i>';
}
else{
    themeBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';
}
themeBtn.addEventListener("click",()=>{
    body.classList.toggle("light-mode");
    if(body.classList.contains("light-mode")){
        localStorage.setItem(
            "theme",
            "light"
        );
        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';
    }
    else{
        localStorage.setItem(
            "theme",
            "dark"
        );
        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';
    }
});
// MOBILE MENU
menuBtn.addEventListener("click",()=>{
    navLinks.classList.toggle("active");
});
navItems.forEach(item=>{
    item.addEventListener("click",()=>{
        navLinks.classList.remove("active");
    });
});
// TYPING EFFECT
new Typed("#typing",{
    strings:[
        "Machine Learning Engineer",
        "AI Engineer",
        "Python Developer",
        "Computer Vision",
        "LLM Developer",
        "Generative AI"
    ],
    typeSpeed:70,
    backSpeed:45,
    backDelay:1800,
    loop:true
});
// SCROLL EFFECTS
window.addEventListener("scroll",()=>{
    /* Progress Bar */
    const scrollTop = window.scrollY;
    const pageHeight =
    document.documentElement.scrollHeight
    -
    window.innerHeight;
    progressBar.style.width =
    (scrollTop/pageHeight)*100 + "%";
    /* Header Shadow */
    if(scrollTop > 50){
        header.classList.add("scrolled");
    }
    else{

        header.classList.remove("scrolled");

    }
    /* Back To Top */
    if(backToTop){
        if(scrollTop>500){
            backToTop.classList.add("show");
        }
        else{
            backToTop.classList.remove("show");
        }
    }
    /* Active Navigation */
    sections.forEach(section=>{
        const top = scrollTop;
        const offset =
        section.offsetTop - 150;
        const height =
        section.offsetHeight;
        const id =
        section.getAttribute("id");
        if(
            top >= offset
            &&
            top < offset + height
        ){
            navItems.forEach(link=>{
                link.classList.remove("active");
            });
            const active =
            document.querySelector(
                '.nav-links a[href="#'+id+'"]'
            );
            if(active){
                active.classList.add("active");
            }
        }
    });
});
// BACK TO TOP
if(backToTop){
    backToTop.addEventListener("click",()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
}
//SCROLL REVEAL
const observer = new IntersectionObserver(
(entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add(
                "visible"
            );
        }
    });
},
{
    threshold:0.15
}
);
document.querySelectorAll(
".about-card,.skill-card,.project-card,.contact-card,.stat-box"
).forEach(el=>{
    el.classList.add("reveal");
    observer.observe(el);
});
// Email.js
const contactForm =
document.getElementById("contact-form");
contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    const button =
    contactForm.querySelector("button");
    const originalText =
    button.innerHTML;
    button.disabled = true;
    button.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    emailjs.sendForm(
        "service_uvwq7m6",
        "template_xc398fh",
        this
    )
    .then(function(){
        button.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> Message Sent';
        contactForm.reset();
        setTimeout(()=>{
            button.disabled = false;
            button.innerHTML = originalText;
        },3000);
    })
    .catch(function(error){
        console.log(error);
        button.innerHTML =
        '<i class="fa-solid fa-circle-xmark"></i> Failed';
        setTimeout(()=>{
            button.disabled = false;
            button.innerHTML = originalText;
        },3000);
    });
});