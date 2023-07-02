const menu = document.querySelector(".nav-bar_elements_hide");
const openMenu = document.querySelector(".nav-bar");
const closeMenu = document.querySelector(".close");
const background = document.querySelector(".nav-bar_bg-opacity_hide");

openMenu.addEventListener("click", openMenuOnClick);

function openMenuOnClick() {
    menu.classList.remove("nav-bar_elements_hide");
    menu.classList.add("nav-bar_elements_show");
    background.classList.remove("nav-bar_bg-opacity_hide");
    background.classList.add("nav-bar_bg-opacity_show");
}

closeMenu.addEventListener("click", closeMenuOnClick);
background.addEventListener("click", closeMenuOnClick);

function closeMenuOnClick() {
    menu.classList.remove("nav-bar_elements_show");
    menu.classList.add("nav-bar_elements_hide");
    background.classList.remove("nav-bar_bg-opacity_show");
    background.classList.add("nav-bar_bg-opacity_hide");
}

///////////

const form = document.querySelector(".contact_form");

form.addEventListener('submit', formSend)

async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let data = new FormData(form);

    if (error === 0) {
        console.log(data);
        form.reset();
        let response = await fetch("path", {
            method: "POST",
            body: data
        });
        if (response.ok) {
            //feedback
            //form.reset();
        } else {
            //error
        }
    } else {
        console.log("error");
    }
}

const span = document.querySelector(".span")
const span1 = document.querySelector(".span1")
const span2 = document.querySelector(".span2")

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll(".form_val")
    for (i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        removeError(input);
        if (input.classList.contains("__email")) {
            if (mailReg(input)) {
                addError(input);
                notValid(span1, "Некорректный адрес почты")
                error++;
            } else {
                notValid(span1, "")
            }
        }
        if (input.classList.contains("__name")) {
            if (input.value === "") {
                addError(input);
                notValid(span, "Заполните поля")
                error++;
            } else {
                notValid(span, "")
            }
        }
        if (input.classList.contains("__mess")) {
            if (input.value === "") {
                addError(input);
                notValid(span2, "Заполните поля")
                error++;
            }
            else {
                notValid(span2, "")
            }
        }

    }
    return error;
}

function addError(input) {
    input.classList.add("error");
}

function removeError(input) {
    input.classList.remove("error");
}

function mailReg(input) {
    return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
}

function notValid(el, mess) {
    el.innerHTML = mess;
}
