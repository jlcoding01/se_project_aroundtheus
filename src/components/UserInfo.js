import Popup from "./Popup.js";

export default class UserInfo extends Popup {
  constructor({ nameSelector, jobSelector }, popupSelector) {
    super(popupSelector);
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._inputName = document.querySelector(".modal__input_name");
    this._inputJob = document.querySelector(".modal__input_job");
  }

  getUserInfo() {
    this._inputName.value = this._profileName.textContent;
    this._inputJob.value = this._profileJob.textContent;
  }

  setUserInfo() {
    this._profileName.textContent = this._inputName.value;
    this._profileJob.textContent = this._inputJob.value;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.setUserInfo();
      super.close();
    });
    super.setEventListeners();
  }
}
