import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Balsam Township",
    link: "https://www.compass.com/m/f6d367cc15ca0025f0d4911cccdd6befe350606b_img_0_4db8e/640x480.jpg",
  },
  {
    name: "Split Rock Lighthouse",
    link: "https://www.greatlakescruises.com/uploads/1/0/6/4/106440933/duluth-split-rock-lighthouse-3_orig.jpg",
  },
  {
    name: "Mississippi River",
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Efmo_View_from_Fire_Point.jpg/640px-Efmo_View_from_Fire_Point.jpg",
  },
  {
    name: "Voyageurs National Park",
    link: "https://www.planetware.com/wpimages/2019/12/minnesota-in-pictures-beautiful-places-to-photograph-voyageurs-national-park.jpg",
  },
  {
    name: "Minnehaha Falls",
    link: "https://www.planetware.com/wpimages/2019/12/minnesota-in-pictures-beautiful-places-to-photograph-minnehaha-falls.jpg",
  },
  {
    name: "Boundary Waters Canoe Area Wilderness",
    link: "https://www.minnpost.com/wp-content/uploads/2022/03/SouthTemperanceLake940.jpg",
  },
];

const cardData = [
  {
    name: "Balsam Township",
    link: "https://www.compass.com/m/f6d367cc15ca0025f0d4911cccdd6befe350606b_img_0_4db8e/640x480.jpg",
  },
  // {
  //   name: "Split Rock Lighthouse",
  //   link: "https://www.greatlakescruises.com/uploads/1/0/6/4/106440933/duluth-split-rock-lighthouse-3_orig.jpg",
  // },
  // {
  //   name: "Mississippi River",
  //   link: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Efmo_View_from_Fire_Point.jpg/640px-Efmo_View_from_Fire_Point.jpg",
  // },
  // {
  //   name: "Voyageurs National Park",
  //   link: "https://www.planetware.com/wpimages/2019/12/minnesota-in-pictures-beautiful-places-to-photograph-voyageurs-national-park.jpg",
  // },
  // {
  //   name: "Minnehaha Falls",
  //   link: "https://www.planetware.com/wpimages/2019/12/minnesota-in-pictures-beautiful-places-to-photograph-minnehaha-falls.jpg",
  // },
  // {
  //   name: "Boundary Waters Canoe Area Wilderness",
  //   link: "https://www.minnpost.com/wp-content/uploads/2022/03/SouthTemperanceLake940.jpg",
  // },
];

// Wrappers

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileForm = document.forms["profile-form"];
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = document.forms["add-card-form"];
const previewModal = document.querySelector("#modal_type-preview");
const previewImageElement = previewModal.querySelector(".card__image_preview");
const previewImageLabel = previewModal.querySelector(".modal__caption");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");

// Buttons and other DOM nodes
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardAddNewBtn = document.querySelector("#card-add-button");
const addCardTitleInput = document.querySelector("#card-input-title");
const addCardImageInput = document.querySelector("#card-input-url");

// Form data

const profileInputTitle = document.querySelector("#profile-input-title");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");

// Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("mousedown", handleModalClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("mousedown", handleModalClick);
}

//call the same close() function as the close button

const handleModalClick = (event) => {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
};

//close the popup by pressing the Esc key
const handleEscKey = (event) => {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
};

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileInputTitle.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(profileEditModal);
}

profileEditBtn.addEventListener("click", () => {
  profileInputTitle.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
  FormValidator.resetValidation(profileEditModal);
});

cardAddNewBtn.addEventListener("click", () => openModal(cardAddModal));

profileForm.addEventListener("submit", handleProfileEditSubmit);
const editFormValidator = new FormValidator(settings, profileForm);
editFormValidator.enableValidation();

function handleImageClick(cardData) {
  openModal(previewModal);
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageLabel.textContent = cardData.name;
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCard = {
    name: addCardTitleInput.value,
    link: addCardImageInput.value,
  };
  renderCard(newCard);
  e.target.reset();
  addFormValidator.disableButton();
  closeModal(cardAddModal);
}

cardAddForm.addEventListener("submit", handleAddCardSubmit);
const addFormValidator = new FormValidator(settings, cardAddForm);
addFormValidator.enableValidation();
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item);
  cardsListEl[method](cardElement);
}
