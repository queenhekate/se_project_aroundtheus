export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const initialCards = [
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

//FORMS
export const profileForm = document.forms["profile-form"];
export const cardAddForm = document.forms["add-card-form"];

// Wrappers

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const cardAddModal = document.querySelector("#card-add-modal");
export const cardsListEl = document.querySelector(".cards__list");

// Buttons and other DOM nodes
export const closeButtons = document.querySelectorAll(".modal__close");
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const cardAddNewBtn = document.querySelector("#card-add-button");

// Form data

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileInputTitle = document.querySelector("#profile-input-title");
export const profileInputDescription = document.querySelector(
  "#profile-input-description"
);

export const addCardTitleInput = document.querySelector("#card-input-title");
export const addCardImageInput = document.querySelector("#card-input-url");
