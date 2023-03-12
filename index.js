const content = document.querySelector('.content');

//PROFILE POPUP

const nameButton = content.querySelector('.profile__name-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileSubmitButton = profilePopup.querySelector('.popup__form-submit');

const openClosePopup = (item) => item.classList.toggle('popup_opened'); //открывашка и закрывашка для попапов

nameButton.addEventListener('click', () => openClosePopup(profilePopup));
profileCloseButton.addEventListener('click', () => openClosePopup(profilePopup));
profilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  content.querySelector('.profile__title').textContent = profilePopup.querySelector('input[name = "name"]').value;
  content.querySelector('.profile__signature').textContent = profilePopup.querySelector('input[name = "profession"]').value;
  profileClose();
});

//ADD CARD POPUP

const addCardButton = content.querySelector('.profile__img-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardCloseButton = cardPopup.querySelector('.popup__close-button');

addCardButton.addEventListener('click', () => openClosePopup(cardPopup));
cardCloseButton.addEventListener('click', () => openClosePopup(cardPopup));

//ADDING CARDS

const cardLinkInput = cardPopup.querySelector('input[name="link"]');
const cardTitleInput = cardPopup.querySelector('input[name = "card-title"]');
const cardsContainer = content.querySelector('.elements__list');

const initialCards = [
{
  name: 'Алтай',
  link: './images/altai-full.jpg'
},
{
  name: 'Калмыкия',
  link: './images/kal-mykia.jpg'
},
{
  name: 'Камчатка',
  link: './images/cum-chatka.jpg'
},
{
  name: 'Карелия',
  link: './images/kareliya.jpg'
},
{
  name: 'Байкал',
  link: './images/buy-kal.jpg'
},
{
  name: 'Карачаево-Черкессия',
  link: './images/cherkes.jpg'
},
];

//цикл для дефолтных карточек

for (let i = 0; i < initialCards.length; i++) {
    const cardTemplate = document.querySelector('.add-card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = initialCards[i].name;
    cardElement.querySelector('.element__img').src = initialCards[i].link;
    cardsContainer.prepend(cardElement);
}

//функция вызова карточки

function addCard() {
  const cardTemplate = document.querySelector('.add-card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = cardTitleInput.value;
  cardElement.querySelector('.element__img').src = cardLinkInput.value;
  cardsContainer.prepend(cardElement);
}

cardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard();
  openClosePopup(cardPopup);
  cardTitleInput.value = '';
  cardLinkInput.value = '';
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

//IMAGE POPUP

const imgPopup = document.querySelector('.popup_type_image');
const imgPopupClose = imgPopup.querySelector('.popup__close-button');
const cardImage = content.querySelectorAll('.element__img');

imgPopupClose.addEventListener('click', () => openClosePopup(imgPopup));

function openImg() {
cardImage.forEach(element => {
    element.addEventListener('click', () => {
    openClosePopup(imgPopup);
    imgPopup.querySelector('.popup__fullsize-image').src = element.src;
    imgPopup.querySelector('.popup__figcaption').textContent = element.nextElementSibling.textContent;
  });
});
}
openImg();

//добавляю наблюдателя

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      addLike(mutation.addedNodes[0]);
      openImg(mutation.addedNodes[0]);
      deleteCard(mutation.addedNodes[0]);
    }
  });
});

observer.observe(cardsContainer, { childList: true });