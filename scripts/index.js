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
const profileCloseModalBtn = profileEditModal.querySelector(
  "#profile-close-modal"
);
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
const cardCloseModalBtn = cardAddModal.querySelector("#card-close-modal");
const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");
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

  // add event listener like button
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button-active");
  });
  // add event listener delete
  // const cardDelBtn = cardElement.querySelector(".card__image-button");
  // cardDelBtn.addEventListener("click", () => {
  //   cardElement.remove(cardElement);
  // });

  // add event listener image
  // cardImageEl.addEventListener("click", () => {});
  // open modal
  // find image element inside modal
  // replace src with card link
  // replace alt with card title

  cardsListEl.prepend(cardElement);
}

// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileInputTitle.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  getCardElement({
    name: title,
    link: link,
  });
  closeModal(cardAddModal);
}

// Event Listeners

profileEditBtn.addEventListener("click", () => {
  profileInputTitle.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
});

cardAddNewBtn.addEventListener("click", () => openModal(cardAddModal));

profileCloseModalBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});

cardCloseModalBtn.addEventListener("click", function () {
  closeModal(cardAddModal);
});

profileForm.addEventListener("submit", handleProfileEditSubmit);

cardAddForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
});
