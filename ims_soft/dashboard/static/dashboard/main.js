const dblistBox = document.getElementById('dblist-Box')
const dbSelect = document.getElementById('db-select')
const getBackupsSpinnerBox = document.getElementById('getbackups-spinner-box')

const countdownBox = document.getElementById('countdown-box')

const getBackups = () => {
    $.ajax({
        type: 'GET', 
        url: 'db-data/',
        success: async function (response) { 
            const data = await response.data
            setTimeout(() => {
                getBackupsSpinnerBox.classList.add('not-visible')
                dbSelect.classList.remove('not-visible')
                for (var i = 0; i < data.length; i++) { 
                    console.log(data[i]);
                    dbSelect.innerHTML += `<option>${data[i]}</option>`
                }
            }, 1000);
            
        },
        error: function (error) {
            console.log(error)
            // handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
        }
    })
}

// const myCountdown =  setInterval(() => {
//     const now = new Date().getTime()
//     const diff = eventDate - now
    
//     const d = Math.floor(eventDate / (1000 * 60 * 60 * 24) - (now / (1000 * 60 * 60 * 24)))
//     const h = Math.floor((eventDate / (1000 * 60 * 60) - (now / (1000 * 60 * 60))) % 24)
//     const m = Math.floor((eventDate / (1000 * 60) - (now / (1000 * 60))) % 60)
//     const s = Math.floor((eventDate / (1000) - (now / (1000))) % 60)
    
//     if (diff > 0) {
//         countdownBox.innerHTML = d + " days, " + h + " hours, " + m + " minutes, " + s + " seconds"
//     } else {
//         clearInterval(myCountdown)
//         countdownBox.innerHTML = "Countdown Completed! Server's down"
//     }
// }, 1000);



getBackups()