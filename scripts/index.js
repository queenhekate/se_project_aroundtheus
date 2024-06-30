const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
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
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileInputTitle.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(profileEditModal);
}

// Event Listeners

profileEditBtn.addEventListener("click", () => {
  profileInputTitle.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
});

cardAddNewBtn.addEventListener("click", () => openModal(cardAddModal));

profileForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  // add event listener like button
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button-active");
  });

  // add event listener delete
  const cardDelBtn = cardElement.querySelector(".card__image-button");
  cardDelBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  // add event listener image
  function handleImageClick(cardData) {
    openModal(previewModal);
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewImageLabel.textContent = cardData.name;
  }

  cardImageEl.addEventListener("click", () => handleImageClick(cardData));
  cardsListEl.prepend(cardElement);

  // function createCard(item) {
  //   return cardElement;
  // }
  // function getCardElement(cardData) {
  //   const cardElement = createCard(cardData);
  //   cardsListEl.prepend(cardElement);
  // }
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  getCardElement({
    name: title,
    link: link,
  });
  evt.target.reset();
  closeModal(cardAddModal);
}
