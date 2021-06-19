// const backBtn = document.getElementById('back-btn')

const url = "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"
const deleteSelectedUrl = window.location.href + "delete-selected/"

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')
const deleteSelectedForm = document.getElementById('delete-selected-form')

// const spinnerBox = document.getElementById('spinner-box')

const nameInput = document.getElementById('id_updateName')
const emailInput = document.getElementById('id_updateEmail')
const phoneInput = document.getElementById('id_updatePhone')
const faxInput = document.getElementById('id_updateFax')
const addressInput = document.getElementById('id_updateAddress')
const credit1Input = document.getElementById('id_updateCredit1')
const credit2Input = document.getElementById('id_updateCredit2')

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
    const credit1 = document.getElementById('credit1-' + localUpId)
    const credit2 = document.getElementById('credit2-' + localUpId)

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
            'address': addressInput.value,
            'credit1': credit1Input.value,
            'credit2': credit2Input.value
        },
        success: function (response) {
            $('#updateModal').modal('hide')
            handleAlerts('center', 'Update', 'Object has been updated', 'success', false, 1500)

            name.textContent = response.name
            if (response.hasOwnProperty('email')) {
                response.email != "" ? email.textContent = response.email : email.textContent = "N/A"
                response.fax != "" ? fax.textContent = response.fax : fax.textContent = "N/A"
                response.credit1 != "" ? credit1.textContent = response.credit1 : credit1.textContent = "N/A"
                response.credit2 != "" ? credit2.textContent = response.credit2 : credit2.textContent = "N/A"
            } else if (response.hasOwnProperty('salary')) {
                response.salary != "" ? salary.textContent = response.salary : salary.textContent = "N/A"
                response.down_payments != "" ? down_payments.textContent = response.down_payments : down_payments.textContent = "N/A"
            }
            response.phone != "" ? phone.textContent = response.phone : phone.textContent = "N/A"
            response.address != "" ? address.textContent = response.address : address.textContent = "N/A"

        },
        error: function () {
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
        }
    })

})

$(document).on('click', '#delete-btn', function () {
    var delId = $(this).attr('data-item');
    const delName = $(this).attr('data-item-name');
    globalVariableDel = delId

    var delMsgName = document.getElementById("delMsgName");
    delMsgName.innerHTML = `<b>${delName}</b>`
})

deleteForm.addEventListener('submit', e => {
    e.preventDefault()

    var localDelId = globalVariableDel

    const id = document.getElementById('id-' + localDelId)
    console.log(localDelId)

    $.ajax({
        type: 'POST',
        url: deleteUrl + id.textContent,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
        },
        success: function (response) {
            $('tr#' + localDelId + '').fadeOut('slow');
            searchInput.value = ""
            $('#deleteModal').modal('hide')
            handleAlerts('top-end', 'Deletion', response.msg, 'success', false, 1500)
            localStorage.setItem('name', nameInput.value)
        },
        error: function () {
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
        }
    })
})

$(document).on('click', '#delete-selected-btn', e => {
    e.preventDefault()
    var id_list = [];
    var delSelMsg = document.getElementById("delSelMsg");
    var submitDelSel = document.getElementById("submitDelSel")
    $(':checkbox:checked').each(function (i) {
        id_list[i] = $(this).val()
    })
    if (id_list.length === 0) {
        delSelMsg.textContent = "Please select items to delete !"
        submitDelSel.classList.add('not-visible')
    }
    else {
        delSelMsg.textContent = "Are you sure you want to delete this items ?"
        submitDelSel.classList.remove('not-visible')
    }

})

deleteSelectedForm.addEventListener('submit', e => {
    e.preventDefault()
    var id_list = [];
    $(':checkbox:checked').each(function (i) {
        id_list[i] = $(this).val()
    })
    $.ajax({
        url: deleteSelectedUrl,
        type: 'POST',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            id_list
        },
        success: function (response) {
            $('input[type=checkbox]').prop('checked', false);
            $('#deleteSelectedModal').modal('hide')
            for (var i = 0; i < id_list.length; i++) {
                // $('tr#' + id[i] + '').css('background-color:',)
                $('tr#' + id_list[i] + '').fadeOut('slow');
            }
            handleAlerts('center', 'Deletion', response.msg, 'success', false, 1500)
        },
        error: function () {
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
        }
    })
})
