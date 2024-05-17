import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const closeModalOnRemoteClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
};

const closeModalByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalByEsc);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalByEsc);
};

const pictureModal = document.querySelector("#modal__picture");
const pictureCloseButton = document.querySelector("#modal__picture_close");
const modalImage = pictureModal.querySelector(".modal__picture_large");
const modalImageTitle = pictureModal.querySelector(".modal__picture_title");

pictureCloseButton.addEventListener("click", () => {
  closeModal(pictureModal);
});

const handleImageClick = (data) => {
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalImageTitle.textContent = data.name;
  openModal(pictureModal);
};

const cardContainer = document.querySelector(".elements__container");

const renderCard = (data, wrap) => {
  const card = new Card(data, "#card-templete", handleImageClick);
  wrap.append(card.getCardElement());
};

initialCards.forEach((data) => {
  renderCard(data, cardContainer);
});

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#modal__edit");

const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#modal__add");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const inputName = document.querySelector(".modal__input_name");
const inputJob = document.querySelector(".modal__input_job");

const inputTitle = document.querySelector(".modal__input_title");
const inputLink = document.querySelector(".modal__input_link");

const editCloseButton = document.querySelector("#modal__edit_close");
const addCloseButton = document.querySelector("#modal__add_close");

const formProfile = document.forms["profile-form"];
const newCard = document.forms["new-card"];

const clickEditButton = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openModal(editModal);
  profileFormValidator.disableButton();
};

const clickAddButton = () => {
  openModal(addModal);
};

editButton.addEventListener("click", clickEditButton);
addButton.addEventListener("click", clickAddButton);

editCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

addCloseButton.addEventListener("click", () => {
  closeModal(addModal);
});

const saveProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(editModal);
};

formProfile.addEventListener("submit", saveProfileForm);

const createNewCard = (evt) => {
  evt.preventDefault();
  const cardContent = {};
  cardContent.name = inputTitle.value;
  cardContent.link = inputLink.value;
  const newCardContent = new Card(
    cardContent,
    "#card-templete",
    handleImageClick
  );
  cardContainer.prepend(newCardContent.getCardElement());
  closeModal(addModal);
  newCard.reset();
};

newCard.addEventListener("submit", createNewCard);

const configObj = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const formList = Array.from(document.querySelectorAll(configObj.formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(configObj, formElement);
  formValidator.enableValidation();
  formValidator.disableButton();
});

const profileFormValidator = new FormValidator(configObj, formProfile);
