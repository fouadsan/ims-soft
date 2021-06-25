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

let visible = 5
const getData = () => {
    $.ajax({
        type: 'GET', 
        url: `data/${visible}/`,
        success: function (response) {
            const data = response.data
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
                        <td id="article_num-${el.id}">rogk</td>
                        <td id="quantity-${el.id}">${el.quantity}</td>
                        <td id="status-${el.id}">
                            <label id="status_label-${el.id}" class="badge ">${el.status}</label>
                            <button type="button" id="update-btn" class="btn btn-icon btn-outline-secondary"
                            title="Edit" data-toggle="modal" data-target="#updateModal" data-item="${el.id}">
                            <i class="feather icon-edit-1"></i>
                            </button>
                        </td>
                        <td id="buy_price-${el.id}">${el.buy_price}</td>
                        <td id="sale_price-${el.id}">${el.sale_price}</td> 
                        <td id="barcode_digit-${el.id}">
                            ${el.barcode_digit}
                            <button type="button" id="printView-btn" class="btn btn-icon btn-outline-secondary"
                            title="Print" data-toggle="modal" data-target="#printModal" data-item="${el.id}">
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

getData()