const message=document.getElementById('messages');
const sendbtn=document.getElementById('sendbtn')
const form=document.getElementById('form')
const messagecls=document.getElementsByClassName('messagecls')


window.addEventListener('DOMContentLoaded',()=>{
    var flag=true;
    setInterval( async () => {
        const token=localStorage.getItem('token');
        const response= await  axios.get(`http://localhost:3000/message/getmessage`,{headers:{"Authorization" : token}})
        let myarr = response.data;
        
        if(myarr.length>messagecls.length){
            if(flag==true){
                for (let i = 0; i < myarr.length; i++) {
                    const message=myarr[i].Message;
                    const username=myarr[i].user.Name;
                  createmessage(username,message);
                  flag=false;
                }
            }
            else{
                const message=myarr[myarr.length-1].Message;
                    const username=myarr[myarr.length-1].user.Name;
                  createmessage(username,message);
            }
            
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
        const decodeToken=parseJwt(token)
        console.log(decodeToken)
        createmessage(`${decodeToken.name}`,`${message}`)
        form.reset();
        const response= await  axios.post(`http://localhost:3000/message/postmessage`,{message},{headers:{"Authorization" : token}})
        
            console.log(response);
        

    }
    catch(err){
        console.log(err)
    }
}