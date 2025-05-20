// CLASSES IMPORTS + STYLESHEET -----

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

// CONSTANTS IMPORTS -----

import { settings } from "../utils/constants.js";

//FORMS
export const profileForm = document.forms["profile-form"];
export const cardAddForm = document.forms["add-card-form"];
export const avatarForm = document.forms["edit-avatar-form"];

// Wrappers

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const cardAddModal = document.querySelector("#card-add-modal");
//export const cardsList = document.querySelector(".cards__list");

// Buttons and other DOM nodes
const closeButtons = document.querySelectorAll(".modal__close");
const profileEditBtn = document.querySelector("#profile-edit-button");
const cardAddNewBtn = document.querySelector("#card-add-button");
const editAvatarButton = document.querySelector("#edit-avatar-icon");

// Form data

export const avatarUrlInput = document.querySelector("#avatar-input-url");
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
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards__list"
);

// INITIAL CARDS ------

api
  .getInitialCards()
  .then((cards) => {
    // cards is the list of cards that are on the server
    section.renderItems(cards);
  })
  .catch((error) => {
    console.log("error fetching cards", error);
  });

function createCard(items) {
  const cardElement = new Card(
    items,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeButton
  );
  return cardElement.getView();
}

// USER INFO -----

const userInfo = new UserInfo({
  title: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",
});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      title: data.name,
      description: data.about,
      avatar: data.avatar,
    });
  })
  .catch(console.error);

// LIKE AND UNLIKE -----

function handleLikeButton(cardElement) {
  if (!cardElement.isLiked) {
    api
      .likeCard(cardElement._id)
      .then(() => {
        cardElement.isLiked = true;
        cardElement.handleLikeIcon();
      })
      .catch(console.error);
  } else {
    api
      .unlikeCard(cardElement._id)
      .then(() => {
        cardElement.isLiked = false;
        cardElement.handleLikeIcon();
      })
      .catch(console.error);
  }
}

// UNIVERSAL FORM FUNCTIONS

// You can make a universal function that accepts a request, popup instance and optional loading text
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  // here we change the button text
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      // We need to close only in `then`
      popupInstance.close();
    })
    // we need to catch possible errors
    // console.error is used to handle errors if you don’t have any other ways for that
    .catch(console.error)
    // in `finally` we need to return the initial button text back in any case
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// DELETE MODAL AND METHODS -----

const deleteCardPopup = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal",
});
deleteCardPopup.setEventListeners();

function handleDeleteCard(cardId, cardElement) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

// IMAGE MODAL AND METHODS -----

const popupWithImage = new PopupWithImage({
  popupSelector: "#modal_type-preview",
});

popupWithImage.setEventListeners();

function handleImageClick(link, name) {
  popupWithImage.open(link, name);
}

// EDIT PROFILE MODAL AND METHODS
const handleProfileFormSubmit = (data) => {
  function makeRequest() {
    return api.updateProfileInfo(data).then((res) => {
      userInfo.setUserInfo({
        title: res.name,
        description: res.about,
        avatar: res.avatar,
      });
    });
  }
  handleSubmit(makeRequest, editProfilePopup);
};

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
editProfilePopup.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileInputTitle.value = userData.title;
  profileInputDescription.value = userData.description;
  profileEditFormValidator.resetValidation();
  editProfilePopup.open();
});

// AVATAR MODAL AND METHODS -----

const handleAvatarFormSubmit = (data) => {
  function makeRequest() {
    return api.updateProfileAvatar(data.link).then(() => {
      userInfo.changeAvatar(data.link);
    });
  }
  handleSubmit(makeRequest, editAvatarPopup);
};

const editAvatarPopup = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", () => {
  avatarUrlInput.value = userInfo.getUserInfo().avatar;
  avatarFormValidator.resetValidation();
  editAvatarPopup.open();
});

// ADD CARD MODAL AND METHODS -----

const addCardPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardPopup.setEventListeners();

function handleAddCardFormSubmit(data) {
  function makeRequest() {
    return api
      .addCard({ name: data.name, link: data.link })
      .then((cardData) => {
        section.addItem(createCard(cardData));
        cardAddForm.reset();
        addCardFormValidator.disableButton();
      });
  }
  handleSubmit(makeRequest, addCardPopup);
}

cardAddNewBtn.addEventListener("click", () => {
  addCardPopup.open();
});

// FORM VALIDATION -----

const profileEditFormValidator = new FormValidator(settings, profileForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, cardAddForm);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, avatarForm);
avatarFormValidator.enableValidation();
