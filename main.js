const productList = [
    {id:1, nombre:"Iphone X", precio:500, stock:10},
    {id:2, nombre:"Iphone 11", precio:550, stock:10},
    {id:3, nombre:"Iphone 12", precio:600, stock:10},
    {id:4, nombre:"Iphone 13", precio:750, stock:10},
    {id:5, nombre:"Iphone 14", precio:850, stock:10},
]

productList.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <h2>${item.nombre}</h2>
    <p>Precio ${item.precio}<p>
    <button id="boton${item.id}">Agregar</button>
    <br/>`;

    document.body.append(div);
    
    let button = document.getElementById(`boton${item.id}`)
    button.addEventListener("click", () => add(item.id))
});

let divCart = document.createElement("div");
    divCart.innerHTML = `<h1>Carrito:</h1>`;
    document.body.append(divCart);

let divDelete = document.createElement("div");
    divDelete.innerHTML = `<button>Eliminar carrito</button>`;
    document.body.append(divDelete)

    divDelete.addEventListener("click", () => {
        localStorage.clear();
        location.reload()
    });

const saveLocal = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
};

let cart = []

let cartStorage = JSON.parse(localStorage.getItem("cart"))

if(cartStorage){
    cart = cartStorage

    cart.forEach((item) => {
       let div = document.createElement("div");
       div.innerHTML = `
       <h2>${item.nombre}</h2>
       <p>Precio ${item.precio}<p>
       <br/>`;
   
       document.body.append(div);
   });
   }else{
       let div = document.createElement("div");
       div.innerHTML = `<h2>No hay productos en el carrito</h2>`;
       document.body.append(div);
   }

const add = (id) => {
    let product = productList.find((item) => item.id === id);
    cart.push(product);
    saveLocal("cart", cart)
    location.reload()
    let div = document.createElement("div");
       div.innerHTML = `
       <h2>${product.nombre}</h2>
       <p>Precio ${product.precio}<p>
       <br/>`;
   
       document.body.append(div);
};