// const backBtn = document.getElementById('back-btn')

const url = "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"
const pdfUrl = window.location.href + "pdf_view"

const updateForm = document.getElementById('update-form')
const printForm = document.getElementById('print-form')
const spinnerModal = document.getElementById('spinner-modal')

// const spinnerBox = document.getElementById('spinner-box')

const reorder_levelInput = document.getElementById('id_updateReorderLevel')

var globalVariableUp;
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
            reorder_levelInput.value = data.reorder_level
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
            'reorder_level': reorder_levelInput.value,
        },
        success: function (response) {
            $('#updateModal').modal('hide')
            handleAlerts('center', 'Update', 'Object has been updated', 'success', false, 1500)
            status.textContent = response.status
            if (status.textContent == "available") {
                status.className = "badge badge-light-success";
            } else if (status.textContent == "medium") {
                status.className = "badge badge-light-warning";
            } else {
                status.className = "badge badge-light-danger";
            }
        },
        error: function () {
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
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
