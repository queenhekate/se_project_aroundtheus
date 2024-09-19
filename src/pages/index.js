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

// let section;
// api
//   .getAppData()
//   .then(([userData, initialCards]) => {
//     userInfo.setUserInfo({
//       name: userData.title,
//       description: userData.description,
//     });
//     userInfo.setUserAvatar({ avatar: userData.avatar });
//     userId = userData._id;
//   })
//   .catch(console.error);

//   cardSection = new Section(
//     {
//       items: initialCards,
//       renderer: (item) => {
//         cardSection.addItem(createCard(item));
//       },
//     },
//     cardListElement
//   );
//   cardSection.renderItems();
// })
// .catch(console.error);

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
// })
// .catch(console.error);

// section.renderItems();

// INITIAL CARDS ------

api
  .getInitialCards()
  .then((cards) => {
    // cards is the list of cards that are on the server
    console.log("Fetched initial cards:", cards);
    section.renderItems(cards);
  })
  .catch((error) => {
    console.log("error fetching cards", error);
  });

function createCard(items) {
  console.log(items);
  const cardElement = new Card(
    items,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  return cardElement.getView();
}

// function renderCard(item, method = "addItem") {
//   const card = createCard(item);
//   section[method](card);
// }

// USER INFO -----

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__image",
});

// api
//   .getUserInfo(userInfo._title, userInfo._description)
//   .then((res) => {
//     userInfo.setUserInfo({ title: res.name, description: res.about });
//     userInfo.setAvatar(res.avatar);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

api
  .getUserInfo(userInfo._name, userInfo._description)
  .then((res) => {
    userInfo.updateProfileInfo({
      title: res.name,
      about: res.description,
    });
    userInfo.changeAvatar(res.avatar);
  })
  .catch(console.error);

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
  console.log("hello, world");
}

// EDIT PROFILE MODAL AND METHODS

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

// ADD CARD MODAL AND METHODS -----

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
      section.addItem(createCard(cardData));
      cardAddForm.reset();
      addCardPopup.close();
      addCardFormValidator.resetValidation();
    })
    .catch(console.error)
    .finally(() => {
      addCardPopup.renderLoading(false);
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

// FORM VALIDATION -----

const profileEditFormValidator = new FormValidator(settings, profileForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, cardAddForm);
addCardFormValidator.enableValidation();
