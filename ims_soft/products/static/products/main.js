const rowsBox = document.getElementById('rows-box')
const spinnerBox = document.getElementById('spinner-box')
const actionBtn = document.getElementById('action-btn')
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')

const createForm = document.getElementById('create-form')

var globalVariableSearchData
const searchInput = document.getElementById('search-input')

const objectName = document.getElementById('id_name')
const objectArticle_num = document.getElementById('id_article_num')
const objectCategory = document.getElementById('id_category')
const objectReorder_level = document.getElementById('id_reorder_level')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

const alertBox = document.getElementById('alert-box')
const alertModalBox = document.getElementById('alertModal-box')

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

let visible = 5
const getData = () => {
    $.ajax({
        type: 'GET',
        url: `data/${visible}/`,
        success: function (response) {
            const data = response.data
            globalVariableSearchData = data
            setTimeout(() => {
                spinnerBox.classList.add('not-visible')
                data.forEach(el => {
                    el.category ? el.category : el.category = "N/A"

                    el.article_num ?
                        rowsBox.innerHTML += `
                        <tr>
                            <td id="id-${el.id}">${el.id}</td>
                            <td id="name-${el.id}">${el.name}</td>
                            <td id="article_num-${el.id}">${el.article_num}</td>
                            <td id="category-${el.id}">${el.category}</td>
                            <td id="instock-${el.id}">xxxx</td>
                            <td id="barcode-${el.id}">xxx</td>                           
                            <td>
                                <button type="button" id="update-btn" class="btn btn-icon btn-outline-warning"
                                title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${el.id}">
                                    <i class="feather icon-edit-2"></i>
                                </button>&nbsp;
                                <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                                title="Remove" data-toggle="modal" data-target="#deleteModal"
                                 data-item="${el.id}" data-item-name="${el.name}">
                                    <i class="feather icon-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `:
                        rowsBox.innerHTML += `
                        <tr>
                            <td id="id-${el.id}">${el.id}</td>
                            <td id="name-${el.id}">${el.name}</td>
                            <td id="prodcat-${el.id}">xxx</td>
                            <td>
                                <button type="button" id="update-btn" class="btn btn-icon btn-outline-warning"
                                title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${el.id}">
                                    <i class="feather icon-edit-2"></i>
                                </button>&nbsp;
                                <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                                title="Remove" data-toggle="modal" data-target="#deleteModal"
                                 data-item="${el.id}" data-item-name="${el.name}">
                                    <i class="feather icon-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `
                });
                if (response.size === 0) {
                    endBox.textContent = 'No object added yet...'
                }
                else if (response.size <= visible) {
                    loadBtn.classList.add('not-visible')
                    endBox.textContent = 'No more data to load...'
                }
            }, 200)
        },
        error: function (error) {
            console.log(error)
        }
    })
}

loadBtn.addEventListener('click', () => {
    spinnerBox.classList.remove('not-visible')
    visible += 3
    getData()
})

let newRowId = null
createForm.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: '',
        data: objectArticle_num ? {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': objectName.value,
            'category': objectCategory.value,
            'article_num': objectArticle_num.value,
            'reorder_level': objectReorder_level.value
        } : {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': objectName.value,
        },
        success: function (response) {
            newRowId = response.id
            globalVariableSearchData.push(response)
            if (response.hasOwnProperty('article_num')) {
                response.category ? response.category : response.category = "N/A"
                response.article_num ? response.article_num : response.article_num = "N/A"
            } 

            response.article_num ?
                rowsBox.insertAdjacentHTML('afterbegin', `
                <tr>
                <td id="id-${response.id}">${response.id}</td>
                <td id="name-${response.id}">${response.name}</td>
                <td id="article_num-${response.id}">${response.article_num}</td>
                <td id="category-${response.id}">${response.category}</td>
                <td id="instock-${response.id}">xxx</td>
                <td id="barcode-${response.id}">xxx</td>
                    <td>
                        <button type="button" id="update-btn" class="btn btn-icon btn-outline-warning"
                        title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${response.id}">
                            <i class="feather icon-edit-2"></i>
                        </button>&nbsp;
                        <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                        title="Remove" data-toggle="modal" data-target="#deleteModal"
                         data-item="${response.id}" data-item-name="${response.name}">
                            <i class="feather icon-trash"></i>
                        </button>
                    </td>
                    </td>
                </tr>
            `) :
                rowsBox.insertAdjacentHTML('afterbegin', `
                <tr>
                <td id="id-${response.id}">${response.id}</td>
                <td id="name-${response.id}">${response.name}</td>
                    <td>
                        <button type="button" id="update-btn" class="btn btn-icon btn-outline-warning"
                        title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${response.id}">
                            <i class="feather icon-edit-2"></i>
                        </button>&nbsp;
                        <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                        title="Remove" data-toggle="modal" data-target="#deleteModal"
                         data-item="${response.id}" data-item-name="${response.name}">
                            <i class="feather icon-trash"></i>
                        </button>
                    </td>
                    </td>
                </tr>
            `)
            // $('#createModal').modal('hide')
            handleModalAlerts('success', 'New Object added!')
            endBox.textContent = ""
            createForm.reset()
        },
        error: function () {
            handleModalAlerts('danger', 'ups...something went wrong')
        }
    })
})

let filteredArr = []

searchInput.addEventListener('keyup', (e) => {
    localSearchData = globalVariableSearchData
    rowsBox.innerHTML = ""
    filteredArr = localSearchData.filter(obj => obj['name'].includes(e.target.value))
    if (filteredArr.length > 0) {
        endBox.textContent = ""
        filteredArr.map(obj => {
            obj.category ? obj.category : obj.category = "N/A"
            obj.article_num ? obj.article_num : obj.article_num = "N/A"
            obj.article_num ?
                rowsBox.innerHTML +=
                `
                <tr>
                    <td id="id-${obj.id}">${obj.id}</td>
                    <td id="name-${obj.id}">${obj.name}</td>
                    <td id="article_num-${obj.id}">${obj.article_num}</td>
                    <td id="category-${obj.id}">${obj.category}</td>
                    <td id="instock-${obj.id}">xxxx</td>
                    <td id="barcode-${obj.id}">xxxx</td>
                    
                    <td>
                        <button type="button" id="update-btn" class="btn btn-icon btn-outline-warning"
                        title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${obj.id}">
                            <i class="feather icon-edit-2"></i>
                        </button>&nbsp;
                        <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                        title="Remove" data-toggle="modal" data-target="#deleteModal"
                            data-item="${obj.id}" data-item-name="${obj.name}">
                            <i class="feather icon-trash"></i>
                        </button>
                    </td>
                </tr>
            `: rowsBox.innerHTML += `
                <tr>
                    <td id="id-${obj.id}">${obj.id}</td>
                    <td id="name-${obj.id}">${obj.name}</td>
                    
                    <td>
                        <button type="button" id="update-btn" class="btn btn-icon btn-outline-warning"
                        title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${obj.id}">
                            <i class="feather icon-edit-2"></i>
                        </button>&nbsp;
                        <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                        title="Remove" data-toggle="modal" data-target="#deleteModal"
                        data-item="${obj.id}" data-item-name="${obj.name}">
                            <i class="feather icon-trash"></i>
                        </button>
                    </td>
                </tr>
            `
        });
    } else {
        endBox.textContent = "No results found.."
    }
})

getData()