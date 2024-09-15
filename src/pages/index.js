// CLASSES IMPORTS + STYLESHEET -----

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";

// CONSTANTS IMPORTS -----

import { settings, initialCards } from "../utils/constants.js";
console.log("Imported initialCards:", initialCards);

//FORMS
export const profileForm = document.forms["profile-form"];
export const cardAddForm = document.forms["add-card-form"];

// Wrappers

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const cardAddModal = document.querySelector("#card-add-modal");
//export const cardsList = document.querySelector(".cards__list");

// Buttons and other DOM nodes
export const closeButtons = document.querySelectorAll(".modal__close");
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const cardAddNewBtn = document.querySelector("#card-add-button");

// Form data

export const profileInputTitle = document.querySelector("#profile-input-title");
export const profileInputDescription = document.querySelector(
  "#profile-input-description"
);

export const addCardTitleInput = document.querySelector("#card-input-title");
export const addCardImageInput = document.querySelector("#card-input-url");

// API ------

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d2cb5c42-088c-4f10-972a-3d1426bf2382",
    "Content-Type": "application/json",
  },
});

// Section -----

const section = new Section(
  {
    // items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

// section.renderItems();

// Cards ------

api
  .getInitialCards()
  .then((initialCards) => {
    // cards is the list of cards that are on the server
    console.log("Fetched initial cards:", initialCards);
    section.renderItems(initialCards);
  })
  .catch((error) => {
    console.log("error fetching cards", error);
  });

function createCard(item) {
  console.log(item);
  const cardElement = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  return cardElement.getView();
}

function renderCard(item, method = "addItem") {
  const cardElement = createCard(item);
  section[method](cardElement);
}

// USER INFO -----

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

// POPUP CONFIRM DELETE -----

const deleteCardPopup = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal",
});
deleteCardPopup.setEventListeners();

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
  console.log(data);
  userInfo.setUserInfo(data.title, data.description);
  editProfilePopup.close();
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

// const handleAddCardFormSubmit = (data) => {
//   const cardData = { name: data.name, link: data.link };
//   renderCard(cardData);
//   addCardPopup.close();
// };

function handleAddCardFormSubmit(data) {
  addCardPopup.renderLoading(true);
  api
    .addCard({ name: data.name, link: data.link })
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addCardForm.reset();
      newCardPopup.close();
      addCardFormValidator.resetForm();
    })
    .catch(console.error)
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
}

// Delete Card Modal Function

function handleDeleteCard(cardId, card) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        handleDeleteCard();
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

cardAddNewBtn.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
  console.log("hello, world");
});

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileInputTitle.value = userData.name;
  profileInputDescription.value = userData.description;
  profileEditFormValidator.resetValidation();
  editProfilePopup.open();
});
