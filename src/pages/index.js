import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  editButton,
  addButton,
  config,
  formValidators,
  inputName,
  inputJob,
} from "../utils/constants.js";
import "./index.css";

const createCard = (data) => {
  const cardElement = new Card(
    {
      data,
      handleImageClick: () => {
        popupWithImage.open(data);
      },
    },
    "#card-templete"
  );
  return cardElement.getCardElement();
};

const addCard = (data) => {
  newSection.addItem(createCard(data));
};

const popupWithImage = new PopupWithImage("#modal__picture");

const newSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      addCard(data);
    },
  },
  ".elements__container"
);

const userInfo = new UserInfo(
  {
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
  },
  "#modal__edit"
);

const handleAddSubmit = (data) => {
  addCard(data);
};

const addFormPopup = new PopupWithForm(
  { handleFormSubmit: handleAddSubmit },
  "#modal__add"
);

const editFormPopup = new PopupWithForm(
  {
    handleFormSubmit: (inputValue) => {
      const profileInfo = {};
      profileInfo.name = inputValue.title;
      profileInfo.job = inputValue.description;
      userInfo.setUserInfo(profileInfo);
    },
  },
  "#modal__edit"
);

newSection.rendererItems();
popupWithImage.setEventListeners();
addFormPopup.setEventListeners();
editFormPopup.setEventListeners();

editButton.addEventListener("click", () => {
  editFormPopup.open();
  const profileInfo = userInfo.getUserInfo();
  inputName.value = profileInfo.name;
  inputJob.value = profileInfo.job;
  formValidators["profile-form"].resetValidation();
});

addButton.addEventListener("click", () => {
  addFormPopup.open();
});

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("id");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
