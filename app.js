const formButton = document.querySelector(".form-button a")
let debounce = false;

const formName = document.getElementById("input-name");
const formEmail = document.getElementById("input-email");
const formNumber = document.getElementById("input-phone-number");

function validateInput(inputElement) {
    const trimmedValue = inputElement.value.trim();

    if (trimmedValue === "") {
        console.log("Please fill in all fields");
        inputElement.classList.add("shake");
        inputElement.addEventListener("animationend", () => {
            inputElement.classList.remove("shake");
        }, { once: true });

        return false;
    }

    if (inputElement === formEmail && !isValidEmail(trimmedValue)) {
        console.log("Please enter a valid email address");
        inputElement.classList.add("shake");
        inputElement.addEventListener("animationend", () => {
            inputElement.classList.remove("shake");
        }, { once: true });
        return false;
    }

    if (inputElement === formName && !isValidName(trimmedValue)) {
        console.log("Please enter a valid name");
        inputElement.classList.add("shake");
        inputElement.addEventListener("animationend", () => {
            inputElement.classList.remove("shake");
        }, { once: true });
        return false;
    }

    if (inputElement === formNumber && !isValidPhoneNumber(trimmedValue)) {
        console.log("Please enter a valid phone number");
        inputElement.classList.add("shake");
        inputElement.addEventListener("animationend", () => {
            inputElement.classList.remove("shake");
        }, { once: true });
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidName(name) {
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    return nameRegex.test(name);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{7,15}$/;
    return phoneRegex.test(phoneNumber);
}


formButton.addEventListener("click", (e) => {

    e.preventDefault();

    const isNameValid = validateInput(formName);
    const isEmailValid = validateInput(formEmail);
    const isNumberValid = validateInput(formNumber);

    if (!isNameValid || !isEmailValid || !isNumberValid) {
        return;
    }

    if (debounce == true) {
        alert("On Cooldown!");
        return;
    }

    if (debounce == false) {

        debounce = true;

        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "findmypru@gmail.com",
            Password: "CAFEAB504291A239FB057D331311432602D9",
            To: "mypru.net1@gmail.com",
            From: "findmypru@gmail.com",
            Subject: "Quote",
            Body: `Nama: ${formName.value} <br><br> Email: ${formEmail.value} <br><br> Nomor HP: ${formNumber.value}`
        })

        alert("Successfully Sent!");

        setTimeout(() => {
            debounce = false;
        }, 5000)

    }

    console.log(debounce);

})