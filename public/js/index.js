﻿/* Переменные */

function resetErr() {
  const { person, info } = formEdit.elements;
  const errorName = document.querySelector("#error-name");
  const errorAbout = document.querySelector("#error-about");
  const buttonEdit = document.querySelector(".popup__button_type_new");
  errorName.textContent = "";
  errorAbout.textContent = "";
  person.value = name.textContent;
  info.value = about.textContent;
  buttonEdit.classList.remove("popup__button_disabled");
  buttonEdit.removeAttribute("disabled");
}

function createCard(event) {
  const formCard = document.forms.new;
  const button = document.querySelector(".popup__button");
  const { title, link } = formCard.elements;
  event.preventDefault();
  cardList.addCard(title.value, link.value);
  formCard.reset();
  popupNew.classList.remove("popup_is-opened");
  button.classList.add("popup__button_disabled");
  button.setAttribute("disabled", true);
}

// Можно лучше: Неиспользуемая переменные card.
const card = () => new Card();
const newCard = (name, link) => {
  const card = new Card();
  return card.create(name, link);
};

const popupEdit = document.querySelector(".popup-edit");
const editPopup = new Popup(popupEdit);

const popupNew = document.querySelector(".popup-newCard");
const addCardPopup = new Popup(popupNew);

const popupImage = document.querySelector("#popup-picture");
const picture = document.querySelector(".popup__content_image");
const popupPicture = document.querySelector(".popup-picture");
const picturePopup = new PopupPicture(popupPicture, popupImage, picture);

const formEdit = document.forms.edit;
const userValid = new FormValidator(formEdit);

const formCard = document.forms.new;
const cardValid= new FormValidator(formCard);

/* Слушатели */

cardValid.setEventListeners();
userValid.setEventListeners();
formCard.addEventListener("submit", createCard);


const userInfoButton = document.querySelector(".user-info__button");
userInfoButton.addEventListener("click", addCardPopup.open);


const userInfoEdit = document.querySelector(".user-info__edit");
userInfoEdit.addEventListener("click", editPopup.open);
userInfoEdit.addEventListener("click", resetErr);

const placesList = document.querySelector(".places-list");
placesList.addEventListener("click", picturePopup.open);

// Токен: ad968f0f-a2aa-4806-b662-e265b9c0a30a
// Идентификатор группы: cohort10

const avatar = document.querySelector('.user-info__photo');
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort10',
  headers: {
    authorization: 'ad968f0f-a2aa-4806-b662-e265b9c0a30a',
    'Content-Type': 'application/json'
  }
});

// Можно лучше: Неиспользуемая переменные formInfo.
const formInfo = document.forms.edit;
const cardList = new CardList(placesList, initialCards, newCard, api);

const name = document.querySelector(".user-info__name");
const about = document.querySelector(".user-info__job");
// Можно лучше: Считается плохой практикой использовать элементы через глобальные переменные (person и info в данном случае).
// Для каждого dom-элемента, у которого есть id, браузер автоматически создаёт переменную в глобальной области.
// https://html.spec.whatwg.org/#named-access-on-the-window-object
const userInfo = new UserInfo(name, about, person, info, api, avatar, popupEdit);


// formInfo.addEventListener('submit', newInfo);

function editProfile(event) {
  event.preventDefault();
  userInfo.sendForm();
}

userInfo.setUserInfo();
cardList.updateRender();
formEdit.addEventListener("submit", editProfile);
// 95.216.175.5

// fetch('https://praktikum.tk/cohort10/users/me', {
//   headers: {
//     authorization: 'ad968f0f-a2aa-4806-b662-e265b9c0a30a'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// Резюме по работе:
// Спасибо за работу. Код получился хорошим, класс Api вне всяких похвал.
//
// Что можно улучшить:
// - отформатировать единообразно код;
// - убрать неиспользуемые переменные;
// - в классах не использовать глобальные переменные.
//
// Удачи в дальнейшем обучении!
