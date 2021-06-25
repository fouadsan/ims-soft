// const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// const csrftoken = getCookie('csrftoken');

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


