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

// Elements

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModalBtn = profileEditModal.querySelector("#close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileInputTitle = document.querySelector("#profile-input-title");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const profileForm = document.forms["profile-form"];
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");

const cardAddNewBtn = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardCloseModalBtn = cardAddModal.querySelector("#close-modal");
const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");
const cardInputTitle = document.querySelector("#card-input-title");
const cardInputImage = document.querySelector("#card-input-image");
const cardAddForm = document.forms["add-card-form"];

// Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileInputTitle.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  cardTitle.textContent = cardInputTitle.value;
  cardDescription.textContent = cardInputDescription.value;
  closeModal();
}

// Event Listeners

profileEditBtn.addEventListener("click", () => {
  profileInputTitle.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileCloseModalBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListEl.prepend(cardElement);
});

cardAddNewBtn.addEventListener("click", () => openModal(cardAddModal));

cardCloseModalBtn.addEventListener("click", () => closeModal(cardAddModal));

cardAddForm.addEventListener("submit", handleAddCardSubmit);
