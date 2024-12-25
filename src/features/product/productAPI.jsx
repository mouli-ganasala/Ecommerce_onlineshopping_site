export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    console.log("API called");
    const response = await fetch("http://localhost:3001/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

// http://localhost:5173/product-detail/1

export function fetchProductsByFilters(filter, sort, pagination,search) {
  //TODO:Multiple Select Categories from Backend
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString +=
        categoryValues.map((value) => `${key}=${value}`).join("&") + "&";
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    console.log(queryString);
    const response = await fetch(
      "http://localhost:3001/products?" + queryString
    );
    const product = await response.json();
    console.log(product);
    const data = product.data;
    
    const totalItems = product.items;
    const filterProducts=data.filter((product)=>{
      const matchesBrand=!filter.brand || !filter.brand.length || filter.brand.includes(product.brand);
      const matchesSearch=!search || product.title.toLowerCase().includes(search.toLowerCase());
      return matchesBrand && matchesSearch;
    })
    resolve({ data: { products: data, totalItems: totalItems, filterProducts:filterProducts } });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3001/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3001/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //Todo:on server it will only return some info of user(not password)
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:3001/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    //Todo:on server it will only return some info of user(not password)
    resolve({ data });
  });
}
