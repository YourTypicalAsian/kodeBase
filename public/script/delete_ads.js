document.addEventListener('DOMContentLoaded', () => {
    let deltecategoiresbtn = document.querySelectorAll('.delads');
    deltecategoiresbtn.forEach(button => {
        console.log(button.dataset.id);
        button.addEventListener('click', () => {
            console.log(`delte cartegrie ${button.dataset.id}`);
            let data = { id: button.dataset.id }
 
            // option er  et objekt der  kan man se på krølleparentes
            let option = {
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'delete',
                mode: 'cors',
                redirect: 'follow',
                referrer: 'no-referrer'
            };
 
            console.log(option);
 
 
            // fetch er  en fuction
            fetch(`/admin/ads/${button.dataset.id}`, option) // fetch er at kalde på en adresse med en række options
                .then(response => { // then er det svar vi får tilbage
                    if (response.status === 200) { // 200 betyder "OK"
                        button.parentElement.parentElement.remove();
                    }
                });
        });
    });
 });