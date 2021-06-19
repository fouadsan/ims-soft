const handleAlerts = (position, title, msg, type, boolConfirmBtn, timer) => {
    Swal.fire({
        position: position,
        title: title,
        text: msg,
        icon: type,
        showConfirmButton: boolConfirmBtn,
        timer: timer,
        confirmButtonText: 'Ok'
    })
    // alertBox.innerHTML = `
    //     <div class="alert alert-${type}" role="alert">
    //         ${msg}
    //     </div>
    // `
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


