let initialCards = [
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

function getCardElement(data) {
  let cardContainer = document.querySelector(".elements__container");
  const cardTemplete = document.querySelector("#card-templete").content;

  for (let i = 0; i < data.length; i++) {
    const cardElement = cardTemplete
      .querySelector(".elements__cards")
      .cloneNode(true);
    cardElement.querySelector(".elements__image").src = data[i].link;
    cardElement.querySelector(".elements__image").alt = data[i].name;
    cardElement.querySelector(".elements__title").textContent = data[i].name;
    cardContainer.append(cardElement);
  }
  return cardContainer;
}

getCardElement(initialCards);

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

const formElement = document.querySelector(".modal__form");

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  modal.classList.remove("modal_opened");
}

formElement.addEventListener("submit", saveForm);
