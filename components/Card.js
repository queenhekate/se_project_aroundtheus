export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    console.log(this._cardElement);
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        console.log("this");

        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__image-button")
      .addEventListener("click", () => {
        console.log("this");
        this._handleDeleteCard();
      });

    this._cardImgElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
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
    console.log(this._cardSelector);
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners;
    this.cardImgElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImgElement.src = this._link;
    this.cardImgElement.src = this._name;
    this._cardTitleElement.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
