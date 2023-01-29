

const message=document.getElementById('messages');
const sendbtn=document.getElementById('sendbtn')
const form=document.getElementById('form')
const messagecls=document.getElementsByClassName('messagecls')
const makegroup=document.getElementById('makegroup')
const groups=document.getElementById('groups')
const checkednames=document.getElementsByClassName('checkbox');
const groupsubmitbtn=document.getElementById('groupsubmitbtn')
const groupsinput=document.getElementById('groupsinput')
const alreadygroups=document.getElementById('alreadygroups')


alreadygroups.addEventListener('click',async(e)=>{

    if(e.target.className=='groupdiv'){
      const groupid= localStorage.getItem(`${e.target.innerText}`)
        localStorage.setItem('currentgroup',`${groupid}`)
    

        
      let messages=[];
      stringifiedmessages=JSON.stringify(messages)
      localStorage.setItem('messages',stringifiedmessages)
        clearInterval(refreshIntervalId)
      var refreshIntervalId = setInterval( async () => {
       
          const messagesstringified=localStorage.getItem('messages');
          const messages=JSON.parse(messagesstringified)
  
          if(messages.length==0){
              lastmessageid=-1;
          }
          else{
              lastmessageid=messages[messages.length -1].id;
          }
  
          const token=localStorage.getItem('token');
          currentgroup=localStorage.getItem('currentgroup')
          const response= await  axios.get(`http://localhost:3000/message/getmessage?lastmessageid=${lastmessageid}&groupid=${currentgroup}`,{headers:{"Authorization" : token}})
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
    }

})

groupsubmitbtn.addEventListener('click',async()=>{
    const participantsemail=[]
    const groupname=groupsinput.value
    for(let i=0;i<checkednames.length;i++){
        if(checkednames[i].checked==true){
            participantsemail.push(checkednames[i].value);
        }
    }
    const token=localStorage.getItem('token');
    const response= await  axios.post(`http://localhost:3000/group/postgroup`,{participantsemail,groupname},{headers:{"Authorization" : token}})
    creategroup(response.data.group)



    
   
}
)



makegroup.addEventListener('click',async()=>{
    try{

    makegroup.style.display='none'
    groups.style.display='flex'
    const token=localStorage.getItem('token');
    const response= await  axios.get(`http://localhost:3000/group/getparticipants`,{headers:{"Authorization" : token}})
    
    if(response.status==201){

        user=response.data;

        for(let i=0;i<user.length;i++){
            const useremail=user[i].Email;
            const username=user[i].Name;
    
            const participantsdiv=document.createElement('div')
            participantsdiv.className='participantsdiv'
            groups.insertBefore(participantsdiv,groupsubmitbtn)
    
            const label=document.createElement('label')
            label.className='label'
            label.setAttribute('for',`${username}`)
            label.innerText=`${username}`;
    
            const checkbox=document.createElement('input');
            checkbox.setAttribute('type','checkbox');
            checkbox.id=`${username}`;
            checkbox.className='checkbox'
            checkbox.setAttribute('value',`${useremail}`)
    
            participantsdiv.appendChild(label)
            participantsdiv.appendChild(checkbox)
    
    
        }
    }


}

catch(err){
    throw new Error('Something went Wrong')
}
}
)






window.addEventListener('DOMContentLoaded',async ()=>{
    
    let messages=[];
    stringifiedmessages=JSON.stringify(messages)
    localStorage.setItem('messages',stringifiedmessages)

        const token=localStorage.getItem('token');
        const response= await  axios.get(`http://localhost:3000/group/getgroups`,{headers:{"Authorization" : token}})
        
        const groups=response.data
        console.log(groups)
        for(let i=0;i<groups.length;i++){
            creategroup(groups[i]);
        }
    
   
    

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
        const currentgroup=localStorage.getItem('currentgroup');
        form.reset();
        const response= await  axios.post(`http://localhost:3000/message/postmessage`,{message,currentgroup},{headers:{"Authorization" : token}})    
    }
    catch(err){
        console.log(err)
    }
}

function creategroup(groups){

    const groupdiv=document.createElement('div')
    groupdiv.className='groupdiv';
    groupdiv.innerText=`${groups.GroupName}`
    alreadygroups.appendChild(groupdiv)
    localStorage.setItem(`${groups.GroupName}`,`${groups.id}`)

}



