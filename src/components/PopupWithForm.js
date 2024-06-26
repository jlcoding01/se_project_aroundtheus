import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = document.querySelectorAll(".modal__input");
    this._saveButton = this._popupForm.querySelector(".modal__button-save");
    this._saveButtonText = this._saveButton.textContent;
  }

  _getInputValues() {
    this._formContent = {};

    this._inputList.forEach((input) => {
      this._formContent[input.name] = input.value;
    });
    return this._formContent;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // // this.close();
      // this._popupForm.reset();
    });
    super.setEventListeners();
  }

  resetForm() {
    this._popupForm.reset();
  }

  handleLoadingText(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._saveButton.textContent = loadingText;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }
}
