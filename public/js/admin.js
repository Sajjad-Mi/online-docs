//add new user to document
const form = document.querySelector('.addUser');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newUser = form.newUser.value;
    try {                                                               
        fetch('/addUser', { 
            method: 'POST', 
            body: JSON.stringify({ newUser, docId:docId, title}),
            headers: {'Content-Type': 'application/json'}
        }).then((res)=>{
            console.log(res)
            form.newUser.value='';
            let list = document.querySelector('.user-list');
            const h4 = document.createElement('h4');
            const h5 = document.createElement('h5');
            h4.innerText = newUser;
           
            list.appendChild(h4);
        });   
    } 
    catch (err) {
        console.log(err);
    }
});