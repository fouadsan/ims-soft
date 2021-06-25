const dbbackupUrl = window.location.href + "db-backup" 

const dbForm = document.getElementById('db-form')
const spinnerBox2 = document.getElementById('spinner-box2')
const downloadDbbox = document.getElementById('downloadDb-box')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

dbForm.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: dbbackupUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
        },
        dataType: 'json',
        beforeSend: function () {
            downloadDbbox.classList.add('not-visible')
            spinnerBox2.classList.remove('not-visible')
        },
        success: function (response) {
            setTimeout(() => { 
                spinnerBox2.classList.add('not-visible')
                downloadDbbox.classList.remove('not-visible')
                handleAlerts('top-end', 'Db Backup', response.msg, 'success', false, 1500)
            }, 200);
        },
        error: function () {
            spinnerBox2.classList.add('not-visible')
            downloadDbbox.classList.remove('not-visible')
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
        }
    })
})