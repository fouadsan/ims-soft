console.log('hello world')

const suppliersBox = document.getElementById('suppliers-box')
const spinnerBox = document.getElementById('spinner-box')
const actionBtn = document.getElementById('action-btn')
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')

const supplierForm = document.getElementById('supplier-form')
const supname = document.getElementById('id_name')
const supemail = document.getElementById('id_email')
const supphone = document.getElementById('id_phone')
const supfax = document.getElementById('id_fax')
const supaddress = document.getElementById('id_address')
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

let visible = 3

const getData = () => {
    $.ajax({
        type: 'GET',
        url: `data/${visible}/`,
        success: function (response) {
            const data = response.data
            setTimeout(() => {
                spinnerBox.classList.add('not-visible')
                data.forEach(el => {
                    suppliersBox.innerHTML += `
                        <tr>
                            <td>${el.id}</td>
                            <td>${el.name}</td>
                            <td>${el.email}</td>
                            <td>${el.phone}</td>
                            <td>${el.fax}</td>
                            <td>${el.address}</td>
                            <td>
                                <button type="button" id="action-btn" class="btn btn-icon btn-outline-warning" data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i class="feather icon-edit-2"></i>
                                </button>&nbsp;
                                <button type="button" class="btn btn-icon btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Remove">
                                    <i class="feather icon-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `
                });
            }, 200)
            if (response.size === 0) {
                endBox.textContent = 'No suppliers added yet...'
            }
            else if (response.size <= visible) {
                loadBtn.classList.add('not-visible')
                endBox.textContent = 'No more data to load...'
            }
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

let newSupplierId = null
supplierForm.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'name': supname.value,
            'email': supemail.value,
            'phone': supphone.value,
            'fax': supfax.value,
            'address': supaddress.value
        },
        success: function (response) {
            newSupplierId = response.id
            suppliersBox.insertAdjacentHTML('afterbegin', `
                <tr>
                    <td>${response.id}</td>
                    <td>${response.name}</td>
                    <td>${response.email}</td>
                    <td>${response.phone}</td>
                    <td>${response.fax}</td>
                    <td>${response.address}</td>
                    <td>
                        <button type="button" id="action-btn" class="btn btn-icon btn-outline-warning" data-toggle="tooltip" data-placement="top" title="Edit">
                            <i class="feather icon-edit-2"></i>
                        </button>&nbsp;
                        <button type="button" class="btn btn-icon btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Remove">
                            <i class="feather icon-trash"></i>
                        </button>
                    </td>
                </tr>
            `)
            // $('#addSupplierModal').modal('hide')
            handleModalAlerts('success', 'New Supplier added!')
            supplierForm.reset()
        },
        error: function (error) {
            console.log(error)
            handleModalAlerts('danger', 'ups...something went wrong')
        }
    })
})

getData()