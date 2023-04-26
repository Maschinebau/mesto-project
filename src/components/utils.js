//создаем карточку

export function createCard(name, link) {
  const cardTemplate = document.querySelector('.add-card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imgPopup = document.querySelector('.popup_type_image');
  const fullsizeImage = imgPopup.querySelector('.popup__fullsize-image');
  
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__img').src = link;
  cardElement.querySelector('.element__img').alt = name;

  const imgFigcaption = imgPopup.querySelector('.popup__figcaption');
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

// Функция добавления карточки

export function addCard(name, link) {
  const cardsContainer = document.querySelector('.elements__list');
  const card = createCard(name, link);
  cardsContainer.prepend(card);
}

// функции закрытия и открытия попапов

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

export const openPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

export const closePopup = popup => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
} 


