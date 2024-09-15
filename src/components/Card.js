export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    console.log(this._cardElement);
    this._likeButton.addEventListener("click", () => {
      console.log("this");
      this._handleLikeIcon();
    });

    this._trashButton.addEventListener("click", () => {
      console.log("this");
      this._handleDeleteClick(this._id, this);
    });

    this._cardImgElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    console.log(this._cardSelector);
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImgElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImgElement.src = this._link;
    this._cardImgElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__image-button");
    this._setEventListeners();
    return this._cardElement;
  }
}
