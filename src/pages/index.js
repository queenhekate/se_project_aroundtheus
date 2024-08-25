// CLASSES IMPORTS + STYLESHEET -----

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

// CONSTANTS IMPORTS -----

import {
  settings,
  initialCards,
  profileForm,
  cardAddForm,
  profileEditModal,
  cardAddModal,
  cardsListEl,
  profileEditBtn,
  profileTitle,
  profileDescription,
  cardAddNewBtn,
  addCardTitleInput,
  addCardImageInput,
  profileInputTitle,
  profileInputDescription,
} from "../utils/constants.js";

// Section -----

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardsListEl.prepend(cardElement);
    },
  },
  "cards__list"
);

section.renderItems();

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item);
  cardsListEl[method](cardElement);
}

// USER INFO -----

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

// userInfo.setUserInfo({ name: "Name", description: "Description" });

profileEditBtn.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profileInputTitle.value = info.name;
  profileInputDescription.value = info.description;
  editFormValidator.resetValidation();
  profileEditModal.openModal();
});

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");

// POPUP WITH IMAGE -----

const popupWithImage = new PopupWithImage({
  popupSelector: ".card__image",
});

popupWithImage.setEventListeners();

function handleImageClick(link, name) {
  popupWithImage.openModal(link, name);
}

// FORMS -----

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
  editFormValidator.resetValidation();
});

cardAddNewBtn.addEventListener("click", () => openModal(cardAddModal));

profileForm.addEventListener("submit", handleProfileEditSubmit);
const editFormValidator = new FormValidator(settings, profileForm);
editFormValidator.enableValidation();

// function handleImageClick(cardData) {
//   openModal(previewModal);
//   previewImageElement.src = cardData.link;
//   previewImageElement.alt = cardData.name;
//   previewImageLabel.textContent = cardData.name;
// }

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
