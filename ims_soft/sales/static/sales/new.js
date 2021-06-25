// handleDateTimePicker('#datepicker')

let purchaseForm = document.querySelectorAll("tbody .purchase-form")
let container = document.querySelector("#form-container")
let addButton = document.querySelector("#add-form")
let totalForms = document.querySelector("#id_form-TOTAL_FORMS")
let formNum = purchaseForm.length - 1 // Get the number of the last form on the page with zero-based indexing

const spinnerBox = document.getElementById('spinner-box')

var globalFormNum

addButton.addEventListener('click', addForm)

function addForm(e) {
    e.preventDefault();
    spinnerBox.classList.remove('not-visible')
    setTimeout(() => {
        $("#id_form-" + 0 + "-products").select2('destroy'); 
        let newForm = purchaseForm[0].cloneNode(true) //Clone the bird form
        console.log(newForm)
        let formRegex = RegExp(`form-(\\d){1}-`, 'g') //Regex to find all instances of the form number
        formNum++ //Increment the form number
        newForm.innerHTML = newForm.innerHTML.replace(formRegex, `form-${formNum}-`) //Update the new form to have the correct form number
        container.appendChild(newForm) //Insert the new form at the end of the list of forms

        totalForms.setAttribute('value', `${formNum + 1}`) //Increment the number of total forms in the management form
        autoComplete()
        spinnerBox.classList.add('not-visible')
    }, 500);
}

function autoComplete() {
    globalFormNum != null ? localFormNum = globalFormNum : localFormNum = formNum 
    $("#id_form-" + localFormNum + "-products").select2({
        placeholder: "Select Product",
        'allowClear': true
    });
    $("#id_form-" + 0 + "-products").select2({
        placeholder: "Select Product",
        'allowClear': true
    });   
};

$("#id_form-" + 0 + "-products").select2({
    placeholder: "Select Product",
    'allowClear': true
});



