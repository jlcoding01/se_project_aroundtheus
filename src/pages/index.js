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
import Api from "../components/Api.js";
import PopupWithVerify from "../components/PopupWithVerify.js";

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "57aa7463-f839-44ea-835b-493cff8bea63",
  "Content-Type": "application/json",
});

api
  .getInitialCards()
  .then((res) => {
    res.forEach((card) => {
      addCard(card);
    });
  })
  .catch(console.error);

const createCard = (data) => {
  const cardElement = new Card(
    {
      data,
      handleImageClick: () => {
        popupWithImage.open(data);
      },
      handleDeleteButton,
    },
    "#card-templete"
  ).getCardElement();
  return cardElement;
};

const addCard = (data) => {
  newSection.addItem(createCard(data));
};

const popupWithImage = new PopupWithImage("#modal__picture");

const newSection = new Section(
  {
    items: [],
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
    avatarSelector: ".profile__avatar",
  },
  "#modal__edit"
);

const handleAddSubmit = (data) => {
  addCard(data);
  api.addNewCard(data.name, data.link);
};

const handleEditSubmit = (inputValue) => {
  api.editProfile(inputValue.title, inputValue.description).then((data) => {
    const profileInfo = {};
    profileInfo.name = data.name;
    profileInfo.job = data.about;
    userInfo.setUserInfo(profileInfo);
  });
};

const addFormPopup = new PopupWithForm(
  { handleFormSubmit: handleAddSubmit },
  "#modal__add"
);

const editFormPopup = new PopupWithForm(
  {
    handleFormSubmit: handleEditSubmit,
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

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      job: res.about,
    });
    userInfo.setUserAvatar(res.avatar);
  })
  .catch(console.error);

const deletePopup = new PopupWithVerify("#modal__delete");
deletePopup.setEventListeners();

const handleDeleteButton = (card) => {
  console.log(card);
  deletePopup.open();

  deletePopup.setHandleDeleteMethod(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCardElement();
        deletePopup.close();
      })
      .catch(console.error);
  });
};
