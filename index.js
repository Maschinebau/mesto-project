const content = document.querySelector('.content');

//PROFILE POPUP

const nameButton = content.querySelector('.profile__name-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profileSubmitButton = profilePopup.querySelector('.popup__form-submit');
const profileName = content.querySelector('.profile__title');
const profileSignature = content.querySelector('.profile__signature');
const popup = document.querySelectorAll('.popup');

//Находим инпуты профиля

const profileNameInput = profilePopup.querySelector('input[name = "name"]');
const profileSignatureInput = profilePopup.querySelector('input[name = "profession"]');

//закрываем и открываем модальные окна

const closePopup = (popup) => popup.classList.remove('popup_opened'); 
const openPopup = (popup) => popup.classList.add('popup_opened'); 

//находим все закрывающие кнопки

const closeButtons = document.querySelectorAll('.popup__close-button'); //закрывашка для всех попапов

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// добавляем слушателей для кнопок профиля

nameButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileSignatureInput.value = profileSignature.textContent;
  openPopup(profilePopup);
});

profilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileSignature.textContent = profileSignatureInput.value;
  closePopup(profilePopup);
});


//ADD CARD POPUP

const addCardButton = content.querySelector('.profile__img-button');
const cardPopup = document.querySelector('.popup_type_card');
// const likeButton =
// const trashButton =

addCardButton.addEventListener('click', () => openPopup(cardPopup));

//ADDING CARDS

const cardTitleInput = cardPopup.querySelector('input[name = "card-title"]');
const cardLinkInput = cardPopup.querySelector('input[name="link"]');
const cardsContainer = content.querySelector('.elements__list');
const cardTemplate = document.querySelector('.add-card-template').content;
const imgPopup = document.querySelector('.popup_type_image');
const fullsizeImage = imgPopup.querySelector('.popup__fullsize-image');
const imgFigcaption = imgPopup.querySelector('.popup__figcaption');

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

//создаем карточку

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__img').src = link;
  cardElement.querySelector('.element__img').alt = name;

  cardElement.querySelector('.element__img').addEventListener('click', () => {
    fullsizeImage.src = link;
    fullsizeImage.alt = name;
    imgFigcaption.textContent = name;
    openPopup(imgPopup);
  });

  cardElement.querySelector('.element__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-button_active')});
  cardElement.querySelector('.element__trash-btn').addEventListener('click', evt => {
    evt.target.closest('.element').remove()});
    return cardElement;
};

//создаем дефолтные карточки

initialCards.forEach( ({name, link}) => {
  addCard(name, link);
});

// добавляем карточку

function addCard(name, link) {
  const card = createCard(name, link);
  cardsContainer.prepend(card);
}

// добавляем карточки по submit

cardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cardTitleInput.value, cardLinkInput.value);
  closePopup(cardPopup);
  evt.target.reset();
});

console.log()

// const closePopupByClickingOnOverlay = (evt) => {
//   if (evt.target !== e.currentTarget) return;
//   closePopup();
// };

//добавляю наблюдателя

// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.addedNodes.length > 0) {
//       addLike(mutation.addedNodes[0]);
//       openImg(mutation.addedNodes[0]);
//       deleteCard(mutation.addedNodes[0]);
//     }
//   });
// });

// observer.observe(cardsContainer, { childList: true });