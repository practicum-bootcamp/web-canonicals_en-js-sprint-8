import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  defaultFormConfig,
  popupConfig,
  profileConfig,
  cardsConfig,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  userNameSelector: profileConfig.profileNameSelector,
  userDescriptionSelector: profileConfig.profileDescriptionSelector,
});

const createNewCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        imagePopup.open(data);
      },
    },
    cardsConfig.cardTemplateSelector
  );
  return card.getView();
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createNewCard(data));
    },
  },
  cardsConfig.containerSelector
);

const imagePopup = new PopupWithImage({
  popupSelector: popupConfig.imagePopupSelector,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: popupConfig.editFormPopupSelector,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const newCardPopup = new PopupWithForm({
  popupSelector: popupConfig.cardFormPopupSelector,
  handleFormSubmit: (data) => {
    cardList.addItem(createNewCard(data));
  },
});

const editFormValidator = new FormValidator(
  defaultFormConfig,
  popupConfig.editFormPopupSelector
);
const cardFormValidator = new FormValidator(
  defaultFormConfig,
  popupConfig.cardFormPopupSelector
);

imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

cardList.renderItems(initialCards);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// In this project, this code is not included in any of the classes yet and remains inside `index.js`
// Buttons and other DOM nodes
const openEditFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");
const titleInputElement = document.querySelector(".popup__input_type_name");
const descriptionInputElement = document.querySelector(
  ".popup__input_type_description"
);

// Event listeners for the page
openEditFormButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  titleInputElement.value = currentUserInfo.userName;
  descriptionInputElement.value = currentUserInfo.userDescription;

  editFormValidator.resetValidation(); // Not required
  userInfoPopup.open();
});

openCardFormButton.addEventListener("click", () => {
  // Resetting the form is optional. If they do, then it is necessary to make submit button inactive and remove the input error messages.
  // Important: it is one of the possible solutions. Students can implement it in different ways but it is important to not duplicate the code.
  // It is acceptable to just call disableSubmitButton and not reset the input contents / errors.
  // This is given as an example of how to reset everything correctly it if they do choose to.
  cardFormValidator.resetValidation();

  newCardPopup.open();
});

// Summary:
// 1. In this canonical project, kebab-case is used for file names. Most likely, students
// will be naming their files in CamelCase. It's fine at this stage.
// 2. Students may have some code remaining in `index.js` like in the example above,
// i.e. when parts of an interface are not part of any class. For now, it's OK for
// the profile and card submission buttons.
// 3. All other parts should be included inside classes and collected into dictionaries
// with constants. `index.js` = class instantiation.
// 4. The `Popup` class may have an additional public method for setting up listeners.
// There may be an additional method for working with the user profile (inserting data
// when opening the modal window).
