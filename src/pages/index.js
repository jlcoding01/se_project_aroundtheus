import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  avatarButton,
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

//Api
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

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      job: res.about,
    });
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

//functions
const handleAddSubmit = (data) => {
  addFormPopup.handleLoadingText(true);
  api
    .addNewCard(data.name, data.link)
    .then((cardData) => {
      addCard(cardData);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addFormPopup.handleLoadingText(false);
    });
};

const handleEditSubmit = (inputValue) => {
  editFormPopup.handleLoadingText(true);
  api
    .editProfile(inputValue.title, inputValue.description)
    .then((data) => {
      const profileInfo = {};
      profileInfo.name = data.name;
      profileInfo.job = data.about;
      userInfo.setUserInfo(profileInfo);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      editFormPopup.handleLoadingText(false);
    });
};

const handleDeleteButton = (card) => {
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

const handleAvatarSubmit = (data) => {
  api.updateAvatar(data.avatar).then((res) => {
    userInfo.setUserAvatar(res.avatar);
  });
};

const handleLikeButton = (card) => {
  if (!card.isLiked) {
    api
      .addLikes(card._id)
      .then(() => {
        card.isLiked = !card.isLiked;
        card.toggleLikeElement();
      })
      .catch((err) => console.error(err));
  } else {
    api
      .removeLikes(card._id)
      .then(() => {
        card.isLiked = !card.isLiked;
        card.toggleLikeElement();
      })
      .catch((err) => console.error(err));
  }
};

//create classes
const createCard = (data) => {
  const cardElement = new Card(
    {
      data,
      handleImageClick: () => {
        popupWithImage.open(data);
      },
      handleDeleteButton,
      handleLikeButton,
    },
    "#card-templete"
  ).getCardElement();
  return cardElement;
};

const addCard = (data) => {
  newSection.addItem(createCard(data));
};

const newSection = new Section(
  {
    items: [],
    renderer: (data) => {
      addCard(data);
    },
  },
  ".elements__container"
);

const popupWithImage = new PopupWithImage("#modal__picture");

const userInfo = new UserInfo(
  {
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
    avatarSelector: ".profile__avatar",
  },
  "#modal__edit"
);

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

const deletePopup = new PopupWithVerify("#modal__delete");

const avatarFormPopup = new PopupWithForm(
  { handleFormSubmit: handleAvatarSubmit },
  "#modal__avatar"
);

//call class method
newSection.rendererItems();
popupWithImage.setEventListeners();
addFormPopup.setEventListeners();
editFormPopup.setEventListeners();
deletePopup.setEventListeners();
avatarFormPopup.setEventListeners();

//create button eventListeners
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

avatarButton.addEventListener("click", () => {
  avatarFormPopup.open();
});

//form validation
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
