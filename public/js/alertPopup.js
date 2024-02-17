function alertPopupConfirm(message, title, icon, confirmButtonText) {
    return new Promise((resolve) => {
        Swal.fire({
            title: title,
            text: message,
            icon: icon,
            confirmButtonText: confirmButtonText,
            showCancelButton: true,
        }).then((result) => {
            resolve(result);
        });
    });
}

function alertPopup(title, text, icon) {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
    });
}
