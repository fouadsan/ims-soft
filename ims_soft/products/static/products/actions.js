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
const article_numInput = document.getElementById('id_updateArticle_num')
const categoryInput = document.getElementById('id_updateCategory')

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
        success: article_numInput ? function (response) {

            const data = response.data
            nameInput.value = data.name
            categoryInput.value = data.category
            article_numInput.value = data.article_num

        } : function (response) {

            const data = response.data
            nameInput.value = data.name

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
    const name = document.getElementById('name-' + localUpId)
    const article_num = document.getElementById('article_num-' + localUpId)
    const category = document.getElementById('category-' + localUpId)

    $.ajax({
        type: 'POST',
        url: updateUrl + id.textContent,
        data: article_numInput ? {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': nameInput.value,
            'category': categoryInput.value,
            'article_num': article_numInput.value,
        } : {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': nameInput.value,
        },
        success: function (response) {
            $('#updateModal').modal('hide')
            handleAlerts('success', 'Object has been updated')

            name.textContent = response.name
            if (response.hasOwnProperty('article_num')) {
                response.article_num != "" ? article_num.textContent = response.article_num : article_num.textContent = "N/A"
                response.category != "" ? category.textContent = response.category : category.textContent = "N/A"
            }
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
            localStorage.setItem('name', nameInput.value)

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
