
/*================ MOBILE MENU ================*/

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const closeMenu = document.querySelector(".menu-close");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
});
closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
});


/*================ FAQ ================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(i => {

            if(i !== item){
                i.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


/*================ REVEAL ON SCROLL ================*/

const reveals = document.querySelectorAll(".reveal");

function revealScroll(){

    const windowHeight = window.innerHeight;

    reveals.forEach(item=>{

        const elementTop = item.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealScroll);

revealScroll();

/*================ HEADER SCROLL ================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 50){

        header.classList.add("active");

    }else{

        header.classList.remove("active");

    }

});


/*================ CLOSE MOBILE MENU ================*/

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

});


/*================ SEARCH ================*/

const searchInput = document.querySelector("#searchInput");

const carCards = document.querySelectorAll(".car-card");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    carCards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});


/*================ BACK TO TOP ================*/

const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*================ LOGIN MODAL ================*/

const loginBtn = document.querySelector(".login-btn");
const loginModal = document.querySelector(".login-modal");
const toggleForm = document.getElementById("toggleForm");
const submitBtn = document.getElementById("submitBtn");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const formTitle = document.getElementById("formTitle");

let isLoginMode = true;

// Open Login Modal
loginBtn.addEventListener("click", () => {
    loginModal.classList.add("active");
    overlay.classList.add("active");
});

// Close Login Modal
overlay.addEventListener("click", () => {
    loginModal.classList.remove("active");
    overlay.classList.remove("active");
});

// Toggle between Login and Signup
toggleForm.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    
    if(isLoginMode) {
        formTitle.textContent = "ورود";
        submitBtn.textContent = "ورود";
        usernameInput.style.display = "none";
        toggleForm.innerHTML = 'حساب ندارید؟ <span>ثبت نام</span>';
    } else {
        formTitle.textContent = "ثبت نام";
        submitBtn.textContent = "ثبت نام";
        usernameInput.style.display = "block";
        toggleForm.innerHTML = 'حساب دارید؟ <span>ورود</span>';
    }
});

// Submit Form
submitBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const username = usernameInput.value.trim();

    // Validation
    if(!email || !password) {
        alert("لطفاً تمام فیلدها را پر کنید");
        return;
    }

    if(!isValidEmail(email)) {
        alert("ایمیل معتبر نیست");
        return;
    }

    if(password.length < 6) {
        alert("رمز عبور باید حداقل ۶ حرف باشد");
        return;
    }

    if(!isLoginMode && !username) {
        alert("لطفاً نام کاربری را وارد کنید");
        return;
    }

    // Save to localStorage
    if(!isLoginMode) {
        localStorage.setItem("user", JSON.stringify({
            username: username,
            email: email,
            password: password
        }));
        alert("ثبت نام موفق! اکنون وارد شوید");
        isLoginMode = true;
        formTitle.textContent = "ورود";
        submitBtn.textContent = "ورود";
        usernameInput.style.display = "none";
        usernameInput.value = "";
        toggleForm.innerHTML = 'حساب ندارید؟ <span>ثبت نام</span>';
    } else {
        // Login
        const savedUser = localStorage.getItem("user");
        if(savedUser) {
            const user = JSON.parse(savedUser);
            if(user.email === email && user.password === password) {
                alert(`خوش‌آمدید ${user.username}!`);
                loginModal.classList.remove("active");
                overlay.classList.remove("active");
                emailInput.value = "";
                passwordInput.value = "";
                loginBtn.textContent = user.username + " (خروج)";
                loginBtn.dataset.loggedIn = "true";
            } else {
                alert("ایمیل یا رمز عبور نادرست است");
            }
        } else {
            alert("ابتدا ثبت نام کنید");
        }
    }
});

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Logout
loginBtn.addEventListener("click", (e) => {
    if(loginBtn.dataset.loggedIn === "true") {
        localStorage.removeItem("user");
        loginBtn.textContent = "ورود";
        loginBtn.dataset.loggedIn = "false";
    }
});


/*================ RENT BUTTONS ================*/

const rentButtons = document.querySelectorAll(".rent-btn");

rentButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const carCard = btn.closest(".car-card");
        const carName = carCard.querySelector("h3").textContent;
        const carPrice = carCard.querySelector("h4").textContent;

        // Check if user is logged in
        const savedUser = localStorage.getItem("user");
        
        if(savedUser) {
            alert(`✅ خودرو ${carName} با قیمت ${carPrice} رزرو شد!\n\nمتشکریم که از KouroshCar استفاده می‌کنید.`);
        } else {
            alert("⚠️ برای رزرو خودرو باید وارد شوید");
            loginModal.classList.add("active");
            overlay.classList.add("active");
        }
    });
});


/*================ VIEW ALL CARS BUTTON ================*/

const viewAllBtn = document.querySelector(".cars-more .btn-primary");

if(viewAllBtn) {
    viewAllBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("صفحه نمایش تمام خودروها در حال توسعه است");
    });
}


