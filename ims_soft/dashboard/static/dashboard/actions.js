const dbbackupUrl = window.location.href + "db-backup" 
const dbrestoreUrl = window.location.href + "db-restore" 

const backupForm = document.getElementById('backup-form')
const backupSpinnerBox = document.getElementById('backup-spinner-box')
const downloadDbbox = document.getElementById('downloadDb-box')

const restoreForm = document.getElementById('restore-form')
const rollbackSpinnerBox = document.getElementById('rollback-spinner-box')
const restoreBox = document.getElementById('restore-box')

backupForm.addEventListener('submit', e => {
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
            backupSpinnerBox.classList.remove('not-visible')
        },
        success: function (response) {
            setTimeout(() => { 
                backupSpinnerBox.classList.add('not-visible')
                downloadDbbox.classList.remove('not-visible')
                handleAlerts('top-end', 'Db Backup', response.msg, 'success', false, 1500)
            }, 200);
        },
        error: function () {
            backupSpinnerBox.classList.add('not-visible')
            downloadDbbox.classList.remove('not-visible')
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
        }
    })
})

restoreForm.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: dbrestoreUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'db_name': dbSelect.value
        },
        dataType: 'json',
        beforeSend: function () {
            restoreBox.classList.add('not-visible')
            rollbackSpinnerBox.classList.remove('not-visible')
        },
        success: function (response) {
            setTimeout(() => { 
                rollbackSpinnerBox.classList.add('not-visible')
                restoreBox.classList.remove('not-visible')
                handleAlerts('top-end', 'Db Restore', response.msg, 'success', false, 1500)
            }, 200);
        },
        error: function () {
            rollbackSpinnerBox.classList.add('not-visible')
            downloadDbbox.classList.remove('not-visible')
            handleAlerts('center', 'Error!', 'Oops...something went wrong', 'error', true)
        }
    })
})