export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    const likeButton = this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    const deleteButton = this._cardElement
      .querySelector(".card__image-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove;
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners;
    //return the card
  }
}
