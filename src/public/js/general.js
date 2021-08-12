/* Navbar consts */
const navbar = document.getElementById('navbar');
const navToggler = document.getElementById('nav-toggler');
//Navbar variables
let navFlag = false;
//Jquery elements navbar element
const collapsible = $("#navbarNavAltMarkup");

/* Whatsapp Btn consts */
const whatsBtn = document.querySelector('#whatsapp-btn .whatsapp-btn-container');

/* Contact consts */
const form = document.getElementById('contact-form');
const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
const sendBtn = document.getElementById("send-btn");

/* Navbar verification scrollY */
function addScrollClass() {
    if (window.scrollY > 50) {
        navbar.classList.add('scroll-navbar');
    }
    else {
        navbar.classList.remove('scroll-navbar');
    }
}
addScrollClass();

/* Scroll event */
window.addEventListener('scroll', () => {

    collapsible.collapse('hide');

    /* Navbar scroll class */
    addScrollClass();

    /* Whats app btn */
    if (window.scrollY > 100) {
        whatsBtn.classList.add('whatsBtn-show');
    }
    else {
        whatsBtn.classList.remove('whatsBtn-show');
    }

    navFlag = false;

});

/* Navbar eventlistener function */
navToggler.addEventListener('click', () => {

    if (window.scrollY <= 50 && !navFlag) {
        navbar.classList.add('scroll-navbar');
        navFlag = !navFlag;
    }
    else if (window.scrollY <= 50 && navFlag) {
        navbar.classList.remove('scroll-navbar');
        navFlag = !navFlag;
    }

});


/* Contact JS*/

//Label opacity change to 1 when user write anything
const allLabels = document.querySelectorAll('#contact-form .form-group label');
inputs.forEach((element, index) => {
    element.addEventListener('keyup', () => {
        allLabels[index].style.opacity = "1";
        element.setAttribute('placeholder', "");
    });
});

/* Regular expresion to allow what the user can write in each input */
const expresions = {
    name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{8,15}$/,
    message: /^.{3,500}$/,
}

/* object to validate if every input are well done */
const inputsValidation = {
    name: false,
    email: false,
    phone: false,
    message: false,
}

/* detect when user write in the inputs
    and validate if user are writing a valid value based on the regular expresions 
*/
inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

/* Detect wich input are being written and execute a function with specific values */
function validateForm(e) {
    switch (e.target.name) {
        case "name":
            validateInput(expresions.name, e.target, 'name');
            break;
        case "email":
            validateInput(expresions.email, e.target, 'email');
            break;
        case "phone":
            validateInput(expresions.phone, e.target, 'phone');
            break;
        case "message":
            validateInput(expresions.message, e.target, 'message');
            break;
    }
}

/* Take the values and execute other function to validate the data */
function validateInput(expresion, input, id) {

    let formArray = generateDOMConsts(id);

    /* validate if the input has a valid value based on the regex */
    if (expresion.test(input.value)) {
        formInputTrue(formArray[0], formArray[1], id);
    }
    else {
        formInputFalse(formArray[0], formArray[1], id);
    }

    enableButton();

}

/* generate the constants for each input and return an array with the value of the constants */
function generateDOMConsts(id) {
    const formInput = document.querySelector(`#form-${id} .form-input`);
    const formIcon = document.querySelector(`#form-${id} .form-input i.fas`);

    let formArray = [];

    return formArray = [formInput, formIcon];
}

/* give the classes for the valid input */
function formInputTrue(formInput, formIcon, id) {
    formInput.classList.remove('wrong-input');
    formIcon.classList.remove('fa-times');
    formInput.classList.add('success-input');
    formIcon.classList.add('fa-check');
    inputsValidation[id] = true;
}

/* give the classes for the wrong input */
function formInputFalse(formInput, formIcon, id) {
    formInput.classList.remove('success-input');
    formIcon.classList.remove('fa-check');
    formIcon.classList.add('fa-times');
    formInput.classList.add('wrong-input');
    inputsValidation[id] = false;
}

/* Function to verify if all the inputs are right a return a value true or false  */
function verifyTheInputs() {
    let okStatus;

    for (let input in inputsValidation) {
        if (inputsValidation[input]) {
            okStatus = true;
        }
        else {
            okStatus = false;
            break;
        }
    }
    return okStatus;
}

/* If all the camps are right enable the submit button and add the succes target */
function enableButton() {
    if (verifyTheInputs()) {
        sendBtn.setAttribute('data-target', "#send-message");
        sendBtn.disabled = false;
    }
    else {
        sendBtn.removeAttribute('data-target', "#send-message");
    }
}

/* EventListener to send the inputs data */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (verifyTheInputs()) {
        resetModal();
        sendValues();
    }
    else {
        sendBtn.disabled = true;
        missingInputs();
        scroll({
            top: document.getElementById("contact").offsetTop,
            behavior: "smooth"
        });
    }

});

/* If the inputs are wrong or empty this function indicates wich camps are wrong or empty */
function missingInputs() {

    for (let id in inputsValidation) {
        if (!inputsValidation[id]) {
            let formArray = generateDOMConsts(id);
            formInputFalse(formArray[0], formArray[1], id);
        }
    }

}

/* clear all the inputs and inputs styles when the message is sended, */
function clearInputs() {

    for (let id in inputsValidation) {
        const labelForm = document.querySelector(`#form-${id} label`);
        const formInput = document.querySelector(`#form-${id} .form-input`);
        const theInput = document.querySelector(`#form-${id} .form-input input, #form-${id} .form-input textarea`);
        const formIcon = document.querySelector(`#form-${id} .form-input i.fas`);
        formInput.classList.remove('success-input');
        formIcon.classList.remove('fa-check');
        theInput.value = "";
        theInput.placeholder = labelForm.textContent;
        labelForm.style.opacity = "0";

        inputsValidation[id] = false;
        sendBtn.removeAttribute('data-target', "#success-message");
    }

}

/* Fetch function to send inputs value to the banckend and the backend sent a email */
function sendValues() {
    let url = "https://catalog-prototype.herokuapp.com/contact";
    let formData = {};

    $("#contactModal").modal();

    for (let id in inputsValidation) {
        const theInput = document.querySelector(`#form-${id} .form-input input, #form-${id} .form-input textarea`);
        formData[id] = theInput.value;
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch(error => messageError(error))
        .then(response => messageSucces(response.status));

}

const modalContent = document.querySelector('#contactModal .modal-content');
function messageSucces(status) {
    if (status == 200) {
        modalContent.innerHTML =
            `
            <div class="modal-header">
                <h5 class="modal-title" id="contactModalTitleLongTitle">Mensaje Enviado</h5>
            </div>
            <div class="modal-body text-center">
                <p>Nos pondremos en contacto contigo lo más pronto posible</p>
            </div>
            <div class="modal-footer text-center">
                <button type="button" class="btn btn-bg text-center text-white" data-dismiss="modal">Cerrar</button>
            </div>
        `
        modalContent.style.background = '#2bb673';
        modalContent.style.color = '#fff';
        clearInputs();
    }
    else {
        messageError(null);
    }
}

function messageError(error) {
    modalContent.innerHTML =
        `
        <div class="modal-header">
            <h5 class="modal-title" id="contactModalTitleLongTitle">Al parecer ha ocurrido un error</h5>
        </div>
        <div class="modal-body text-center">
            <p>Si gustas puedes contactarnos por cualquiera de nusestros otros metodos de contacto</p>
        </div>
        <div class="modal-footer text-center">
            <button type="button" class="btn btn-bg text-center text-white" data-dismiss="modal">Cerrar</button>
        </div>
    `
    modalContent.style.background = '#ec6359';
    modalContent.style.color = '#fff';
}

function resetModal() {
    modalContent.innerHTML =
        `
        <div class="modal-header">
            <h5 class="modal-title" id="contactModalTitleLongTitle">Enviando Mensje...</h5>
        </div>
        <div class="modal-body text-center">
            <img src="/public/img/rolling-loading.gif" alt="loader gif">
        </div>
    `
    modalContent.style.background = '#fff';
    modalContent.style.color = '#000'; 
}


//Home banner JS
const homeBanner = document.querySelector('.home-banner');
homeBanner.style.height = `${window.innerHeight}px`;