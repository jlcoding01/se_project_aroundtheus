import Popup from "./Popup.js";

export default class PopupWithVerify extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
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
}
