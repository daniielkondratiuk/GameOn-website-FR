function editNav() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive"
    } else {
        x.className = "topnav"
    }
}

// DOM Elements
const modalForm = document.querySelector('#reservation-form');
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const successMsg = document.querySelector(".success")

//
const errorMsg = {
    name: "Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
    lastname: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    email: "Veuillez entrer mail valide.",
    birthday: "Vous devez entrer votre date de naissance.",
    quantity: "Veuillez entrer un nombre valide.",
    radio: "Vous devez choisir une option.",
    check: "Vous devez vérifier que vous acceptez les termes et conditions.",
}

//Booleans functions
function isCorrectLength(input, min) {
    return input.value.trim().length >= min;
}
function isValidMail(email) {
    if (email.value.length === 0) {
        return false
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
}
function isCorrectDate(date) {
    if (date.value.length === 0) {
        return false
    }
    return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(date.value)
}
function isNumber(input) {
    return input.value !== '' ? !isNaN(input.value) : false

}
function isCheckedRadio(inputs) {
    return Array.from(inputs).some(input => input.checked);
}
function isCheckedInput(input) {
    return input.checked
}

// Action functions
function launchModal() {
    modalBg.style.display = "block"
    modalForm.style.display = "block"
    document.body.style.overflow = "hidden"
}
function closeModal() {
    modalBg.style.display = "none"
    modalForm.style.display = "none"
    document.body.style.overflow = "auto"
}
function showErrorMessage(el, msg) {
    let error = document.createElement("div");
    error.classList.add("error");
    error.setAttribute('style', 'color: tomato; font-size: 0.8rem; padding: 5px 10px;');
    error.innerHTML = msg;
    el.parentElement ? el.parentElement.appendChild(error) : el[0].parentElement.appendChild(error);
}
function clearErrorMessage() {
    document.querySelectorAll(".error").forEach(el => el.remove());
}
function showSuccessMessage() {
    successMsg.style.display = "block";
}
function hideSuccessMessage() {
    successMsg.style.display = "none";
}
function validate() {}

//Event listeners
document.addEventListener('click', el => {
    if (el.target.classList.contains('modal-btn')) launchModal()
    if (el.target.classList.contains('close') || el.target.classList.contains('success-close')) {
        closeModal()
        hideSuccessMessage()
    }
})

modalBg.addEventListener('submit', e => {
    e.preventDefault();
    clearErrorMessage();
    let flag = false;
    const name = e.target.querySelector('#first'),
          lastname = e.target.querySelector('#last'),
          email = e.target.querySelector('#email'),
          birthday = e.target.querySelector('#birthdate'),
          quantity = e.target.querySelector('#quantity'),
          locationInputs = e.target.querySelectorAll('input[name="location"]'),
          conditionInput = e.target.querySelector('#checkbox1')
    if (!isCorrectLength(name,2)){
        showErrorMessage(name, errorMsg.name)
        flag = true
    }
    if (!isCorrectLength(lastname,2)) {
        showErrorMessage(lastname, errorMsg.lastname)
        flag = true
    }
    if (!isValidMail(email)) {
        showErrorMessage(email, errorMsg.email)
        flag = true
    }
    if (!isCorrectDate(birthday)) {
        showErrorMessage(birthday, errorMsg.birthday)
        flag = true
    }
    if (!isNumber(quantity)) {
        showErrorMessage(quantity, errorMsg.quantity)
        flag = true
    }
    if (!isCheckedRadio(locationInputs)) {
        showErrorMessage(locationInputs, errorMsg.radio)
        flag = true
    }
    if (!isCheckedInput(conditionInput)) {
        showErrorMessage(conditionInput, errorMsg.check)
        flag = true
    }
    if (!flag) {
        e.target.style.display = "none"
        e.target.reset()
        showSuccessMessage()
    }
})