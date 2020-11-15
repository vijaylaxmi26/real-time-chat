const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let mesgArea = document.querySelector('.chat_box');


do{
   name = prompt('enter the name:');
}while(!name)

textarea.addEventListener('keyup', (e)=>{
        if(e.key === 'Enter'){
            sendMessage(e.target.value);
        }
})

function sendMessage(msg){
    let mas ={
        user:name,
        message = msg.trim()
    }
     
    appendMessage(mas, 'outgoing');
    textarea.value='';
    scrollToBottom();

    // send to server
    socket.emit('message', mas);
}

function appendMessage(msg, type){
       let mainDiv = document.createElement('div')
       let className = type
       mainDiv.classList.add(className)

       let markup=`
         <h1>${msg.user}</h1>
         <p>${msg.message}</p>
       `
      mainDiv.innerHTML = markup;

      mesgArea.appendChild(mainDiv);


}

// Recieve message

socket.on('message', (msg) => {
    appendMessage(msg,'incoming');
    scrollToBottom();
})

function scrollToBottom(){
    mesgArea.scrollTop = mesgArea.scrollHeight;
}