import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  cardContainer,
  editButton,
  addButton,
  config,
  formValidators,
} from "../utils/constants.js";
import "./index.css";

const popupWithImage = new PopupWithImage("#modal__picture");

const popupWithForm = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      const cardElement = new Card(
        {
          data,
          handleImageClick: () => {
            popupWithImage.open(data);
          },
        },
        "#card-templete"
      );
      cardContainer.prepend(cardElement.getCardElement());
    },
  },
  "#modal__add"
);

const newSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = new Card(
        {
          data,
          handleImageClick: () => {
            popupWithImage.open(data);
          },
        },
        "#card-templete"
      );
      newSection.addItem(cardElement.getCardElement());
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

newSection.rendererItems();
popupWithImage.setEventListeners();
popupWithForm.setEventListeners();
userInfo.setEventListeners();

editButton.addEventListener("click", () => {
  userInfo.getUserInfo();
  userInfo.open();
  formValidators["profile-form"].resetValidation();
});

addButton.addEventListener("click", () => {
  popupWithForm.open();
  formValidators["new-card"].resetValidation();
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
