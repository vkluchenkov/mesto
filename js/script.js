// Search for edit name button
let editButton = document.querySelector('.title__name-edit')

// Search for current values of Name and Description
let titleName = document.querySelector('.title__name')
let titleDescription = document.querySelector('.title__description')

// Search for popup element and form
let popup = document.querySelector('.popup')
let form = popup.querySelector('[name="profile-edit"]')

// Search for form close button
let closeButton = popup.querySelector('.popup__close-button')

// Search for form inputs for Name and Descripiton
let popupName = popup.querySelector('.popup__input_type_name')
let popupDescription = popup.querySelector('.popup__input_type_description')


function openPopup() {
  popupName.value = titleName.textContent
  popupDescription.value = titleDescription.textContent

  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  titleName.textContent = popupName.value
  titleDescription.textContent = popupDescription.value
  closePopup()
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
form.addEventListener('submit', formSubmitHandler);