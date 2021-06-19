const rowsBox = document.getElementById('rows-box')
const spinnerBox = document.getElementById('spinner-box')
const actionBtn = document.getElementById('action-btn')
const loadBtn = document.getElementById('load-btn')
const deleteSelectedBtn = document.getElementById('delete-selected-btn')

const endBox = document.getElementById('end-box')

const createForm = document.getElementById('create-form')

var globalVariableSearchData
const searchInput = document.getElementById('search-input')

const objectName = document.getElementById('id_name')
const objectEmail = document.getElementById('id_email')
const objectPhone = document.getElementById('id_phone')
const objectFax = document.getElementById('id_fax')
const objectAddress = document.getElementById('id_address')

const objectSalary = document.getElementById('id_salary')
const objectDownPay = document.getElementById('id_down_payments')

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
                    el.email ? el.email : el.email = "N/A"
                    el.phone ? el.phone : el.phone = "N/A"
                    el.fax ? el.fax : el.fax = "N/A"
                    el.address ? el.address : el.address = "N/A"
                    el.down_payments ? el.down_payments : el.down_payments = "N/A"
                    el.credit1 ? el.credit1 : el.credit1 = "N/A"
                    el.credit2 ? el.credit2 : el.credit2 = "N/A"

                    el.salary ?
                        rowsBox.innerHTML += `
                        <tr id="${el.id}">
                            <th scope="row"><input type="checkbox" value="${el.id}"/></th>
                            <td id="id-${el.id}">${el.id}</td>
                            <td id="name-${el.id}">${el.name}</td>
                            <td id="phone-${el.id}">${el.phone}</td>
                            <td id="address-${el.id}">${el.address}</td>
                            <td id="salary-${el.id}">${el.salary}</td>
                            <td id="down_payments-${el.id}">${el.down_payments}</td>
                            <td>N/A</td>                          
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
                        <tr id="${el.id}">
                            <th scope="row"><input type="checkbox" value="${el.id}"/></th>
                            <td id="id-${el.id}">${el.id}</td>
                            <td id="name-${el.id}">${el.name}</td>
                            <td id="email-${el.id}">${el.email}</td>
                            <td id="phone-${el.id}">${el.phone}</td>
                            <td id="fax-${el.id}">${el.fax}</td>
                            <td id="address-${el.id}">${el.address}</td>
                            <td id="address-${el.id}">${el.credit1}</td>
                            <td id="address-${el.id}">${el.credit2}</td>                           
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
        data: objectSalary ? {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': objectName.value,
            'phone': objectPhone.value,
            'address': objectAddress.value,
            'salary': objectSalary.value,
            'down_payments': objectDownPay.value
        } : {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': objectName.value,
            'email': objectEmail.value,
            'phone': objectPhone.value,
            'fax': objectFax.value,
            'address': objectAddress.value,
        },
        success: function (response) {
            newRowId = response.id
            globalVariableSearchData.push(response)
            if (response.hasOwnProperty('email')) {
                response.email ? response.email : response.email = "N/A"
                response.fax ? response.fax : response.fax = "N/A"
                response.credit1 ? response.credit1 : response.credit1 = "N/A"
                response.credit2 ? response.credit2 : response.credit2 = "N/A"
            } else if (response.hasOwnProperty('salary')) {
                response.salary ? response.salary : response.salary = "N/A"
                response.down_payments ? response.down_payments : response.down_payments = "N/A"
            }
            response.phone ? response.phone : response.phone = "N/A"
            response.address ? response.address : response.address = "N/A"

            response.salary ?
                rowsBox.insertAdjacentHTML('afterbegin', `
                <tr id="${response.id}">
                    <th scope="row"><input type="checkbox" value="${response.id}"/></th>
                    <td id="id-${response.id}">${response.id}</td>
                    <td id="name-${response.id}">${response.name}</td>
                    <td id="phone-${response.id}">${response.phone}</td>
                    <td id="address-${response.id}">${response.address}</td>
                    <td id="salary-${response.id}">${response.salary}</td>
                    <td id="down_payments-${response.id}">${response.down_payments}</td>
                    <td>N/A</td>
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
                </tr>
            `) :
                rowsBox.insertAdjacentHTML('afterbegin', `
                <tr id="${response.id}">
                    <th scope="row"><input type="checkbox" value="${response.id}"/></th>
                    <td id="id-${response.id}">${response.id}</td>
                    <td id="name-${response.id}">${response.name}</td>
                    <td id="email-${response.id}">${response.email}</td>
                    <td id="phone-${response.id}">${response.phone}</td>
                    <td id="fax-${response.id}">${response.fax}</td>
                    <td id="address-${response.id}">${response.address}</td>
                    <td id="address-${response.id}">${response.credit1}</td>
                    <td id="address-${response.id}">${response.credit2}</td>
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
                </tr>
            `)
            $('#createModal').modal('hide')
            handleAlerts('top', 'Creation', 'New object added!', 'success', false, 1500)
            endBox.textContent = ""
            createForm.reset()
        },
        error: function () {
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
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
            obj.email ? obj.email : obj.email = "N/A"
            obj.phone ? obj.phone : obj.phone = "N/A"
            obj.fax ? obj.fax : obj.fax = "N/A"
            obj.address ? obj.address : obj.address = "N/A"
            obj.credit1 ? obj.credit1 : obj.credit1 = "N/A"
            obj.credit2 ? obj.credit2 : obj.credit2 = "N/A"
            obj.down_payments ? obj.down_payments : obj.down_payments = "N/A"
            obj.salary ?
                rowsBox.innerHTML +=
                `
                <tr id="${obj.id}">
                    <th scope="row"><input type="checkbox" value="${obj.id}"/></th>
                    <td id="id-${obj.id}">${obj.id}</td>
                    <td id="name-${obj.id}">${obj.name}</td>
                    <td id="phone-${obj.id}">${obj.phone}</td>
                    <td id="address-${obj.id}">${obj.address}</td>
                    <td id="salary-${obj.id}">${obj.salary}</td>
                    <td id="down_payments-${obj.id}">${obj.down_payments}</td>
                    <td>N/A</td>                    
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
                <tr id="${obj.id}">
                    <th scope="row"><input type="checkbox" value="${obj.id}"/></th>
                    <td id="id-${obj.id}">${obj.id}</td>
                    <td id="name-${obj.id}">${obj.name}</td>
                    <td id="email-${obj.id}">${obj.email}</td>
                    <td id="phone-${obj.id}">${obj.phone}</td>
                    <td id="fax-${obj.id}">${obj.fax}</td>
                    <td id="address-${obj.id}">${obj.address}</td>  
                    <td id="address-${obj.id}">${obj.credit1}</td>  
                    <td id="address-${obj.id}">${obj.credit2}</td>                    
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