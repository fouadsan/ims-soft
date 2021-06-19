const rowsBox = document.getElementById('rows-box')
const spinnerBox = document.getElementById('spinner-box')
const actionBtn = document.getElementById('action-btn')
const loadBtn = document.getElementById('load-btn')
const deleteSelectedBtn = document.getElementById('delete-selected-btn')

const endBox = document.getElementById('end-box')

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

var globalVariableSearchData
const searchInput = document.getElementById('search-input')


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
                    el.status ? el.status : el.status = "N/A"
                    rowsBox.innerHTML += `
                        <tr id="${el.id}">
                            <th scope="row"><input type="checkbox" clas="custom-control-input" value="${el.id}"/></th>
                            <td id="id-${el.id}">${el.id}</td>
                            <td id="supplier-${el.id}">${el.supplier}</td>
                            <td id="created_by-${el.id}">${el.created_at}</td>
                            <td id="status-${el.id}">
                                <label id="status_label-${el.id}" class="badge ">${el.status}</label>
                                <button type="button" id="update-btn" class="btn btn-icon btn-outline-secondary"
                                title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${el.id}">
                                <i class="feather icon-edit"></i>
                                </button>
                            </td>
                            <td id="grand_total-${el.id}">${el.grand_total}</td>
                            <td id="payment-${el.id}">${el.payment}</td> 
                            <td id="created_by-${el.id}">${el.created_by}</td>
                            <td>
                                <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                                title="Remove" data-toggle="modal" data-target="#deleteModal"
                                 data-item="${el.id}" data-item-name="Purchase N°${el.id}">
                                    <i class="feather icon-trash"></i>
                                </button>
                            </td>                    
                        </tr>
                    `
                    statusLabel = document.getElementById('status_label-' + el.id)
                    if (el.status == "approved") {
                        statusLabel.className += "badge-success";
                    } else if (el.status == "pending") {
                        statusLabel.className += "badge-warning";
                    } else {
                        statusLabel.className += "badge-danger";
                    }
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

let filteredArr = []

searchInput.addEventListener('keyup', (e) => {
    localSearchData = globalVariableSearchData
    rowsBox.innerHTML = ""
    filteredArr = localSearchData.filter(obj => obj['supplier'].includes(e.target.value))
    if (filteredArr.length > 0) {
        endBox.textContent = ""
        filteredArr.map(obj => {
            obj.status ? obj.status : obj.status = "N/A"
            rowsBox.innerHTML += `
                <tr id="${obj.id}">
                    <th scope="row"><input type="checkbox" clas="custom-control-input" value="${obj.id}"/></th>
                    <td id="id-${obj.id}">${obj.id}</td>
                    <td id="supplier-${obj.id}">${obj.supplier}</td>
                    <td id="created_by-${obj.id}">${obj.created_at}</td>
                    <td id="status-${obj.id}">
                        <label id="status_label-${obj.id}" class="badge ">${obj.status}</label>
                        <button type="button" id="update-btn" class="btn btn-icon btn-outline-secondary"
                        title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${obj.id}">
                        <i class="feather icon-edit"></i>
                        </button>
                    </td>
                    <td id="grand_total-${obj.id}">${obj.grand_total}</td>
                    <td id="payment-${obj.id}">${obj.payment}</td> 
                    <td id="created_by-${obj.id}">${obj.created_by}</td>
                    <td>
                        <button type="button" id="delete-btn" class="btn btn-icon btn-outline-danger"
                        title="Remove" data-toggle="modal" data-target="#deleteModal"
                            data-item="${obj.id}" data-item-name="Purchase N°${obj.id}">
                            <i class="feather icon-trash"></i>
                        </button>
                    </td>                         
                </tr>
            `
            statusLabel = document.getElementById('status_label-' + obj.id)
            if (obj.status == "approved") {
                statusLabel.className += "badge-success";
            } else if (obj.status == "pending") {
                statusLabel.className += "badge-warning";
            } else {
                statusLabel.className += "badge-danger";
            }
        });
    } else {
        endBox.textContent = "No results found.."
    }
})

getData()