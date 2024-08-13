const navBtn = document.querySelector(".nav-btn");
const nav = document.querySelector(".nav-wrap");

navBtn.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");

    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navBtn.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navBtn.setAttribute("aria-expanded", false);
    }
})

const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");

cartBtn.addEventListener("click", () => {
    const visibility = cart.getAttribute("data-visible");

    if (visibility === "false") {
        cart.setAttribute("data-visible", true);
        cartBtn.setAttribute("aria-expanded", true);
    } else {
        cart.setAttribute("data-visible", false);
        cartBtn.setAttribute("aria-expanded", false);
    }
})

const addBtn = document.getElementById("add-btn");
const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const cartNum = document.getElementById("cart-number");

minusBtn.addEventListener("click", () => {
    const amount = parseInt(minusBtn.nextElementSibling.textContent);
    if(!amount <= 0) {
        const minusAmount = amount - 1;
        minusBtn.nextElementSibling.textContent = minusAmount;
        updateCartNumber(minusAmount);
    }
})

plusBtn.addEventListener("click", () => {
    const amount = parseInt(plusBtn.previousElementSibling.textContent);
    const plusAmount = amount + 1;
    plusBtn.previousElementSibling.textContent = plusAmount;
    updateCartNumber(plusAmount);
})

function updateCartNumber(mainAmount) {
    addBtn.addEventListener("click", () => {
        addBtn.classList.add("clicked"); 
       
        if(!addBtn.classList.contains("clicked")) {
        console.log("btn clicked")
        } else {
            cartNum.classList.remove("sr");
            cartNum.textContent = mainAmount;
            updateCart(cartNum.textContent);
        }
    })
}
function updateCart(num) {
    const cartSection = document.querySelector(".cart-stack");
    const img = document.querySelector(".main-img-wrap img");
    const price = parseFloat(document.querySelector(".main-price span").textContent).toFixed(2);

    cartSection.innerHTML = `
        <div class="grid">
            <div class="cart-info flex">
                <div class="flex">  
                    <div class="">
                        <img src="${img.src}" alt="">
                    </div>
                    <div class="cart-text-stack">
                        <p class="cart-product-name">Fall Limited Edition Sneakers</p>
                        <div class="flex">
                            <p class="cart-product-price">$${price}</p>
                            <p class="cart-product-amount">x ${num}</p>
                            <p class="cart-product-sum">$${(num * price).toFixed(2)}</p>
                        </div>
                    </div>
                </div>  
                <button class="cart-remove-btn">
                    <span class="sr">Remove</span>
                </button>
            </div>
            <button class="cart-checkout">Checkout</button> 
        </div>
        `;
    const delBtn = cartSection.querySelector(".cart-remove-btn");
    const cartSum = cartSection.querySelector(".cart-product-sum");

    delBtn.addEventListener("click", () => {
        cartRemoveBtn(delBtn)
    });

    if(cartSum.textContent === "$0.00") {
        cartRemoveBtn(delBtn)
    }
}
function cartRemoveBtn(del) {
    del.parentElement.parentElement.parentElement.innerHTML = `
        <p class="cart-empty-text">Your cart is empty.</p>
    `; 
    
    del.parentElement.parentElement.remove();
    cartNum.textContent = 0;
}
// slide function
function setupSlider(slideElements, thumbnails, nextBtn, prevBtn) {
    let count = 0;

    function updateSlider() {
        if (count >= slideElements.length) {
            count = 0;
        }
        if (count < 0) {
            count = slideElements.length - 1;
        }

        slideElements.forEach((slide, index) => {
            slide.style.transform = `translateX(-${count * 100}%)`;
            slide.classList.toggle("displayed-img", index === count);
        });

        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle("active", index === count);
        });
    }

    nextBtn.addEventListener("click", () => {
        count++;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        count--;
        updateSlider();
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            count = index;
            updateSlider();
        });
    });
    slideElements.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
        if (index === 0) {
            slide.classList.add("displayed-img");
        }
    });

    thumbnails[0].classList.add("active");
}
// main slider setup
const mainSlideElements = document.querySelectorAll(".main-img-slide img");
const mainThumbnails = document.querySelectorAll(".img-slide-thumbnail button");
const mainNextBtn = document.querySelector(".right-btn");
const mainPrevBtn = document.querySelector(".left-btn");

setupSlider(mainSlideElements, mainThumbnails, mainNextBtn, mainPrevBtn);

// modal slider setup
const modalSlideElements = document.querySelectorAll(".modal-main-img img");
const modalThumbnails = document.querySelectorAll(".thumbnail-modal button");
const modalNextBtn = document.querySelector(".modal-right");
const modalPrevBtn = document.querySelector(".modal-left");

setupSlider(modalSlideElements, modalThumbnails, modalNextBtn, modalPrevBtn);

// modal close-open
const mainImgBtn = document.getElementById("main-img-btn");
const modal = document.querySelector(".modal-backdrop");
const modalClose = modal.querySelector(".modal-close");

mainImgBtn.addEventListener("click", () => {
    if(modal.getAttribute("data-visible") === "false") {
        modal.setAttribute("data-visible", true);
    } else {
        modal.setAttribute("data-visible", false);
    }
})

modalClose.addEventListener("click", () => {
    modal.setAttribute("data-visible", false);
})