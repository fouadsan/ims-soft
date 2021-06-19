const alertBox = document.getElementById('alert-box')
const spinnerBox = document.getElementById('spinner-box')
const saveProfilebox = document.getElementById('saveProfile-box')
const profileForm = document.getElementById('profile-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const fnameInput = document.getElementById('inputFname')
const lnameInput = document.getElementById('inputLname')
const emailInput = document.getElementById('inputEmail')
const phoneInput = document.getElementById('inputPhone')
const addressInput = document.getElementById('inputAddress')
const cityInput = document.getElementById('inputCity')
const imageInput = $('#id_image')

function upload_img(img) {
    if (img.files && img.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img_id').attr('src', e.target.result);
        }

        reader.readAsDataURL(img.files[0]);
    }
}


profileForm.addEventListener('submit', e => {
    e.preventDefault()

    var formData = new FormData()
    formData.append('csrfmiddlewaretoken', csrf[0].value)
    formData.append('first_name', fnameInput.value)
    formData.append('last_name', lnameInput.value)
    formData.append('email', emailInput.value)
    formData.append('phone', phoneInput.value)
    formData.append('address', addressInput.value)
    formData.append('city', cityInput.value)
    formData.append("image", imageInput[0].files[0]);

    $.ajax({
        type: 'POST',
        url: '',
        enctype: 'multipart/form-data',
        data: formData,
        dataType: 'json',
        beforeSend: function () {
            saveProfilebox.classList.add('not-visible')
            spinnerBox.classList.remove('not-visible')
        },
        success: function (response) {
            setTimeout(() => {
                fnameInput.value = response.first_name
                lnameInput.value = response.last_name
                emailInput.value = response.email
                phoneInput.value = response.phone
                addressInput.value = response.address
                cityInput.value = response.city
                // imageInput.value = response.image
                spinnerBox.classList.add('not-visible')
                saveProfilebox.classList.remove('not-visible')
                handleAlerts('center', 'Update', 'Your profile has been updated', 'success', false, 1500)
            }, 500);
        },
        error: function (error) {
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)

        },
        processData: false,
        contentType: false,
        cache: false,
    })
})

