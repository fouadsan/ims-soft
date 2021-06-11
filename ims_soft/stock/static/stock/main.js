const rowsBox = document.getElementById('rows-box')
const spinnerBox = document.getElementById('spinner-box')
const actionBtn = document.getElementById('action-btn')
const loadBtn = document.getElementById('load-btn')
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
                    el.quantity ? el.quantity : el.quantity = "N/A"
                    el.buy_price ? el.buy_price : el.buy_price = "N/A"
                    el.sale_price ? el.sale_price : el.sale_price = "N/A"
                    rowsBox.innerHTML += `
                        <tr>
                            <td id="id-${el.id}">${el.id}</td>
                            <td id="product-${el.id}">${el.product}</td>
                            <td id="article_num-${el.id}">xxxx</td>
                            <td id="quantity-${el.id}">${el.quantity}</td>
                            <td id="status-${el.id}">
                                <label id="status_label-${el.id}" class="badge ">${el.status}</label>
                                <button type="button" id="update-btn" class="btn btn-icon btn-outline-secondary"
                                title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${el.id}">
                                <i class="feather icon-edit"></i>
                                </button>
                            </td>
                            <td id="buy_price-${el.id}">${el.buy_price}</td>
                            <td id="sale_price-${el.id}">${el.sale_price}</td> 
                            <td id="barcode_digit-${el.id}">
                                ${el.barcode_digit}
                                <button type="button" id="printView-btn" class="btn btn-icon btn-outline-secondary"
                                title="Edit" data-toggle="modal" data-target="#printModal" data-item="${el.id}">
                                <i class="feather icon-printer"></i>
                                </button>
                            </td>                           
                        </tr>
                    `
                    statusLabel = document.getElementById('status_label-' + el.id)
                    if (el.status == "available") {
                        statusLabel.className += "badge-light-success";
                    } else if (el.status == "medium") {
                        statusLabel.className += "badge-light-warning";
                    } else {
                        statusLabel.className += "badge-light-danger";
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
    filteredArr = localSearchData.filter(obj => obj['product'].includes(e.target.value))
    if (filteredArr.length > 0) {
        endBox.textContent = ""
        filteredArr.map(obj => {
            obj.quantity ? obj.quantity : obj.quantity = "N/A"
            obj.buy_price ? obj.buy_price : obj.buy_price = "N/A"
            obj.sale_price ? obj.sale_price : obj.sale_price = "N/A"
            
            rowsBox.innerHTML +=`
                <tr>
                    <td id="id-${obj.id}">${obj.id}</td>
                    <td id="product-${obj.id}">${obj.product}</td>
                    <td id="article_num-${obj.id}">xxx</td>
                    <td id="product-${obj.id}">${obj.quantity}</td>
                    <td id="status-${obj.id}">
                        <label id="status_label-${obj.id}" class="badge ">${obj.status}</label>
                        <button type="button" id="update-btn" class="btn btn-icon btn-outline-secondary"
                        title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${obj.id}">
                        <i class="feather icon-edit"></i>
                        </button>
                    </td>
                    <td id="buy_price-${obj.id}">${obj.buy_price}</td>
                    <td id="sale_price-${obj.id}">${obj.sale_price}</td>
                    <td id="barcode_digit-${obj.id}">
                        ${obj.barcode_digit}
                        <button type="button" id="printView-btn" class="btn btn-icon btn-outline-secondary"
                        title="Edit" data-toggle="modal" data-target="#printModal" data-item="${obj.id}">
                        <i class="feather icon-edit"></i>
                        </button>
                    </td> 
                </tr>
            `
            statusLabel = document.getElementById('status_label-' + obj.id)
            if (obj.status == "available") {
                statusLabel.className += "badge-light-success";
            } else if (obj.status == "medium") {
                statusLabel.className += "badge-light-warning";
            } else {
                statusLabel.className += "badge-light-danger";
            }
        });
    } else {
        endBox.textContent = "No results found.."
    }
})

getData() 