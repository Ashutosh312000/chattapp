const message=document.getElementById('messages');
const sendbtn=document.getElementById('sendbtn')
const form=document.getElementById('form')
const messagecls=document.getElementsByClassName('messagecls')


window.addEventListener('DOMContentLoaded',()=>{
    let messages=[];
    stringifiedmessages=JSON.stringify(messages)
    localStorage.setItem('messages',stringifiedmessages)
    setInterval( async () => {

        const token=localStorage.getItem('token');
        const messagesstringified=localStorage.getItem('messages');
        const messages=JSON.parse(messagesstringified)

       
        if(messages.length==0){
            lastmessageid=-1;
        }
        else{
            lastmessageid=messages[messages.length -1].id;
        }

       


        const response= await  axios.get(`http://localhost:3000/message/getmessage?lastmessageid=${lastmessageid}`,{headers:{"Authorization" : token}})
        let myarr = response.data;
        
        
       for(let i=0;i<myarr.length;i++){
        messages.push({Message:response.data[i].Message,username:response.data[i].user.Name,id:response.data[i].id})
        if(messages.length>15){
            messages.shift();
            console.log(messages)
        }
       }
       const messagesstringifiedagain=JSON.stringify(messages)
       localStorage.setItem('messages',`${messagesstringifiedagain}`)
        
       message.innerHTML='';
                for (let i = 0; i < messages.length; i++) {
                    const message=messages[i].Message;
                    const username=messages[i].username;
                  createmessage(username,message);
                }            
        
       
    }, 1000);

})

const createmessage=(by,text)=>{
    const messagediv=document.createElement('div');
    messagediv.className='messagecls'
    const messagep=document.createElement('p')
    messagep.textContent=`${by} : ${text}`
    messagediv.appendChild(messagep)
    message.appendChild(messagediv)
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function send(e){
    try{
        e.preventDefault();
        const message=e.target.message.value;
        const token=localStorage.getItem('token');
        form.reset();
        const response= await  axios.post(`http://localhost:3000/message/postmessage`,{message},{headers:{"Authorization" : token}})    
    }
    catch(err){
        console.log(err)
    }
}