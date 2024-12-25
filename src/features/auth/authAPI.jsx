export function createUser(userData) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3001/users',{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'},
      }) 
      const data = await response.json()
      //Todo:on server it will only return some info of user(not password)
      resolve({data})
    }
    );
  }


  export function checkUser(loginInfo) {
    const email=loginInfo.email;
    const password=loginInfo.password;

    return new Promise(async (resolve,reject) =>{
      const response = await fetch('http://localhost:3001/users?email='+email)
     const data= await response.json()
    
     if(data.length){
      if(password===data[0].password){//user is present in database
        resolve({data:data[0]});
      }else{
        reject({message:"Wrong credentials"})
      }
     }else{
      reject({message:"user not found"})
     }  
    }
    );
  }

  export function signOut(userId) {
    return new Promise(async (resolve) =>{
      resolve({data:"success"})
    }
    );
  }