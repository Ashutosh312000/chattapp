const message=document.getElementById('messages');



window.addEventListener('DOMContentLoaded',()=>{
    yourmessage('You Joined')
})

const yourmessage=(text)=>{
    const messagediv=document.createElement('div');
    messagediv.className='messagecls'
    const messagep=document.createElement('p')
    messagep.textContent=`${text}`
    messagediv.appendChild(messagep)
    message.appendChild(messagediv)
}