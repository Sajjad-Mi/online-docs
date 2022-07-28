//remove a user
const removeUser = (userElm, elm)=>{
    const user = userElm.innerText;
    fetch('/removeUser', {
        method: 'DELETE',
        body: JSON.stringify({ user, docId:docId}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if(response.status == 200){
            userElm.style.display='none';
            elm.style.display='none';            
          
        }
    })
    .catch(err => console.log(err));
}

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
            h5.classList.add('user-rm');
            h5.addEventListener('click', function (e) { removeUser(this.previousSibling, this)})
            h5.innerText = 'remove user';  
            list.appendChild(h4);
            list.appendChild(h5);

        });   
    } 
    catch (err) {
        console.log(err);
    }
});

//delete a document
const inputError = document.querySelector('.input.error');
const trashcan = document.querySelector('a.delete');
trashcan.addEventListener('click', async (e) => {    
    const endpoint = `/deleteDoc/${trashcan.dataset.doc}`;

    const res = await fetch(endpoint, {
      method: 'DELETE',
    });
    const data = await res.json();
    if(data.error !== ""){
        inputError.textContent = JSON.stringify(data.error);
    }else{
        window.location.href = data.redirect;
    }
    
});