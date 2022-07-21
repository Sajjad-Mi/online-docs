const doc = document.querySelector('.document-editor__editable');
const socket = io();

DecoupledEditor
    .create( document.querySelector( '.document-editor__editable' ), {initialData: docsContent } )
    .then( editor => {
        const toolbarContainer = document.querySelector( '.document-editor__toolbar' );  
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );

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
