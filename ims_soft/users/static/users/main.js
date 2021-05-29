const alertBox = document.getElementById('alert-box')
const spinnerBox = document.getElementById('spinner-box')
const saveProfilebox = document.getElementById('saveProfile-box')
const profileForm = document.getElementById('profile-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const fnameInput = document.getElementById('inputFname')
const lnameInput = document.getElementById('inputLname')
const emailInput = document.getElementById('inputEmail4')
const phoneInput = document.getElementById('inputPhone')
const addressInput = document.getElementById('inputAddress')
const cityInput = document.getElementById('inputCity')


profileForm.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('csrfmiddlewaretoken', csrf[0].value)
    formData.append('first_name', fnameInput.value)
    formData.append('last_name', lnameInput.value)
    formData.append('email', emailInput.value)
    formData.append('phone', phoneInput.value)
    formData.append('address', addressInput.value)
    formData.append('city', cityInput.value)

    $.ajax({
        type: 'POST',
        url: '',
        enctype: 'multipart/form-data',
        data: formData,
        success: function (response) {
            saveProfilebox.classList.add('not-visible')
            spinnerBox.classList.remove('not-visible')
            console.log(response)
            setTimeout(() => {
                fnameInput.value = response.first_name
                lnameInput.value = response.last_name
                emailInput.value = response.email
                phoneInput.value = response.phone
                addressInput.value = response.address
                cityInput.value = response.city
                spinnerBox.classList.add('not-visible')
                saveProfilebox.classList.remove('not-visible')
                handleAlerts('success', 'your profile has been updated!')
            }, 500);
        },
        error: function (error) {
            handleAlerts('danger', 'Oops...Something went wrong!')
        },
        processData: false,
        contentType: false,
        cache: false,
    })
})

