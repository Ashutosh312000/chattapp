const message=document.getElementById('messages');
const sendbtn=document.getElementById('sendbtn')
const form=document.getElementById('form')



window.addEventListener('DOMContentLoaded',()=>{
    yourmessage('You',' Joined')
})

const yourmessage=(by,text)=>{
    const messagediv=document.createElement('div');
    messagediv.className='messagecls'
    const messagep=document.createElement('p')
    messagep.textContent=`${by}  ${text}`
    messagediv.appendChild(messagep)
    message.appendChild(messagediv)
}

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }

async function send(e){
    try{
        e.preventDefault();
        const message=e.target.message.value;
        yourmessage('You :',`${message}`)
        const token=localStorage.getItem('token');
        form.reset();
        const response= await  axios.post(`http://localhost:3000/message/postmessage`,{message},{headers:{"Authorization" : token}})
        
            console.log(response);
        

    }
    catch(err){
        console.log(err)
    }
}