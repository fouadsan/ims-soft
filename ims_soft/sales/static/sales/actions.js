// const backBtn = document.getElementById('back-btn')

const url = "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"
const deleteSelectedUrl = window.location.href + "delete-selected/"
const pdfUrl = window.location.href + "pdf_view"

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')
const deleteSelectedForm = document.getElementById('delete-selected-form')

const paymentInput = document.getElementById('id_updatePayment')

var globalVariableUp;
var globalVariableDel;
var globalVariableSelDel;
// backBtn.addEventListener('click', ()=>{
//     history.back()
// })


$(document).on('click', '#update-btn', function () {
    var upId = $(this).attr('data-item');
    globalVariableUp = upId
    $.ajax({
        type: 'GET',
        url: url + upId,
        success: function (response) {
            const data = response.data
            console.log(data)
            paymentInput.value = data.payment
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
    const status = document.getElementById('status_label-' + localUpId)
    const payment = document.getElementById('payment-' + localUpId)

    $.ajax({
        type: 'POST',
        url: updateUrl + id.textContent,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'payment': paymentInput.value,
        },
        success: function (response) {
            $('#updateModal').modal('hide')
            handleAlerts('center', 'Update', 'Object has been updated', 'success', false, 1500)
            console.log(response.payment)
            payment.textContent = response.payment
            status.textContent = response.status
            if (status.textContent == "approved") {
                status.className = "badge badge-success";
            } else if (status.textContent == "pending") {
                status.className = "badge badge-warning";
            } else {
                status.className = "badge badge-light-danger";
            }
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
