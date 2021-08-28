import { ajax } from "./ajax.js";

const itemsDOM = document.querySelectorAll('.item');
for (const item of itemsDOM) {
    const deleteDOM = item.querySelector('.fa-trash')
    deleteDOM.addEventListener("click", () => {
        ajax({
            method: 'DELETE',
            headers: {},
            endpoint: 'api/services?urlSlug=' + item.id,    //item.id nurodo tikslu objekta ir ka su juo daryti
        }, responseAction);
    })
}


function responseAction(response) {
    try {
        const responseObject = JSON.parse(response);
        if (responseObject.error) {
            alert(responseObject.error)
            return;
        }

        alert('Paslauga sekmingai istrinta!')

        location.reload()

    } catch (error) {
        alert('Serverio klaida!')
    }
}