// handleDateTimePicker('#datepicker')
const eventBox = document.getElementById('event-box')
const eventDate = Date.parse(eventBox.textContent)

const settingsUrl = window.location.origin + "/settings/"
console.log(settingsUrl)

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

const csrf = document.getElementsByName('csrfmiddlewaretoken')

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

 
// const myCountdown =  () => { 
//     const now = new Date().getTime()
//     const diff = eventDate - now
    
//     const d = Math.floor(eventDate / (1000 * 60 * 60 * 24) - (now / (1000 * 60 * 60 * 24)))
//     const h = Math.floor((eventDate / (1000 * 60 * 60) - (now / (1000 * 60 * 60))) % 24)
//     const m = Math.floor((eventDate / (1000 * 60) - (now / (1000 * 60))) % 60)
//     const s = Math.floor((eventDate / (1000) - (now / (1000))) % 60)
    
//     if (diff <= 0) {
//         alert('Your time is over')
//     } 
// };
const myCountdown =  setInterval(() => {
    const now = new Date().getTime()
    const diff = eventDate - now
    
    const d = Math.floor(eventDate / (1000 * 60 * 60 * 24) - (now / (1000 * 60 * 60 * 24)))
    const h = Math.floor((eventDate / (1000 * 60 * 60) - (now / (1000 * 60 * 60))) % 24)
    const m = Math.floor((eventDate / (1000 * 60) - (now / (1000 * 60))) % 60)
    const s = Math.floor((eventDate / (1000) - (now / (1000))) % 60)
    
    if (diff > 0) {
        countdownBox.innerHTML = d + " days, " + h + " hours, " + m + " minutes, " + s + " seconds"
    } else {
        clearInterval(myCountdown)
        window.location.href == settingsUrl ? countdownBox.innerHTML = "Countdown Completed! Server's down" :
        alert("Countdown Completed! Server's down")
    }
}, 1000);
