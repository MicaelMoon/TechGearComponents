class product{
    constructor(id, name, description, image){
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
    this.cartAmount = 1
    this.stackPrice = price*cartAmount;
    }
};

//localStorage.clear()
let costumer = {
    shopingCart : getCart()
}

let productArray = createProducts();

if(document.body.id === 'offersBody'){
    loadProductsInShop();  
}
else if(document.body.id === 'shopingCartBody'){
    loadCart();
}

//Load ShopingCart
function loadCart(){
    let firstElementAdded = false

    let totalPrice = 0
    let totalPriceText = document.getElementById('totalPrice')

    console.log('cart = ',costumer.shopingCart)

    costumer.shopingCart.forEach(cartItem =>{
        let container = document.getElementById('productsContainer')

        let row = document.createElement('div')
        if(firstElementAdded){//Sets a margin on the element at the top of the page
            row.className = "row"
        }
        else{
            row.className = "row firstElement"
        }
        container.appendChild(row)

        let col1 = document.createElement('div')
        col1.id='cartImageCol'
        col1.className = "col"

        let col2 = document.createElement('div')
        col2.className = "col"

        row.appendChild(col1)
        row.appendChild(col2)

        //Image
        let productImage = document.createElement('img')
        productImage.id = 'cartImage'
        productImage.className = "productImg"
        productImage.src = "Images/" + cartItem.image + ".png"

        //Name
        let productName = document.createElement('p')
        productName.className = 'allText'
        productName.textContent = cartItem.name
        productName.id = cartItem.name

        //Stack amount
        let amount = document.createElement('p')
        amount.id = cartItem.name+' amount'
        amount.className = 'allText'
        amount.textContent = cartItem.cartAmount+' stack'

        //Price
        let priceAPiece = document.createElement('p')
        priceAPiece.id = cartItem.name+' priceAPiece'
        priceAPiece.className = 'allText'
        priceAPiece.textContent = '$'+cartItem.price

        //Stack price
        cartItem.stackPrice = cartItem.price * cartItem.cartAmount
        let combinedPrice = document.createElement('p')
        combinedPrice.id = cartItem.name+' stackPrice'
        combinedPrice.className = 'allText'
        combinedPrice.textContent = 'Stack price: $'+ cartItem.stackPrice.toFixed(2)


        col1.appendChild(productImage)
        col2.appendChild(productName)
        col2.appendChild(amount)
        col2.appendChild(priceAPiece)
        col2.appendChild(combinedPrice)

        let line = document.createElement('hr')
        line.className = "lineBreak "
        container.appendChild(line)

        firstElementAdded = true

        totalPrice +=cartItem.stackPrice
        totalPriceText.textContent = 'Total cost: $'+totalPrice.toFixed(2)
    })

    if(costumer.shopingCart.length<1){
        document.getElementById('buyBtn').style.visibility = 'hidden'
    }
    else{
        document.getElementById('buyDiv').className = ''
    }
}

//Load Shop
function loadProductsInShop(){
    let firstElement = false
    productArray.forEach(function(product){
        let row = document.createElement('div')
        if(firstElement){
            row.className = "row"
        }
        else{
            row.className = "row firstElement"
        }
        document.body.appendChild(row)

        let col1 = document.createElement('div')
        col1.className = "col"

        let col2 = document.createElement('div')
        col2.className = "col"
        
        row.appendChild(col1)
        row.appendChild(col2)


        var productImage = document.createElement('img')
        productImage.className = "productImg"
        productImage.src = "Images/" + product.image + ".png"
        
        var name = document.createElement('a')
        name.className = "allText ",
        name.textContent = product.name

        let productDescription = document.createElement('p')
        productDescription.className = "allText "
        productDescription.innerText = product.description

        let price = document.createElement('p')
        price.className = "allText "
        price.textContent = '$'+product.price

        let buyBtn = document.createElement('button')
        buyBtn.textContent = 'Buy '+ product.name
        buyBtn.classList =( name, 'productBtn') //Maybe not needed
        buyBtn.innerText = "Add to cart"
        buyBtn.onclick = function(){
            let productToAdd = costumer.shopingCart.find(p=>p.name === product.name)

            if(productToAdd){ //product exists in cart
               productToAdd.cartAmount+=1
               alert(product.name + 'was added to cart')
               console.log('Increased the amount. '+productToAdd.cartAmount)
            }
            else{ //product doesn't exist in art

                costumer.shopingCart.push(product)

                alert(product.name + 'was added to cart')
                console.log('Added', product.name,'to cart')
            }

            localStorage.setItem('shoppingCart', JSON.stringify(costumer.shopingCart))
        }

        col1.appendChild(productImage)
        col2.appendChild(name)
        col2.appendChild(productDescription)
        col2.appendChild(price)
        col2.appendChild(buyBtn)

        let line = document.createElement('hr')
        line.className = "lineBreak "
        document.body.appendChild(line)

        firstElement = true
    });
};

function getCart(){
    let updatedCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
    return updatedCart
}

function createProducts() {
    
    return [
        {
            name: "High-Performance Graphics Card",
            description: "Experience stunning visuals and exceptional performance with our latest graphics cards, perfect for gamers and professionals alike.",
            category: "Graphics Card",
            price: 699.99,
            cartAmount: 1,
            image: "GraficCard",
        },
        {
            name: "Durable Motherboard",
            description: "Our motherboards are designed for stability and durability, ensuring your PC runs smoothly under any conditions.",
            category: "Motherboard",
            price: 199.99,
            cartAmount: 1,
            image:"MotherBoard",
        },
        {
            name: "Efficient Power Supply Unit",
            description: "Keep your system powered with our efficient and reliable power supply units, built to ensure consistent performance.",
            category: "Power Supply",
            price: 129.99,
            cartAmount: 1,
            image:"PowerSupply",
        }
    ];
};

document.addEventListener('DOMContentLoaded', function() {
    var buyBtn = document.getElementById('buyBtn');
    if (buyBtn) {
        buyBtn.onclick = function() {
            alert('Purchase successful.');
            window.location.href = 'shopingCart.html';
            localStorage.clear();
        };
    }
});
