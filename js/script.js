let editButton = document.querySelector('.title__name-edit')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-button')
let titleName = document.querySelector('.title__name')
let titleDescription = document.querySelector('.title__description')
let popupName = popup.querySelector('.popup__input_type_name')
let popupDescription = popup.querySelector('.popup__input_type_description')
let submitButton = popup.querySelector('.popup__submit-button')

popupName.setAttribute('value', titleName.textContent)
popupDescription.setAttribute('value', titleDescription.textContent)

function popupOpen() {
  popup.classList.add('popup_opened')
}

function popupClose() {
  popup.classList.remove('popup_opened')
}

editButton.addEventListener('click', popupOpen)
closeButton.addEventListener('click', popupClose)

function formSubmitHandler (evt) {
    evt.preventDefault();
    titleName.textContent = popupName.value
    titleDescription.textContent = popupDescription.value
    popupClose()
}

submitButton.addEventListener('click', formSubmitHandler);