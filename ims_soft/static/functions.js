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

const handleDateTimePicker = (id) => {
    $(id).datetimepicker({
        modal: true,
        footer: true,
    });
}