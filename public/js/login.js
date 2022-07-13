const form = document.querySelector('form');
const inputError = document.querySelector('.input.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //reset the error input
    inputError.textContent = '';                                   

    const email = form.email.value;
    const password = form.password.value;
     //send the value and show error if there is one
    try {                                                              
        const res = await fetch('/login', { 
            method: 'POST', 
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();

        if(data.error !== ""){
            inputError.textContent = JSON.stringify(data.error);
        }
        
    }catch (err) {
        console.log(err);
    }
});