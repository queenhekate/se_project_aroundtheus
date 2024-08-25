// CLASSES IMPORTS + STYLESHEET -----

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

// CONSTANTS IMPORTS -----

import {
  settings,
  initialCards,
  profileForm,
  cardAddForm,
  cardsListEl,
  profileEditBtn,
  cardAddNewBtn,
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

// POPUP WITH IMAGE -----

const popupWithImage = new PopupWithImage({
  popupSelector: "#modal_type-preview",
});

popupWithImage.setEventListeners();

function handleImageClick(link, name) {
  popupWithImage.open(link, name);
  console.log("hello, world");
}

// POPUP WITH FORM -----
const profileEditFormValidator = new FormValidator(settings, profileForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, cardAddForm);
addCardFormValidator.enableValidation();

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo({ name: data.name, description: data.description });
  editProfilePopup.close();
};

const handleAddCardFormSubmit = (data) => {
  const cardData = { name: data.title, link: data.link };
  const cardInstance = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData);
  });
  const cardElement = cardInstance.generateCard();
  cardSection.addItem(cardElement);
  addCardPopup.close();
};

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardPopup.setEventListeners();

cardAddNewBtn.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator._toggleButtonState();
  console.log("hello, world");
});

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileInputTitle.value = userData.name;
  profileInputDescription.value = userData.description;
  profileEditFormValidator.resetValidation();
  editProfilePopup.open();
  console.log("hello, world");
});
