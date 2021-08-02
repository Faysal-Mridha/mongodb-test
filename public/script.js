// ! this function for the load all of the mongodb data

const loadProducts = () => {
    fetch('/products')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const container = document.getElementById('products');
        container.innerHTML = '';
    
        data.forEach((product) => {
            const p = document.createElement('p');
            p.innerHTML = `Name : <b>${product.name} - Age : ${product.age} - Email : ${product.email} - Password : ${product.password}</b> Delete: <button onclick="deleteProduct('${product._id}')" >Delete</button> Update: <button onclick="updateProduct('${product._id}')">Update</button>`;
            container.append(p)
        })
    })
    .catch((err) => alert("There was a server side error"))
}

loadProducts();

// ! this function for the Delte product 
const deleteProduct = (id) => {
    console.log(id)
    fetch(`/product/${id}`,
        {method: 'DELETE'})
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })
        .catch((err) => console.log("Cant't delete product because There was a server side error"))
    location.reload();
};

// ! this function for the update product 

const updateProduct = (id) => {
    console.log(id)

    const update = document.getElementById('update');

    fetch(`/product/${id}`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })
        .catch((err) => console.log("Cant't delete product because There was a server side error"))
};