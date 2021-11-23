// Cards data
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Cards mapping
const createCard = (c) => {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardElement = cardsTemplate.querySelector(".place").cloneNode(true);
  const like = cardElement.querySelector(".place__like");
  const image = cardElement.querySelector(".place__image");
  const trash = cardElement.querySelector(".place__trash");

  image.src = c.link;
  image.alt = c.name;
  cardElement.querySelector(".place__name").textContent = c.name;

  like.addEventListener("click", (evt) =>
    evt.target.classList.toggle("place__like_active")
  );

  trash.addEventListener("click", (evt) =>
    evt.target.closest(".place").remove()
  );

  image.addEventListener("click", () => {
    openPopup(cardElement.id + "_popup");
  });

  return cardElement;
};

const cardsRender = () => {
  const grid = document.querySelector(".places__grid");
  grid.replaceChildren();

  initialCards.reverse().map((c) => {
    const card = createCard(c);
    card.id = "card" + initialCards.indexOf(c);
    createImgPopup({
      name: c.name,
      link: c.link,
      id: card.id,
    });
    grid.prepend(card);
  });
};

cardsRender();

// Search for current values of fields and buttons
const currentName = document.querySelector(".title__name");
const currentDescription = document.querySelector(".title__description");
const profileEditButton = document.querySelector(".title__name-edit");
const addCardButton = document.querySelector(".title__button");

// Popups mapping
const popups = [
  {
    name: "edit_profile",
    title: "Редактировать профиль",
    input1Value: currentName.textContent,
    input2Value: currentDescription.textContent,
    input1Placeholder: "",
    input2Placeholder: "",
  },
  {
    name: "add_place",
    title: "Добавить место",
    input1Value: "",
    input2Value: "",
    input1Placeholder: "Название",
    input2Placeholder: "Ссылка на картинку",
  },
];

const createPopup = (p) => {
  const popupTemplate = document.querySelector("#popup-template").content;
  const popupElement = popupTemplate.querySelector(".popup").cloneNode(true);
  popupElement.querySelector(".popup__title").textContent = p.title;
  popupElement.querySelector(".popup__form").name = p.name;
  popupElement.querySelector(".popup__first-input").value = p.input1Value;
  popupElement.querySelector(".popup__first-input").placeholder =
    p.input1Placeholder;
  popupElement.querySelector(".popup__second-input").value = p.input2Value;
  popupElement.querySelector(".popup__second-input").placeholder =
    p.input2Placeholder;
  popupElement.id = p.name;

  const closeButton = popupElement.querySelector(".popup__close-button");
  closeButton.addEventListener("click", closePopup);

  const form = popupElement.querySelector(".popup__form");
  form.addEventListener("submit", submitHandler);

  document.querySelector(".popups").append(popupElement);
};

function createImgPopup(card) {
  const popupTemplate = document.querySelector("#image-popup-template").content;
  const popupElement = popupTemplate.querySelector(".popup").cloneNode(true);
  const closeButton = popupElement.querySelector(".popup__close-button");
  const img = popupElement.querySelector(".popup__image");

  img.src = card.link;
  img.alt = card.name;
  popupElement.id = card.id + "_popup";
  popupElement.querySelector(".popup__image-caption").textContent = card.name;

  closeButton.addEventListener("click", closePopup);

  document.querySelector(".popups").append(popupElement);
}

popups.map((p) => createPopup(p));

function openPopup(popupName) {
  const popup = document.querySelector("#" + popupName);
  popup.classList.add("popup_opened");
}

function closePopup(evt) {
  const popup = evt.target.closest(".popup");
  popup.classList.remove("popup_opened");
}

const editProfile = (evt) => {
  const firstInput = evt.target.querySelector(".popup__first-input");
  const secondInput = evt.target.querySelector(".popup__second-input");
  currentName.textContent = firstInput.value;
  currentDescription.textContent = secondInput.value;
  closePopup(evt);
};

const addPlace = (evt) => {
  const firstInput = evt.target.querySelector(".popup__first-input");
  const secondInput = evt.target.querySelector(".popup__second-input");

  const card = {
    name: firstInput.value,
    link: secondInput.value,
  };
  initialCards.unshift(card);
  cardsRender();

  firstInput.value = "";
  secondInput.value = "";

  closePopup(evt);
};

function submitHandler(evt) {
  evt.preventDefault();
  if (evt.target.name === "edit_profile") {
    editProfile(evt);
  }
  if (evt.target.name === "add_place") {
    addPlace(evt);
  }
}

profileEditButton.addEventListener("click", () => openPopup("edit_profile"));
addCardButton.addEventListener("click", () => openPopup("add_place"));
