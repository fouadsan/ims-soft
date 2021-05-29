const alertBox = document.getElementById('alert-box')
const spinnerBox = document.getElementById('spinner-box')
const saveProfilebox = document.getElementById('saveCompany-box')
const profileForm = document.getElementById('company-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const nameInput = document.getElementById('inputName')
const emailInput = document.getElementById('inputEmail')
const phoneInput = document.getElementById('inputPhone')
const addressInput = document.getElementById('inputAddress')
const webInput = document.getElementById('inputWebUrl')


profileForm.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('csrfmiddlewaretoken', csrf[0].value)
    formData.append('name', nameInput.value)
    formData.append('email', emailInput.value)
    formData.append('phone', phoneInput.value)
    formData.append('address', addressInput.value)
    formData.append('web_url', webInput.value)

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
                nameInput.value = response.name
                emailInput.value = response.email
                phoneInput.value = response.phone
                addressInput.value = response.address
                webInput.value = response.web_url
                spinnerBox.classList.add('not-visible')
                saveProfilebox.classList.remove('not-visible')
                handleAlerts('success', 'your company informations has been updated!')
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

