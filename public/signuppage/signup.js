const form=document.getElementById('form')
async function  signup(e){
    try{
     e.preventDefault();
    const name=e.target.name.value;
    const phoneno=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    
    form.reset();

    let userdetails={
        name:name,
        email:email,
        phoneno:phoneno,
        password:password
    }

    axios.post('http://127.0.0.1:3000/user/signup',{userdetails})
    .then((response)=>{
        alert(`${response.data.message}`);
    })
    .catch(err=>console.log(err));

    }
    catch(err){
        console.log(err);
    }
    
}