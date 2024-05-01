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

  const likeButton = cardElement.querySelector(".elements__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".elements__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const pictureModal = document.querySelector("#modal__picture");
  const modalImage = document.querySelector(".modal__picture_large");
  const modalImageTitle = document.querySelector(".modal__picture_title");
  const pictureCloseButton = document.querySelector("#modal__picture_close");

  cardImage.addEventListener("click", () => {
    modalImage.src = cardImage.src;
    modalImageTitle.textContent = cardTitle.textContent;
    pictureModal.classList.add("modal_opened");
  });

  pictureCloseButton.addEventListener("click", () => {
    pictureModal.classList.remove("modal_opened");
  });

  return cardElement;
}

const cardContainer = document.querySelector(".elements__container");

initialCards.forEach((card) => {
  cardContainer.append(getCardElement(card));
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

function clickEditButton() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  editModal.classList.add("modal_opened");
}

function clickAddButton() {
  addModal.classList.add("modal_opened");
}

editButton.addEventListener("click", clickEditButton);
addButton.addEventListener("click", clickAddButton);

const editCloseButton = document.querySelector("#modal__edit_close");
const addCloseButton = document.querySelector("#modal__add_close");

function closeModal() {
  editModal.classList.remove("modal_opened");
  addModal.classList.remove("modal_opened");
}

editCloseButton.addEventListener("click", closeModal);
addCloseButton.addEventListener("click", closeModal);

const formElement = document.forms["profile-form"];

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal();
}

formElement.addEventListener("submit", saveForm);

const newCard = document.forms["new-card"];

function createNewCard(evt) {
  evt.preventDefault();
  const cardContent = {};
  cardContent.name = inputTitle.value;
  cardContent.link = inputLink.value;
  cardContainer.prepend(getCardElement(cardContent));
  closeModal();
}

newCard.addEventListener("submit", createNewCard);
