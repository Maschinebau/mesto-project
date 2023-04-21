const content = document.querySelector('.content');

//PROFILE POPUP

const nameButton = content.querySelector('.profile__name-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profileSubmitButton = profilePopup.querySelector('.popup__form-submit');
const profileName = content.querySelector('.profile__title');
const profileSignature = content.querySelector('.profile__signature');



//Находим инпуты профиля

const profileNameInput = profilePopup.querySelector('input[name = "name"]');
const profileSignatureInput = profilePopup.querySelector('input[name = "profession"]');

//закрываем и открываем модальные окна

const closePopup = popup => popup.classList.remove('popup_opened'); 
const openPopup = popup => popup.classList.add('popup_opened'); 

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

// добавляем закрытие попапов по escape и клику на оверлей

(function closeOnOverlay () {
  
const popup = document.querySelectorAll('.popup')
Array.from(popup).forEach(popupItem => {
  addEventListener('keydown', evt => {
    if (evt.key === 'Escape') { 
      closePopup(popupItem)
    }
  })
})

  const overlay = document.querySelectorAll('.popup__overlay')
  Array.from(overlay).forEach(item => {
    item.addEventListener('click', () => item.parentNode.classList.remove('popup_opened'))
  })
})()

//ADD CARD POPUP

const addCardButton = content.querySelector('.profile__img-button');
const cardPopup = document.querySelector('.popup_type_card');

addCardButton.addEventListener('click', () => openPopup(cardPopup));

//ADDING CARDS

const cardTitleInput = cardPopup.querySelector('input[name = "card-title"]');
const cardLinkInput = cardPopup.querySelector('input[name="link"]');
const cardsContainer = content.querySelector('.elements__list');
const cardTemplate = document.querySelector('.add-card-template').content;
const imgPopup = document.querySelector('.popup_type_image');
const fullsizeImage = imgPopup.querySelector('.popup__fullsize-image');

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

console.log(document.querySelector('.form'))

// ВАЛИДАЦИЯ ИНПУТОВ

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

hasInvalidInput = (inputList) => {
return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__form-button_type_inactive'); 
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__form-button_type_inactive');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement = formElement.querySelector('.popup__form-submit')
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
    //   fieldsetList.forEach((fieldSet) => {
    //   setEventListeners(fieldSet);
    //     }); 
    setEventListeners(formElement)
  });
};
enableValidation();

