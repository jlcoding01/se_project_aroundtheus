export default class UserInfo {
  constructor({ nameSelector, jobSelector }, popupSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    // this._inputName = document.querySelector(".modal__input_name");
    // this._inputJob = document.querySelector(".modal__input_job");
  }

  getUserInfo() {
    // this._inputName.value = this._profileName.textContent;
    // this._inputJob.value = this._profileJob.textContent;
    //returns an object containing information about the user
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  //a public method which takes new user data and adds it to the page
  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  // setEventListeners() {
  //   this._popupElement.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //     this.setUserInfo();
  //     super.close();
  //   });
  //   super.setEventListeners();
  // }
}
