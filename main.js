const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const cartContainer = document.getElementById("cartContainer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    
    data.forEach((item) => {
        let content = document.createElement("div");
        content.className = "card"
        content.innerHTML = `
        <img src="${item.img}">
        <h2>${item.nombre}</h2>
        <p class="price">Precio: ${item.precio}$<p>`;
    
        shopContent.append(content);
        
        let button = document.createElement("button");
        button.innerText = "Agregar"
        button.className = "buyButton"
    
        content.append(button)
    
        button.addEventListener("click", () => {
            const repeated = cart.some((repeatedProduct) => repeatedProduct.id === item.id)
            if(repeated){
                cart.map((prod) => {
                    if(prod.id === item.id){
                        prod.cantidad++
                    };
                });
            }else{
                cart.push({
                    id: item.id,
                    img: item.img,
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad
                });
                console.log(cart);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    iconColor: 'white',
                    customClass: {
                      popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                  })
                  Toast.fire({
                    icon: 'success',
                    title: 'New prodcut added'
                  });
                saveLocal();
            };
        });
    });
};

getProducts();

const saveLocal = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const printCart = () => {
        cartContainer.innerHTML = "";
        cartContainer.style.display = "flex";
        const cartHeader = document.createElement("div");
        cartHeader.className = "cartHeader"
        cartHeader.innerHTML = `
        <h1 class="cartHeaderTitle">Cart<h1>
        `;
    
        cartContainer.append(cartHeader);
    
        const cartButton = document.createElement("h1");
        cartButton.innerText = "x";
        cartButton.className = "cartHeaderButton";
    
        cartButton.addEventListener("click", () => {
            cartContainer.style.display = "none"
        });
    
        cartHeader.append(cartButton);
    
        cart.forEach((item) => {
            let cartContent = document.createElement("div");
            cartContent.className = "cartContent";
            cartContent.innerHTML = `
            <img src="${item.img}">
            <h2>${item.nombre}</h2>
            <p>Precio: ${item.precio}$</p>
            <span class="subtract"> - </span>
            <p>Cantidad ${item.cantidad}</p>
            <span class="add"> + </span>
            <span class="delete-product"> X </span>`;
    
            cartContainer.append(cartContent);
            
            let subtract = cartContent.querySelector(".subtract");

            subtract.addEventListener("click", () => {
                if(item.cantidad > 1){
                    item.cantidad--;
                }
                saveLocal();
                printCart();
            });
            
            let add = cartContent.querySelector(".add");

            add.addEventListener("click", () => {
                item.cantidad++;
                saveLocal();
                printCart();
            });

            let remove = cartContent.querySelector(".delete-product");

            remove.addEventListener("click", () => {
                removeProduct(item.id);
            });
        });
        
        const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    
        const totalBuy = document.createElement("div")
        totalBuy.className = "totalContent"
        totalBuy.innerHTML = `Total a pagar: ${total}$`;
    
        cartContainer.append(totalBuy);
};

verCarrito.addEventListener("click", printCart);

const removeProduct = (id) => {
    const foundId = cart.find((el) => el.id === id);
    
    cart = cart.filter((cartId) => {
        return cartId !== foundId
    });
    saveLocal();
    printCart();
};