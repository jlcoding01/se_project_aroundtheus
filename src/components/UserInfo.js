export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }, popupSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  //a public method which takes new user data and adds it to the page
  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  setUserAvatar(link) {
    this._profileAvatar.src = link;
  }
}
