
export function fetchProductById(id) {
  //TODO:we will not hard code server url here
  return new Promise(async(resolve) =>{
    if (!id) {
      throw new Error('Product ID is required');
    }
  const response=await fetch('/products/'+id)
  const data=await response.json()
  resolve({data})
  }
  );

}
export function createProduct(product) {
  //TODO:we will not hard code server url here
  return new Promise(async(resolve) =>{
  const response=await fetch('/products/',{
    method:"POST",
    body:JSON.stringify(product),
    headers:{"content-type":"application/json"}
  })
  const data=await response.json()
  resolve({data})
  }
  );

}
export function UpdateProduct(update) {
  return new Promise(async (resolve) => {
   
      const response = await fetch("/products/"+update.id, {
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
 export function fetchAllProductsByFilters(filter,sort,pagination,admin) {
 //filter={"category":"smartphone"}
 //sort={_sort:"price",_order="desc"}
 //pagination={_page:1,_limit=10}
 let queryString='';
 for(let key in filter){
    const CategoryValues=filter[key]; //[grocieris,beauty]
    if(CategoryValues.length){
    const lastCategoryValue=CategoryValues[CategoryValues.length-1]//beauty
    queryString +=`${key}=${lastCategoryValue}&`
 }
}
for(let key in sort){
queryString +=`${key}=${sort[key]}&`
}
console.log(pagination)
for(let key in pagination){
  queryString +=`${key}=${pagination[key]}&`
  }
  if(admin){
    queryString +=`admin=true`
  }
  return new Promise(async(resolve) =>{
  const response=await fetch("/products?"+queryString)
  const data=await response.json()
  const totalItems= response.headers.get("X-Total-Count");
  resolve({data:{products:data,totalItems:+totalItems}})
  }
  );

}
 export function fetchBrand() {
  //TODO:we will not hard code server url here
  return new Promise(async(resolve) =>{
  const response=await fetch("/brand")
  const data=await response.json()
  resolve({data})
  }
  );
}
 export function fetchCategory() {
    //TODO:we will not hard code server url here
    return new Promise(async(resolve) =>{
    const response=await fetch("/category")
    const data=await response.json()
    resolve({data})
    }
    );
  }
