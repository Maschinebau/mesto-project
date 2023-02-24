const content = document.querySelector('.content');
const nameButton = content.querySelector('.profile__name-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {

  popup.classList.remove('popup_opened');
}

nameButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

console.log('пук');