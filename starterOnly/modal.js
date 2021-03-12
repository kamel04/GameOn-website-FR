//-------------------- VARIABLES --------------------//
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalSuccessful = document.querySelector(".successful-reservation");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const form = document.querySelector("form");
const locations = document.querySelectorAll("input[name=location]");

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

// modif last name
form.last.addEventListener("change", function () {
  delMessageError("last-message");
  verifLastName(this);
});

// modif email
form.email.addEventListener("change", function () {
  delMessageError("email-message");
  verifEmail(this);
});

// modif birthdate
form.birthdate.addEventListener("change", function () {
  delMessageError("birthdate-message");
  verifBirthDate(this);
});

// modif quantity
form.quantity.addEventListener("change", function () {
  delMessageError("quantity-message");
  verifQuantity(this);
});

// modif location
document.body.addEventListener("change", function (e) {
  let locationChanged;
  for (let i = 0; i < 6; i++) {
    if (locations[i].checked) {
      delMessageError("location-message");
    }
  }
});

// modif cgu
form.checkbox1.addEventListener("change", function (e) {
  delMessageError("cgu-message");
  verifCGU(this);
});

// press submit button
form.addEventListener("submit", function (e) {
  e.preventDefault();
  delMessageError("first-message");
  delMessageError("last-message");
  delMessageError("email-message");
  delMessageError("birthdate-message");
  delMessageError("quantity-message");
  delMessageError("location-message");
  delMessageError("cgu-message");
  if (
    verifFirstName(first) &&
    verifLastName(last) &&
    verifEmail(email) &&
    verifBirthDate(birthdate) &&
    verifQuantity(quantity) &&
    verifLocation() &&
    verifCGU(checkbox1)
  ) {
    modalSuccessful.style.display = "flex";
    this.reset();
  }
});

//-------------------- FUNCTIONS --------------------//

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  modalSuccessful.style.display = "none";
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

// check validity of the last name
const verifLastName = function (nom) {
  const newMessageError = document.createElement("div");
  newMessageError.classList.add("error-message", "last-message");

  if (nom.value.trim().length == "") {
    newMessageError.textContent = "Veuillez renseigner votre nom";
    nom.parentNode.appendChild(newMessageError);
    return false;
  }
  if (nom.value.trim().length < 2) {
    newMessageError.textContent =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom";
    nom.parentNode.appendChild(newMessageError);
    return false;
  }
  if (!nameRegex.test(nom.value.trim())) {
    newMessageError.textContent = "Votre Nom n'est pas valide";
    nom.parentNode.appendChild(newMessageError);
    return false;
  } else {
    nom.value = nom.value.trim();
    return true;
  }
};

// check validity of email
const verifEmail = function (email) {
  const newMessageError = document.createElement("div");
  newMessageError.classList.add("error-message", "email-message");

  if (!emailRegex.test(email.value.trim())) {
    newMessageError.textContent = "Votre Email n'est pas valide";
    email.parentNode.appendChild(newMessageError);
    return false;
  } else {
    email.value = email.value.trim();
    return true;
  }
};

// check validity of birthdate
const verifBirthDate = function (birthdate) {
  const newMessageError = document.createElement("div");
  newMessageError.classList.add("error-message", "birthdate-message");
  // the year of the current date
  let year = new Date().getFullYear();
  // minor age
  let ageMin = year - 18;
  // birth year
  let birthYear = birthdate.value.split("-")[0];

  if (birthdate.value == "") {
    newMessageError.textContent = "Veuillez rentrer votre date de naissance";
    birthdate.parentNode.appendChild(newMessageError);
    return false;
  }
  if (birthYear > ageMin) {
    newMessageError.textContent = "Vous devez être majeur pour participer";
    birthdate.parentNode.appendChild(newMessageError);
    return false;
  } else {
    return true;
  }
};

// check validity of quantity
const verifQuantity = function (quantity) {
  const newMessageError = document.createElement("div");
  newMessageError.classList.add("error-message", "quantity-message");

  if (quantity.value.trim().length == "") {
    newMessageError.textContent =
      "Veuillez renseigner le nombre de vos participations";
    quantity.parentNode.appendChild(newMessageError);
    return false;
  }
  if (quantity.value > 99) {
    newMessageError.textContent = "Veuillez entrer un nombre inférieur à 100";
    quantity.parentNode.appendChild(newMessageError);
    return false;
  }
  if (!numberRegex.test(quantity.value.trim())) {
    newMessageError.textContent =
      "Veuillez indiquer un nombre entier entre 0 et 99";
    quantity.parentNode.appendChild(newMessageError);
    return false;
  } else {
    quantity.value = quantity.value.trim();
    return true;
  }
};

// check location
const verifLocation = function () {
  delMessageError("location-message");
  const newMessageError = document.createElement("div");
  newMessageError.classList.add("error-message", "location-message");
  newMessageError.textContent = "Veuillez choisir une ville";

  let locationChecked;
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      locationChecked = locations[i].value;
    }
  }

  if (!locationChecked == "") {
    delMessageError("location-message");
    return true;
  } else {
    let parent = document.getElementById("locationsDiv");
    parent.appendChild(newMessageError);
    return false;
  }
};

// check CGU
const verifCGU = function (cgu) {
  const newMessageError = document.createElement("div");
  newMessageError.classList.add("error-message", "cgu-message");

  if (cgu.checked) {
    return true;
  } else {
    newMessageError.textContent =
      "Veuillez verifier et accepter les conditions générales d'utilisation.";
    cgu.parentNode.appendChild(newMessageError);
    return false;
  }
};

// clear error message
function delMessageError(delElement) {
  let childs = document.getElementsByClassName(delElement);
  Array.from(childs).forEach((c) => {
    c.parentNode.removeChild(c);
  });
}
