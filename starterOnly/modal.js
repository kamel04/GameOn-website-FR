//-------------------- VARIABLES --------------------//
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const form = document.querySelector("form");

//-------------------- REGEXP --------------------//
const nameRegex = /^([A-Za-zÀ-ÿ][-,a-z. ']+[ ]*)+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /^[0-9]*$/;

//-------------------- EVENTS --------------------//

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// modif first name
form.first.addEventListener("change", function () {
  delMessageError("first-message");
  verifFirstName(this);
});

//-------------------- FUNCTIONS --------------------//

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// check validity of the first name
const verifFirstName = function (prenom) {
  const newMessageError = document.createElement("div");
  newMessageError.classList.add("error-message", "first-message");

  if (prenom.value.trim().length == "") {
    newMessageError.textContent = "Veuillez renseigner votre prénom";
    prenom.parentNode.appendChild(newMessageError);
    return false;
  }
  if (prenom.value.trim().length < 2) {
    // const newMessageError = document.createElement("div");
    // newMessageError.classList.add("error-message", "first-message");
    newMessageError.textContent =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom";
    prenom.parentNode.appendChild(newMessageError);
    return false;
  }
  if (!nameRegex.test(prenom.value.trim())) {
    newMessageError.textContent = "Votre Prénom n'est pas valide";
    prenom.parentNode.appendChild(newMessageError);
    return false;
  } else {
    prenom.value = prenom.value.trim();
    return true;
  }
};

// clear error message
function delMessageError(delElement) {
  let childs = document.getElementsByClassName(delElement);
  Array.from(childs).forEach((c) => {
    c.parentNode.removeChild(c);
  });
}
