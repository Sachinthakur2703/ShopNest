export function addToCart(item) {
  return new Promise(async (resolve) => {
   
      const response = await fetch("/cart", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      resolve({ data });
    
  });
}
export function fetchItemsByUserId() {
  //TODO:we will not hard code server url here
  return new Promise(async(resolve) =>{
  const response=await fetch(`/cart`)
  const data=await response.json()
resolve({data})
  }
  );

}

export function UpdateCart(update) {
  return new Promise(async (resolve) => {
   
      const response = await fetch("/cart/"+update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      resolve({ data });
    
  });
}
export function DeleteCart(itemId) {
  return new Promise(async (resolve) => {
   
      const response = await fetch(`/cart/${itemId} `,{
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      resolve({data:{id:itemId}});
    
  });
}
export   function ResetCart(userId) {
  return new Promise(async (resolve) => {
  //get all items of user's cart and then delete each
  const response=await fetchItemsByUserId()
  const items=response.data;
  for (let item of items){
    await DeleteCart(item.id)
  }
  resolve({status:"success"})
})
}


