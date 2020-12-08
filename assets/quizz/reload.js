function _reloadPage() {
    setTimeout(function () {
        window.location.reload();
    }, 90000);
}

let timerId = undefined;
let secRemainingToReload = -1;

function reloadPage(sec) {
    hidden('reload-page-info-component', false);
    hidden('reload-page-info', false);

    secRemainingToReload = sec;
    timerId = window.setInterval(reloadTIFunc, 1000);
}

function stopPageReload() {
    if (timerId === undefined || secRemainingToReload < 0)
        return;

    hidden('reload-page-info-component', true);
    hidden('reload-page-info', true);
    window.clearInterval(timerId);
    timerId = undefined;
    secRemainingToReload = -1;
}

function showReloadTimerInfo() {
    if (secRemainingToReload === 1) {
        setHtml('reload-page-info', 'Cette page va se recharger dans une seconde.');
    } else {
        setHtml('reload-page-info', 'Cette page va se recharger dans ' + (secRemainingToReload)
            + ' secondes.')
    }
    secRemainingToReload--;
}

function reloadTIFunc() {
    if (timerId !== undefined) {
        if (secRemainingToReload < 0) {
            stopPageReload();
        } else if (secRemainingToReload === 0) {
            window.location.reload();
        } else {
            showReloadTimerInfo();
        }
    }
}