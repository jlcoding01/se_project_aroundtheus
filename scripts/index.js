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

const cardTemplete = document.querySelector("#card-templete").content;

function getCardElement(data) {
  const cardElement = cardTemplete
    .querySelector(".elements__cards")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".elements__title").textContent = data.name;
  return cardElement;
}

const cardContainer = document.querySelector(".elements__container");

for (let i = 0; i < initialCards.length; i++) {
  const cardElements = getCardElement(initialCards[i]);
  cardContainer.append(cardElements);
}

const editButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const inputName = document.querySelector(".modal__input_name");
const inputJob = document.querySelector(".modal__input_job");

function clickEditButton() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  modal.classList.add("modal_opened");
}

editButton.addEventListener("click", clickEditButton);

const closeButton = document.querySelector(".modal__close");

function closeModal() {
  modal.classList.remove("modal_opened");
}

closeButton.addEventListener("click", closeModal);

const formElement = document.forms["profile-form"];

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal();
}

formElement.addEventListener("submit", saveForm);
