const doc = document.querySelector('.document-editor__editable');
const socket = io();

socket.emit('joinRoom', {username, roomId:docId});

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
