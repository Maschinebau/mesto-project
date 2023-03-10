const content = document.querySelector('.content');

//PROFILE POPUP

const nameButton = content.querySelector('.profile__name-button');
const profilePopup = document.querySelector('.popup__profile');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileSubmitButton = profilePopup.querySelector('.popup__form-submit');

function profileClose() {
  profilePopup.classList.remove('popup_opened');
}

nameButton.addEventListener('click', () => {
  profilePopup.classList.add('popup_opened');
});

profileCloseButton.addEventListener('click', profileClose);
profilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  content.querySelector('.profile__title').textContent = profilePopup.querySelector('input[name = "name"]').value;
  content.querySelector('.profile__signature').textContent = profilePopup.querySelector('input[name = "profession"]').value;
  profileClose();
});

//LIKE ACTION

function addLike() {
  content.querySelectorAll('.element__like-button').forEach(item =>
  item.addEventListener('click', () => item.classList.toggle('element__like-button_active')));
}
addLike();

//DELETE CARD

function deleteCard() {
  content.querySelectorAll('.element__trash-btn').forEach(item =>
  item.addEventListener('click', () => item.parentElement.remove()));
  }
deleteCard();

//ADD CARD POPUP

const addCardButton = content.querySelector('.profile__img-button');
const cardPopup = document.querySelector('.popup__card');
const cardCloseButton = cardPopup.querySelector('.popup__close-button');

function addCardClose() {
  cardPopup.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', () => {
  cardPopup.classList.add('popup_opened');
});

cardCloseButton.addEventListener('click', addCardClose);

cardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard();
  addLike();
  openImg();
  deleteCard();
  addCardClose();
  cardTitleInput.value = '';
  cardLinkInput.value = '';
});

//ADDING CARDS

const cardLinkInput = cardPopup.querySelector('input[name="link"]');
const cardTitleInput = cardPopup.querySelector('input[name = "card-title"]');
const cardsContainer = content.querySelector('.elements__list');

function addCard() {
  const cardTemplate = document.querySelector('.add-card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = cardTitleInput.value;
  cardElement.querySelector('.element__img').src = cardLinkInput.value;
  cardsContainer.prepend(cardElement);
}

//IMAGE POPUP

function openImg() {
const cardImage = content.querySelectorAll('.element__img');
const imgPopup = document.querySelector('.popup_pos_image');
const imgPopupClose = imgPopup.querySelector('.popup__close-button');
  
imgPopupClose.addEventListener('click', () => {
    imgPopup.classList.remove('popup_opened');
  });

cardImage.forEach(element => {
  element.addEventListener('click', () => {
    imgPopup.classList.add('popup_opened');
    imgPopup.querySelector('.popup__fullsize-image').src = element.src;
    imgPopup.querySelector('.popup__figcaption').textContent = element.nextElementSibling.textContent;
  });
});
}
openImg();

console.log();