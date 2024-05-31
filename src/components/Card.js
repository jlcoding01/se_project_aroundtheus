class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelctor = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardElement
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelctor)
      .content.querySelector(".elements__cards")
      .cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".elements__image");
    this._cardTitle = this._cardElement.querySelector(".elements__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
