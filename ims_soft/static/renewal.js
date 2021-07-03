const alertBox = document.getElementById('alert-box')
const spinnerBox = document.getElementById('spinner-box')
const saveCompanybox = document.getElementById('saveCompany-box')
const companyForm = document.getElementById('company-form')

const nameInput = document.getElementById('inputName')
const product_keyInput = document.getElementById('inputProduct_key')
const emailInput = document.getElementById('inputEmail')
const phoneInput = document.getElementById('inputPhone')
const addressInput = document.getElementById('inputAddress')
const webInput = document.getElementById('inputWebUrl')

$('#renewalModal').modal({backdrop: 'static', keyboard: false})
$('input.color-class').maxlength({
    alwaysShow: true,
    threshold: 10,
    warningClass: "label label-success",
    limitReachedClass: "label label-danger"
});
console.log('salam')
companyForm.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('csrfmiddlewaretoken', csrf[0].value)
    formData.append('name', nameInput.value)
    formData.append('product_key', product_keyInput.value)
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
            saveCompanybox.classList.add('not-visible')
            spinnerBox.classList.remove('not-visible')
            setTimeout(() => { 
                $('#renewalModal').modal('hide');
                handleAlerts('center', 'Update', 'your company informations has been updated!', 'success', false, 1500)
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