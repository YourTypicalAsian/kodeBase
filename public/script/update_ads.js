document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#edit_ads");
    form.addEventListener('submit', event => {
        event.preventDefault();
        // option er  et objekt der  kan man se på krølleparentes
        const option = {
            cache: 'no-cache',
            method: 'PATCH',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
            body: new FormData(form)
        };

        console.log(option);
        const id = window.location.pathname.split('/').pop();
        const url = `/admin/ads/edit/${id}`;

        // fetch er  en fuction 
        fetch(url, option) // fetch er at kalde på en adresse med en række options
            .then(response => { // then er det svar vi får tilbage
                //console.log(response.status);

                if (response.status === 200) { // 200 betyder "OK"
                    //button.parentElement.parentElement.remove();
                    console.log('ok');
                    document.location.href = 'http://localhost:3000/admin/ads';
                }
                else if (response.status === 400) {
                    console.log("no-go" + url);

                }
            });
    });
});