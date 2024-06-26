import Popup from "./Popup.js";

export default class PopupWithVerify extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = document.querySelector(".modal__button-confirm");
    this._confirmButtonText = this._confirmButton.textContent;
  }

  setHandleDeleteMethod(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__button-confirm")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleDeleteSubmit();
        // this.close();
      });

    super.setEventListeners();
  }

  handleLoadingText(isLoading, loadingText = "Loading...") {
    if (isLoading) {
      this._confirmButton.textContent = loadingText;
    } else {
      this._confirmButton.textContent = this._confirmButtonText;
    }
  }
}
