import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputTitle = document.querySelector(".modal__input_title");
    this._inputLink = document.querySelector(".modal__input_link");
  }

  _getInputValues() {
    this._formContent = {};
    this._formContent.name = this._inputTitle.value;
    this._formContent.link = this._inputLink.value;
    return this._formContent;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
