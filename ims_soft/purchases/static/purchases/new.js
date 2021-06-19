// handleDateTimePicker('#datepicker')

let purchaseForm = document.querySelectorAll("tbody .purchase-form")
let container = document.querySelector("#form-container")
let addButton = document.querySelector("#add-form")
let totalForms = document.querySelector("#id_form-TOTAL_FORMS")
let formNum = purchaseForm.length - 1 // Get the number of the last form on the page with zero-based indexing

var globalFormNum

const autoCompleteUrl = window.location.href + "auto-complete/"

addButton.addEventListener('click', addForm)

function addForm(e) {
    e.preventDefault()

    let newForm = purchaseForm[0].cloneNode(true) //Clone the bird form
    let formRegex = RegExp(`form-(\\d){1}-`, 'g') //Regex to find all instances of the form number
    formNum++ //Increment the form number
    newForm.innerHTML = newForm.innerHTML.replace(formRegex, `form-${formNum}-`) //Update the new form to have the correct form number
    container.appendChild(newForm) //Insert the new form at the end of the list of forms

    totalForms.setAttribute('value', `${formNum + 1}`) //Increment the number of total forms in the management form
    autoComplete()
}

function autoComplete() {

    globalFormNum != null ? localFormNum = globalFormNum : localFormNum = formNum
    var availableTags = [];
    const getProdData = () => {
        $.ajax({
            type: 'GET',
            url: autoCompleteUrl,
            success: function (response) {
                const data = response.data
                data.forEach(el => {
                    availableTags.push(el.name)
                    console.log(availableTags)
                });
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
    getProdData()
    $("#id_form-" + localFormNum + "-products").autocomplete({
        source: availableTags,
        //   minLength: 2
    });
};

autoComplete()