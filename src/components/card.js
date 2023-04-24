import {addCard} from './utils.js'

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

//создаем дефолтные карточки

initialCards.forEach( ({name, link}) => {
  addCard(name, link);
});