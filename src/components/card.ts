import { deleteLike, addLike, deleteCard } from "./api"
import { openImgPopup } from "./modal"
import { CardData, CardElement } from "./types"

//создаем карточку

export function createCard(data: CardData, userId: string): CardElement {
  const cardTemplate: HTMLTemplateElement | null = document.querySelector(".add-card-template")
  if (!cardTemplate) {
    throw new Error("Шаблон карточки не найден")
  }

  const cardElement: CardElement = cardTemplate.content
    .querySelector(".element")!
    .cloneNode(true) as CardElement
  const likeButton: HTMLButtonElement = cardElement.querySelector(".element__like-button")!
  const likeCount: HTMLElement = cardElement.querySelector(".element__like-count")!
  const trashButton: HTMLButtonElement = cardElement.querySelector(".element__trash-btn")!
  const cardImg: HTMLImageElement = cardElement.querySelector(".element__img")!
  const cardTitle: HTMLElement = cardElement.querySelector(".element__title")!

  cardTitle.textContent = data.name
  cardImg.src = data.link
  cardImg.alt = data.name

  // добавляем открытие попапа с изображением
  cardImg.addEventListener("click", () => openImgPopup(data.name, data.link))

  // добавляем лайки в карточку
  likeCount.textContent = data.likes.length.toString()
  data.likes.length <= 0
    ? likeCount.classList.add("element__like-count_disabled")
    : likeCount.classList.remove("element__like-count_disabled")

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("element__like-button_active")) {
      deleteLike(data._id)
        .then((res) => {
          likeCount.textContent = res.likes.length.toString()
          likeButton.classList.remove("element__like-button_active")
          res.likes.length <= 0
            ? likeCount.classList.add("element__like-count_disabled")
            : likeCount.classList.remove("element__like-count_disabled")
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      addLike(data._id)
        .then((res) => {
          likeCount.textContent = res.likes.length.toString()
          likeButton.classList.add("element__like-button_active")
          res.likes.length <= 0
            ? likeCount.classList.add("element__like-count_disabled")
            : likeCount.classList.remove("element__like-count_disabled")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  // ищем наши лайки
  data.likes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add("element__like-button_active")
    }
  })

  // убираем кнопку удаления для дефолтных карточек
  if (data.owner._id !== userId) {
    trashButton.classList.add("element__trash-btn-hidden")
  } else {
    trashButton.addEventListener("click", () => {
      deleteCard(data._id)
        .then(() => {
          const parent = trashButton.closest(".element")
          if (parent) {
            parent.remove()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  return cardElement
}
