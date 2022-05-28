function editNav() {
    const x = document.getElementById("myTopnav")
    x.classList.contains('responsive') ? x.classList.remove('responsive') : x.classList.add('responsive')
}

/* DOM Elements */
const modalForm = document.querySelector('#reservation-form')
const modalBg = document.querySelector(".bground")
const successMsg = document.querySelector(".success")

/* Object with error messages for different inputs */
const errorMsg = {
    name: "Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
    lastname: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    email: "Veuillez entrer mail valide.",
    birthday: "Vous devez entrer votre date de naissance.",
    quantity: "Veuillez entrer un nombre valide.",
    radio: "Vous devez choisir une option.",
    check: "Vous devez vérifier que vous acceptez les termes et conditions.",
}

/* Booleans functions */

// Check min length of input
function isCorrectLength(input, min) {
    // trim() removes whitespace from both sides of the string
    return input.value.trim().length >= min // If the length is greater than or equal to min, return true
}

// Check if input value is a valid email
function isValidMail(email) {
    if (email.value.length < 5) return false
    // Regular expression to check if the email is valid
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) // If the email is valid, return true
}

// Check if input value is a valid date
function isCorrectDate(date) {
    // If value is empty, return false
    if (date.value.length === 0) return false
    // Regular expression to check if the date is valid
    return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(date.value) // If the date is valid, return true
}

// Check if input value is a valid number
function isNumber(input) {
    // If value is empty, return false
    return input.value !== '' ? !isNaN(input.value) : false // If the value is a number, return true
}

// Check if some inputs has been checked
function isCheckedRadio(inputs) {
    // Transform the NodeList into an Array
    return Array.from(inputs).some(input => input.checked) // If at least one input is checked, return true
}

// Check if input has been checked
function isCheckedInput(input) {
    return input.checked // If the input is checked, return true
}


/* Action functions */

//This function is open the modal window
function launchModal() {
    modalBg.style.display = "block"
    modalForm.style.display = "block"
    document.body.style.overflow = "hidden"
}

//This function is close the modal window
function closeModal() {
    modalBg.style.display = "none"
    modalForm.style.display = "none"
    document.body.style.overflow = "auto"
}

//This function create error message and add it to the DOM
function showErrorMessage(el, msg = 'Vous devez entrer ce champ.', autoRemove = false) { //Use default value for msg and autoRemove
    let error = document.createElement("div") // Create a div element
    error.classList.add("error") // Add a class to the div element
    error.innerHTML = msg // Inner the error message to the div element
    if (el.style?.border !== undefined) { // If the element has a border
        el.style.border = "2px solid tomato" // Add a red border
        setTimeout(() => {
            el.style.border = "none" // Remove the border after 2 second
        }, 2000)
    }
    el.parentElement ? el.parentElement.appendChild(error) : el[0].parentElement.appendChild(error) // Add the error message to the DOM for parent element
    if (autoRemove) { // If the error message has to be removed after 2 second
        setTimeout(() => {
            el.parentElement ? el.parentElement.removeChild(error) : el[0].parentElement.removeChild(error)
        }, 2000)
    }
}

//This function remove error messages from the DOM
function clearErrorMessages() {
    // Get all error messages and remove them
    document.querySelectorAll(".error").forEach(el => el.remove())
}

//This function show success message
function showSuccessMessage() {
    successMsg.style.display = "block"
}

//This function hide success message
function hideSuccessMessage() {
    successMsg.style.display = "none"
}

//This function find elements by selector and add class to them
function addClassFixed(selector) {
    document.querySelector(selector).classList.add("fixed")
}

//This function find elements by selector and remove class to them
function removeClassFixed(selector) {
    document.querySelector(selector).classList.remove("fixed")
}

//Event listeners

//Get all document and add event listener to them
document.addEventListener('click', el => {
    //Use delegation to find the elements

    //If the target element has a class "modal-btn"
    if (el.target.classList.contains('modal-btn')) {
        launchModal()  // launch the modal window
        addClassFixed('.topnav')  //Add a class "fixed" to the topnav element (for mobile version, check the css file)
    }
    //If the target element has a class "modal-btn" or "success-close"
    if (el.target.classList.contains('close') || el.target.classList.contains('success-close')) {
        closeModal() // close the modal window
        removeClassFixed('.topnav') // Remove the class "fixed" from the topnav element
        clearErrorMessages() // Remove all error messages from the DOM
        hideSuccessMessage() // Hide the success message
    }
})

// Called the function when the user try to send the form, look index.html line 64
function validate(e) {
    e.preventDefault() // Prevent the default action of the form
    clearErrorMessages() // Remove all error messages from the DOM
    const {target} = e  // Get the target element of the event (Destructuring)
    let flag = false // Create a flag to check if there is an error

    //Get inputs from the form
    const name = target.querySelector('#first'), lastname = target.querySelector('#last'),
        email = target.querySelector('#email'), birthday = target.querySelector('#birthdate'),
        quantity = target.querySelector('#quantity'),
        locationInputs = target.querySelectorAll('input[name="location"]'),
        conditionInput = target.querySelector('#checkbox1')

    //If length of the name or lastname is less than 2 characters
    if (!isCorrectLength(name, 2)) {
        showErrorMessage(name, errorMsg.name)  // Show error message with the error message from the errorMsg object
        flag = true // Set the flag to true
    }
    if (!isCorrectLength(lastname, 2)) {
        showErrorMessage(lastname, errorMsg.lastname) // Show error message with the error message from the errorMsg object
        flag = true // Set the flag to true
    }
    //If the email is not valid
    if (!isValidMail(email)) {
        showErrorMessage(email, errorMsg.email) // Show error message with the error message from the errorMsg object
        flag = true // Set the flag to true
    }
    //If the date birthday is not valid
    if (!isCorrectDate(birthday)) {
        showErrorMessage(birthday, errorMsg.birthday) // Show error message with the error message from the errorMsg object
        flag = true // Set the flag to true
    }
    //If the quantity is not a number
    if (!isNumber(quantity)) {
        showErrorMessage(quantity, errorMsg.quantity) // Show error message with the error message from the errorMsg object
        flag = true // Set the flag to true
    }
    //If the location is not selected
    if (!isCheckedRadio(locationInputs)) {
        showErrorMessage(locationInputs, errorMsg.radio) // Show error message with the error message from the errorMsg object
        flag = true // Set the flag to true
    }
    //If the condition is not selected
    if (!isCheckedInput(conditionInput)) {
        showErrorMessage(conditionInput, errorMsg.check) // Show error message with the error message from the errorMsg object
        flag = true // Set the flag to true
    }

    //If flag is true send the form and show the success message and reset the form
    if (!flag) {
        target.style.display = "none"
        target.reset()
        showSuccessMessage()
    }
}


/*
* Comme vous l'avez dit, j'ai essayé d'implémenter une fonction qui vérifie le input quand le focus est perdu.
* Cette fonction fonctionne, mais il faut réécrire partiellement le code afin de le rendre confortable pour les utilisateurs.
* Vous pouvez vérifier cela fonctionne, il vous suffit uncommenter le code
*/
// modalBg.addEventListener('focusout', ({target}) => {
//     if (target.id === 'first') {
//         if (!isCorrectLength(target, 2)) showErrorMessage(target, errorMsg.name, true)
//     } else if (target.id === 'last') {
//         if (!isCorrectLength(target, 2)) showErrorMessage(target, errorMsg.lastname, true)
//     } else if (target.id === 'email') {
//         if (!isValidMail(target)) showErrorMessage(target, errorMsg.email, true)
//     } else if (target.id === 'birthdate') {
//         if (!isCorrectDate(target)) showErrorMessage(target, errorMsg.birthday, true)
//     } else if (target.id === 'quantity') {
//         if (!isNumber(target)) showErrorMessage(target, errorMsg.quantity, true)
//     }
// })