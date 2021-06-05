const handleAlerts = (type, msg) => {
    alertBox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>
    `
}

const handleModalAlerts = (type, msg) => {
    alertModalBox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>
    `
}


//Checks countries.result for an object with a property of 'id' whose value is 'AF'
//Then removes it ;p
