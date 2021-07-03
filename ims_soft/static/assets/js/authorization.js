const companyModal = document.getElementById('exampleModalCenter')
const alertBox = document.getElementById('alert-box')
const spinnerBox = document.getElementById('spinner-box')
const saveCompanybox = document.getElementById('saveCompany-box')
const companyForm = document.getElementById('company-form')

const nameInput = document.getElementById('id_name')
const product_keyInput = document.getElementById('id_product_key')
const emailInput = document.getElementById('id_email')
const phoneInput = document.getElementById('id_phone')
const addressInput = document.getElementById('id_address')
const webInput = document.getElementById('id_web_url')

$('#authorizationModal').modal({backdrop: 'static', keyboard: false})
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
                $('#authorizationModal').modal('hide');
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

