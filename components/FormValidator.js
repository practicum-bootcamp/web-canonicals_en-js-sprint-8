class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    popupSelector
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._element = document.querySelector(popupSelector);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  // This function is public, because it is called from index.js to switch the state of the button when the modal window is opened
  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState() {
    if (this._getInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _getInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._element.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // This method is not required.
  resetValidation() {
    this._toggleButtonState()
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    })
  }

  enableValidation() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
