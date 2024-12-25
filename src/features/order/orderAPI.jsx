export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3001/orders',{
      method:'POST',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    //Todo:on server it will only return some info of user(not password)
    resolve({data})
  }
  );
}


export function fetchAllOrders(pagination) {
  //TODO:Multiple Select Categories from Backend
  let queryString = "";
  

for(let key in pagination){
  queryString+=`${key}=${pagination[key]}&`
}

  return new Promise(async (resolve) => {
    console.log(queryString)
    const response = await fetch(
      "http://localhost:3001/orders?" + queryString
    );
    const order = await response.json();
    const totalOrders=order.items;
    const data=order.data
    resolve({ data: { order: data,totalOrders:totalOrders}});
  });
}


export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3001/orders/'+order.id,{
      method:'PATCH',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    //Todo:on server it will only return some info of user(not password)
    resolve({data})
  }
  );
}