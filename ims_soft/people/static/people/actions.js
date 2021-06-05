// const backBtn = document.getElementById('back-btn')

const url = "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')

// const spinnerBox = document.getElementById('spinner-box')

const nameInput = document.getElementById('id_updateName')
const emailInput = document.getElementById('id_updateEmail')
const phoneInput = document.getElementById('id_updatePhone')
const faxInput = document.getElementById('id_updateFax')
const addressInput = document.getElementById('id_updateAddress')
const salaryInput = document.getElementById('id_updateSalary')
const downPayInput = document.getElementById('id_updateDownPay')

var globalVariableUp;
var globalVariableDel;
// backBtn.addEventListener('click', ()=>{
//     history.back()
// })


$(document).on('click', '#update-btn', function () {
    var upId = $(this).attr('data-item');
    globalVariableUp = upId
    $.ajax({
        type: 'GET',
        url: url + upId,
        success: salaryInput ? function (response) {
            console.log(salaryInput)

            const data = response.data
            nameInput.value = data.name
            phoneInput.value = data.phone
            addressInput.value = data.address
            salaryInput.value = data.salary
            downPayInput.value = data.down_payments

        } : function (response) {
            console.log(response.data)

            const data = response.data
            nameInput.value = data.name
            emailInput.value = data.email
            phoneInput.value = data.phone
            faxInput.value = data.fax
            addressInput.value = data.address

        },
        error: function (error) {
            console.log(error)
        }
    })

})

updateForm.addEventListener('submit', e => {
    e.preventDefault()

    var localUpId = globalVariableUp

    const id = document.getElementById('id-' + localUpId)
    console.log(id.textContent)
    const name = document.getElementById('name-' + localUpId)
    const email = document.getElementById('email-' + localUpId)
    const phone = document.getElementById('phone-' + localUpId)
    const fax = document.getElementById('fax-' + localUpId)
    const address = document.getElementById('address-' + localUpId)
    const salary = document.getElementById('salary-' + localUpId)
    const down_payments = document.getElementById('down_payments-' + localUpId)

    $.ajax({
        type: 'POST',
        url: updateUrl + id.textContent,
        data: salaryInput ? {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': nameInput.value,
            'phone': phoneInput.value,
            'salary': salaryInput.value,
            'address': addressInput.value,
            'down_payments': downPayInput.value
        } : {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': nameInput.value,
            'email': emailInput.value,
            'phone': phoneInput.value,
            'fax': faxInput.value,
            'address': addressInput.value
        },
        success: function (response) {
            $('#updateModal').modal('hide')
            handleAlerts('success', 'Object has been updated')

            name.textContent = response.name
            if (response.hasOwnProperty('email')) {
                response.email != "" ? email.textContent = response.email : email.textContent = "N/A"
                response.fax != "" ? fax.textContent = response.fax : fax.textContent = "N/A"
            } else if (response.hasOwnProperty('salary')) {
                response.salary != "" ? salary.textContent = response.salary : salary.textContent = "N/A"
                response.down_payments != "" ? down_payments.textContent = response.down_payments : down_payments.textContent = "N/A"
            }
            response.phone != "" ? phone.textContent = response.phone : phone.textContent = "N/A"
            response.address != "" ? address.textContent = response.address : address.textContent = "N/A"

        },
        error: function (error) {
            console.log(error)
        }
    })

})

$(document).on('click', '#delete-btn', function () {
    var delId = $(this).attr('data-item');
    const delName = $(this).attr('data-item-name');
    globalVariableDel = delId

    var delMsg = document.getElementById("delMsg");
    delMsg.insertAdjacentHTML('afterend', `<b>${delName}</b>`);

})

deleteForm.addEventListener('submit', e => {
    e.preventDefault()

    var localDelId = globalVariableDel

    const id = document.getElementById('id-' + localDelId)


    $.ajax({
        type: 'POST',
        url: deleteUrl + id.textContent,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
        },
        success: function (response) {
            id.parentNode.remove()
            searchInput.value = ""
            $('#deleteModal').modal('hide')
            handleAlerts('success', response.msg)
            localStorage.setItem('name', nameInput.value)
            getData()
        },
        error: function (error) {
            console.log(error)
        }
    })
})