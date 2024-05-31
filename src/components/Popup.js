export default class Popup {
  constructor(popupSelector) {
    // this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  //   _handleRemoteClick(evt) {
  //     if (evt.target === evt.currentTarget) {
  //       this.close();
  //     }
  //   }

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".modal__close");

    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    // this._popupElement.addEventListener("mousedown", this._handleRemoteClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    // this._popupElement.removeEventListener(
    //   "mousedown",
    //   this._handleRemoteClick
    // );
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
