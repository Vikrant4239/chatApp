async function signup(e){
    try{
         e.preventDefault();
 
         const signupdetails={
             nam: e.target.nam.value,
             email:e.target.email.value,
             Phonenumber:e.target.Phonenumber.value,
             password:e.target.password.value
           }
       console.log(signupdetails);    
     const response= await axios.post("http://localhost:4000/users/signup", signupdetails)
     if(response.status==201){
      window.location.href="./login.html"
      alert("Successfully signed in");
 
     }
     else if(response.status==401){
     alert("User already exists, Please Login");
     // console.log(response.data.message);
     }
     else{
        throw new Error('failed to login')
     }
         }
         catch(err){
          console.log(err);
          document.body.innerHTML=`<div style="color:red;">${err.data.message} <div>`
     }
 }