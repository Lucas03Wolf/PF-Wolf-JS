const listaProductos = [
    {id:1, nombre:"Iphone X", precio:500, stock:10},
    {id:2, nombre:"Iphone 11", precio:550, stock:10},
    {id:3, nombre:"Iphone 12", precio:600, stock:10},
    {id:4, nombre:"Iphone 13", precio:750, stock:10},
    {id:5, nombre:"Iphone 14", precio:850, stock:10}
]

const carrito = []

class llenarCarrito{
    constructor(objeto, cantidad){
        this.id = objeto.id
        this.nombre = objeto.nombre
        this.precio = objeto.precio
        this.stock = objeto.stock
        this.cantidad = cantidad
    }
}

const añadirProducto = (nombre, cantidad = 1) => {
    const producto = listaProductos.find(e => e.nombre === nombre)
    if(!producto){
        return "Ese producto no existe"
    }
    if(cantidad > producto.stock){
        return "No disponemos de stock suficiente para ese producto"
    }
    const productos = carrito.find(e => e.nombre === nombre)
    if(productos){
        productos.cantidad += cantidad
        productos.stock -= cantidad
    }
    else{
        producto.stock -= cantidad
        carrito.push(new llenarCarrito(producto, cantidad))
    }
    return carrito
}

let seleccion = prompt(`Hola desea comprar algún producto?`)

if(seleccion != "si" && seleccion != "no"){
    alert(`Por favor ingrese si o no`)
}else if(seleccion == "si"){
    alert(`A continucación nuestra lista de productos`)
    let todosLosProductos = listaProductos.map((producto) => `ID: ${producto.id} - ${producto.nombre} - ${producto.precio}$`);
    alert(todosLosProductos.join(" / "))

    while(seleccion === "si"){     
        let productoAComprar = prompt(`Agrega un producto a tu carrito`)
        let unidades = parseInt(prompt(`Cuantas unidades quiere llevar`))
        if(isNaN(unidades)){alert(`Ingrese un numero`)}
        seleccion = prompt(`Desea seguir comprando?`)
        console.log(añadirProducto(productoAComprar, unidades))
    }
    if(seleccion === "no"){
        alert("Gracias por tu compra!")
    }

}else if(seleccion == "no"){
    alert(`Gracias por venir, hasta pronto!`)
}