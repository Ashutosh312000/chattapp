const settings=document.getElementById('settings');
const section2=document.getElementById('section2');
const section3=document.getElementById('section3');
const makegroup=document.getElementById('makegroup');
const chatnames=document.getElementById('chatnames');
const chatnameh3=document.getElementById('chatnameh3');
const makinggroups=document.getElementById('makinggroups');
const closegroup=document.getElementById('closegroup');
const closesettings=document.getElementById('closesettings');


settings.addEventListener('click',(e)=>{
    section3.style.display=='none'
    if(section3.style.display=='none'){
        section2.className='col-xl-6 border border-5 rounded border-primary'
         section3.style.display='block'
    }
    else{
        section2.className='col-xl-9 border border-5 rounded border-primary'
        section3.style.display='none'
    }
    
})

makegroup.addEventListener('click',(e)=>{
    chatnames.style.display='none'
    makinggroups.style.display='block'
    
})
closegroup.addEventListener('click',(e)=>{
    chatnames.style.display='block'
    makinggroups.style.display='none'
    
})
closesettings.addEventListener('click',(e)=>{
    section3.style.display='none'
    section2.className='col-xl-9 border border-5 rounded border-primary'
})


































































const message=document.getElementById('messages');
const sendbtn=document.getElementById('sendbtn')
const form=document.getElementById('form')
const messagecls=document.getElementsByClassName('messagecls')
// const makegroup=document.getElementById('makegroup')
const groups=document.getElementById('groups')
const groupdatavalues=document.getElementsByClassName('addgroups');
const groupdatavalues1=document.getElementsByClassName('addgroups1');
const groupsubmitbtn=document.getElementById('groupsubmitbtn')
const groupsubmitbtn1=document.getElementById('groupsubmitbtn1')
const groupsinput=document.getElementById('groupsinput')
const alreadygroups1=document.getElementById('alreadygroups1')
const addmore=document.getElementById('addmore');
// const closegroup=document.getElementById('closegroup');
// const settings=document.getElementById('settings');
const groupdata=document.getElementsByClassName('addgroupsdiv')[0];
const admin=document.getElementById('admin')
const participantsdiv=document.getElementById('participantsdiv')
const addgroups1=document.getElementById('addgroups1')
// const closesettings=document.getElementById('closesettings')
const logout=document.getElementById('logout')
const leavegroup=document.getElementById('leavegroup')
const deletegroup=document.getElementById('deletegroup')
const type=document.getElementById('type')
const submitfile=document.getElementById('submitfile')



participantsdiv.addEventListener('click',async(e)=>{
    try{
        const token=localStorage.getItem('token');
        const currentgroup=localStorage.getItem('currentgroup')
        const value=e.target.parentElement.getAttribute('value');
        if(e.target.className=='remove_btn'){ 
            const alert1 = confirm("Are you sure want to Kick?");
            if(alert1==true){
                const response= await  axios.put(`http://localhost:3000/admin/deleteparticipants`,{currentgroup,value},{headers:{"Authorization" : token}})
                alert(response.data.message)
            }
           
        }
        if(e.target.className=='makeadmin_btn'){
            const alert1 = confirm("Are you sure want to Make Admin?");
            if(alert1==true){
            const response= await  axios.put(`http://localhost:3000/admin/makeparticipants`,{currentgroup,value},{headers:{"Authorization" : token}})
            alert(response.data.message)
            }
        }
        if(e.target.className=='removeadmin'){
            const alert1 = confirm("Are you sure want to remove a Admin?");
            if(alert1==true){
            const response= await  axios.put(`http://localhost:3000/admin/deleteasadmin`,{currentgroup,value},{headers:{"Authorization" : token}})
            alert(response.data.message)
            }
        }
    }
    catch(err){
        throw new Error(err)
    }
   
})


addmore.addEventListener('click',()=>{

    const addgroupsdiv1=document.createElement('div');
    addgroupsdiv1.className='addgroupsdiv';
    groups.insertBefore(addgroupsdiv1,addmore);

    const input1=document.createElement('input')
    input1.setAttribute('type','text')
    input1.setAttribute('name','groupdata')
    input1.setAttribute('placeholder','Email,Phone-No.')
    input1.className='addgroups';
    addgroupsdiv1.appendChild(input1)

    const removebtn1=document.createElement('button')
    removebtn1.innerText='X';
    removebtn1.className='removebtn'
    addgroupsdiv1.appendChild(removebtn1)

})

groups.addEventListener('click',(e)=>{
    if(e.target.className=='removebtn'){
        e.target.parentElement.remove();
    }
})

closegroup.addEventListener('click',(e)=>{
    groups.style.display='none'
    makegroup.style.display='block'
})






logout.addEventListener('click',()=>{
    const response = confirm("Are you sure want to Logout?");

    if (response) {
        window.localStorage.clear();
        window.location.href="../loginpage/login.html"
    }

})

leavegroup.addEventListener('click',async (e)=>{
    const alert1 = confirm("Are you sure want to Leave Group?");
    if(alert1==true){
        const groupid=localStorage.getItem('currentgroup');
        const token=localStorage.getItem('token');
        const response= await  axios.put(`http://localhost:3000/admin/leavegroup`,{groupid},{headers:{"Authorization" : token}})
        alert(response.data.message)
       if(response.status==200){
        window.location.reload()
       }
    }
   
   
})
deletegroup.addEventListener('click',async (e)=>{
    const alert1 = confirm("Are you sure want to delete Group?");
    if(alert1==true){
    const groupid=localStorage.getItem('currentgroup');
    const token=localStorage.getItem('token');
    const response= await  axios.put(`http://localhost:3000/admin/deletegroup`,{groupid},{headers:{"Authorization" : token}})
              
    alert(response.data.message)
    if(response.status==200){
        window.location.reload()
    }
}
})









alreadygroups1.addEventListener('click',async(e)=>{

    if(e.target.className=='groupdiv'){
      const groupid=e.target.getAttribute('value');
        localStorage.setItem('currentgroup',`${groupid}`)
       
        settings.style.display='inline-block'
        type.style.display='flex'
        
      let messages=[];
      stringifiedmessages=JSON.stringify(messages)
      localStorage.setItem('messages',stringifiedmessages)
        clearInterval(refreshIntervalId1)
      var refreshIntervalId1 = setInterval( async () => {
       
          const messagesstringified=localStorage.getItem('messages');
          const messages=JSON.parse(messagesstringified)
  
          if(messages.length==0){
              lastmessageid=-1;
          }
          else{
              lastmessageid=messages[messages.length -1].id;
          }
  
          const token=localStorage.getItem('token');
          const currentgroup=localStorage.getItem('currentgroup')
          const response= await  axios.get(`http://localhost:3000/message/getmessage?lastmessageid=${lastmessageid}&groupid=${currentgroup}`,{headers:{"Authorization" : token}})
          
          
          let myarr = response.data;
        
         for(let i=0;i<myarr.length;i++){
          messages.push({Message:response.data[i].Message,username:response.data[i].user.Name,id:response.data[i].id,isLink:response.data[i].IsLink,filetype:response.data[i].filetype})
          if(messages.length>15){
              messages.shift();
          }
         }
  
         
         const messagesstringifiedagain=JSON.stringify(messages)
         localStorage.setItem('messages',`${messagesstringifiedagain}`)
          
         message.innerHTML='';
                  for (let i = 0; i < messages.length; i++) {
                      const message=messages[i].Message;
                      const username=messages[i].username;
                      const filetype=messages[i].filetype;
                      if(messages[i].isLink==true){
                        console.log('bye')
                        createLink(username,message,filetype)
                      }
                      else{
                        createmessage(username,message);
                      }
                    
                  }    



                  let admininfo=[]
                  stringifiedadmininfo=JSON.stringify(admininfo)
                  localStorage.setItem('admininfo',stringifiedadmininfo)
                 const admindetails= await  axios.get(`http://localhost:3000/message/getadmin?groupid=${currentgroup}`,{headers:{"Authorization" : token}})
                 
                  groupusers=admindetails.data[0].users
                 
                  for(let i=0;i<groupusers.length;i++){
                    admininfo.push({isAdmin:groupusers[i].usergroup.isAdmin,username:groupusers[i].Name,id:groupusers[i].id})
                   }
                   stringifiedadmininfo=JSON.stringify(admininfo)
                   localStorage.setItem('admininfo',stringifiedadmininfo)
                   
                   
                   
                   participantsdiv.innerHTML='';
                  for (let i = 0; i < admininfo.length; i++) {
                      const id=admininfo[i].id;
                      const username=admininfo[i].username;
                      const isAdmin=admininfo[i].isAdmin;
                      createsettings(username,id,isAdmin);
                  }    
        

      }, 1000);
    

       
        
    }

})

groupsubmitbtn.addEventListener('click',async()=>{
    try{
    const participantsdetails=[]
    const groupname=groupsinput.value
    for(let i=0;i<groupdatavalues.length;i++){
        if(groupdatavalues[i].value!=""){
        participantsdetails.push(groupdatavalues[i].value) ;
        }
        }
    const token=localStorage.getItem('token');
    const response= await  axios.post(`http://localhost:3000/group/postgroup`,{participantsdetails,groupname},{headers:{"Authorization" : token}})
   if(response.status==201){
    
    creategroup(response.data.group)
    alert(response.data.message)
   }
   else if(response.status==202){
    alert(response.data.message)
   }
}
catch(err){
    throw new Error(err)
}
}

)

groupsubmitbtn1.addEventListener('click',async()=>{
    try{
    const groupid=localStorage.getItem('currentgroup')
   const  participantsdetails=addgroups1.value
   
   
    const token=localStorage.getItem('token');
    const response= await  axios.post(`http://localhost:3000/admin/addAparticipant`,{participantsdetails,groupid},{headers:{"Authorization" : token}})
    addgroups1.value=''
    if(response.status==201){
        alert(response.data.message)
   }
   else if(response.status==202){
    alert(response.data.message)
   }
}
catch(err){
    throw new Error(err)
}
}

)


makegroup.addEventListener('click',async()=>{
    try{
    makegroup.style.display='none'
    groups.style.display='flex'
}

catch(err){
    throw new Error('Something went Wrong')
}
}
)





//as soon as user logged in you get all the chats of the user 
window.addEventListener('DOMContentLoaded',async ()=>{
    localStorage.setItem('currentgroup','')
    // let localgroups=[];
    // stringifiedmessages=JSON.stringify(localgroups)
    // localStorage.setItem('localgroups',stringifiedmessages)
    clearInterval(refreshIntervalId)
    var refreshIntervalId = setInterval( async () => {
        
        // const localgroupsstringified=localStorage.getItem('localgroups');
        // const localgroups=JSON.parse(localgroupsstringified)

        const token=localStorage.getItem('token');
        const decodetoken=parseJwt(token)
    const username=decodetoken.name;
    chatnameh3.innerText=`${username}`;
        const response= await  axios.get(`http://localhost:3000/group/getgroups`,{headers:{"Authorization" : token}})
        
        const groups=response.data
     

        // for(let i=0;i<groups.length;i++){
        //     localgroups.push({isAdmin:groupusers[i].usergroup.isAdmin,username:groupusers[i].Name,id:groupusers[i].id})
        //  }
        //  stringifiedlocalgroups=JSON.stringify(localgroups)
        //  localStorage.setItem('localgroups',stringifiedlocalgroups)
         
         
         
         alreadygroups1.innerHTML='';
      






       
        for(let i=0;i<groups.length;i++){
            creategroup(groups[i]);
        }
    
   
    

},1000)
})

//you show the group names in which current user is a participant(left box)
function creategroup(groups){

    const groupdiv=document.createElement('div')
    groupdiv.className='groupdiv';
    groupdiv.innerText=`${groups.GroupName}`
    alreadygroups1.appendChild(groupdiv)
    groupdiv.setAttribute('value',`${groups.id}`)

}

const createmessage=(by,text)=>{
    const token=localStorage.getItem('token');
    const decodetoken=parseJwt(token)
    const username=decodetoken.name;
    const messagediv=document.createElement('div');
    if(by==username){
        messagediv.className='messageclsR'
    }else{
        messagediv.className='messageclsL'
    }
   
    const messagep=document.createElement('p')
    messagep.textContent=`${by} : ${text}`
    messagediv.appendChild(messagep)
    message.appendChild(messagediv)
}

const createLink=(by,text,filetype)=>{
    const token=localStorage.getItem('token');
    const decodetoken=parseJwt(token)
    const username=decodetoken.name;
    console.log(filetype)
    const messagediv=document.createElement('div');
    if(by==username){
        messagediv.className='messageclsR'
        
    }else{
        messagediv.className='messageclsL'
    }
   
    if(filetype=='image'){
      
        const messagep=document.createElement('p')
        const messageimg=document.createElement('img')
        const messagea=document.createElement('a')
        messagea.setAttribute('href',`${text}`)
        messagea.setAttribute('target',`_blank`)
        messageimg.setAttribute('width','130')
        messageimg.setAttribute('height','130')
        messageimg.setAttribute('src',`${text}`)
        messagep.textContent=`${by}`
        messagep.appendChild(messagea)
        messagea.appendChild(messageimg)
        messagediv.appendChild(messagep)
        message.appendChild(messagediv)
    }
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

const fileform = document.getElementById('uploadForm')
fileform.addEventListener('submit', async function (e) {
  e.preventDefault();
  const token=localStorage.getItem('token');
  const groupId=localStorage.getItem('currentgroup');
  let formData = new FormData(fileform)
  let response = await axios.post(`http://localhost:3000/message/postfile/${groupId}`, formData, { headers: { "Authorization": token, "Content-Type": "multipart/form-data" } });
  let data = response.data
  console.log(data)
//   let chatData = []
//   chatData.push(data)
//   showFileOnScreen(chatData);
//   alert('File uploaded and sent successfully!')
})




function createsettings(username,id,isAdmin){
    
    
    
    const div=document.createElement('div')
    div.className='participantsinfo';
    div.setAttribute('value',`${id}`)
    participantsdiv.appendChild(div);

    const h4=document.createElement('h4');
    h4.innerText=`${username}`
    div.appendChild(h4)
    
   
    const remove_btn=document.createElement('button');
    remove_btn.className='remove_btn';
    remove_btn.innerText='Kick'
    div.appendChild(remove_btn);
    

    if(isAdmin!=true){
    const makeadmin_btn=document.createElement('button');
    makeadmin_btn.className='makeadmin_btn';
    makeadmin_btn.innerText='+'
    div.appendChild(makeadmin_btn);
    }


    if(isAdmin==true){
        const Admin=document.createElement('h4')
        Admin.innerText='ADMIN'
        Admin.className='admintext';
        div.appendChild(Admin)

        const removeadmin=document.createElement('button')
        removeadmin.innerText='Remove From Admin'
        removeadmin.className='removeadmin';
        div.appendChild(removeadmin)
    }
    

}






