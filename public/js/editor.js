const doc = document.querySelector('.document-editor__editable');
const socket = io();

socket.emit('joinRoom', {username, roomId:docId});
socket.emit('onUsers', {roomId:docId});

socket.on('onUsers', (onUsers) =>{
    let list = document.querySelector('.onUsers-list');
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    }
    onUsers.forEach(user => {
        const h4 = document.createElement('h4');
        h4.classList.add('user');
        h4.innerText = user;   
        list.appendChild(h4);
    })
})
DecoupledEditor
    .create( document.querySelector( '.document-editor__editable' ), {initialData: docsContent } )
    .then( editor => {
        const toolbarContainer = document.querySelector( '.document-editor__toolbar' );  
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );

        doc.addEventListener('keyup', ()=>{ 
            socket.emit('typed', {data: editor.getData(), roomId: docId});
        })
        socket.on('newMessage', data=>{
            editor.setData(data);
        })
        setInterval(async()=>{
            fetch('/save', { 
                method: 'PATCH', 
                body: JSON.stringify({  docId:docId, docsContent: editor.getData()}),
                headers: {'Content-Type': 'application/json'}
            }).then(res=>console.log(res))
        }, 9000)
    })
    .catch( error => {
        console.error( error );
    } );
