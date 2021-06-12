// const backBtn = document.getElementById('back-btn')

const url = "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"
const deleteSelectedUrl = window.location.href + "delete-selected/"
const pdfUrl = window.location.href + "pdf_view"

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')
const deleteSelectedForm = document.getElementById('delete-selected-form')
const printForm = document.getElementById('print-form')

const statusInput = document.getElementById('id_updateStatus')

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
            statusInput.value = data.status
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

    $.ajax({
        type: 'POST',
        url: updateUrl + id.textContent,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'status': statusInput.value,
        },
        success: function (response) {
            $('#updateModal').modal('hide')
            handleAlerts('success', 'Object has been updated')
            status.textContent = response.status
            if (status.textContent == "approved") {
                status.className = "badge badge-success";
            } else if (status.textContent == "pending") {
                status.className = "badge badge-warning";
            } else {
                status.className = "badge badge-light-danger";
            }
        },
        error: function (error) {
            console.log(error)
        }
    })

})


$(document).on('click', '#printView-btn', function () {
    var upId = $(this).attr('data-item');
    globalVariableUp = upId
    $.ajax({
        type: 'GET',
        url: url + upId,
        beforeSend: function () {
            printForm.innerHTML = ``
            spinnerModal.classList.remove('not-visible')
        },
        success: function (response) {
            const data = response.data
            setTimeout(() => {
                spinnerModal.classList.add('not-visible')
                printForm.innerHTML = `
                    <img id="barcode_img-${data.id}" class="img-thumbnail mb-3" src=${data.barcode_img} alt="Barcode image"></img>
                    <div class="d-flex flex-wrap justify-content-center">
                        <a href="${pdfUrl}" class="btn btn-primary mr-1">Print</a>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                `
            }, 500)
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
            handleAlerts('success', response.msg)

        },
        error: function (error) {
            console.log(error)
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
            handleAlerts('success', response.msg)
        }
    })
})