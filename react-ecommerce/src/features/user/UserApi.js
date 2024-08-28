// A mock function to mimic making an async request for data
export function fetchLoggedInOrder() {
  return new Promise(async(resolve,reject) =>{
  const response=await fetch("/orders/own/")
  if(response.ok){
    const data=await response.json();
    resolve({data})
  }
  else{
    const error=await response.json();
    reject(error)
  }
  
  }
  );
}
export function fetchLoggedInUser() {
  return new Promise(async(resolve) =>{
  const response=await fetch("/users/own")
  const data=await response.json()
  resolve({data})
  }
  );
}
export function UpdateUser(update) {
  return new Promise(async (resolve, reject) => {
    
      const response = await fetch("/users/"+update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      resolve({ data });
      
      
  
})}