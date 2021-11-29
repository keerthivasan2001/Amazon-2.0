

function getItems(){
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                rating: doc.data().rating,
                price: doc.data().price
            })
            console.log(items);
        });
        generateItems(items)
    });
}

function addToCart(item){
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                image: item.image,
                make: item.make,
                name: item.name,
                price: item.price,
                rating: item.rating,
                quantity: 1
            })
        }
    })
}

function generateItems(items) {
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-5");
        doc.innerHTML = `
        <div class="main-products">
        <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
          <img class="w-full h-full object-contain" src="${items.image}">
        </div>
        <div class="product-name text-gray-700 font-bold mt-2 text-sm">
           ${items.name}
        </div>
        <div class="product-make text-green-700 font-bold">
            ${items.make}
        </div>
        <div class="product rating text-yellow-300 font-bold my-1">
            ⭐⭐⭐⭐⭐ ${items.rating}
        </div>
        <div class="product-price font-bold text-gray-700">
            ${items.price}
        </div>
        <div class="hover:bg-yellow-600 rounded-full cursor-pointer text-md rounded text-white flex items-center justify-center h-8 w-28 bg-yellow-500">
            Add to cart
        </div>
        <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
            <img class="w-full h-full object-contain " src="${items.image}">
          </div>
          <div class="product-name text-gray-700 font-bold mt-2 text-sm">
          ${items.name}
          </div>
          <div class="product-make text-green-700 font-bold">
          ${items.make}
          </div>
          <div class="product rating text-yellow-300 font-bold my-1">
              ⭐⭐⭐⭐ ${items.rating}
          </div>
          <div class="product-price font-bold text-gray-700">
          ${items.price}
          </div>
          <div class="hover:bg-yellow-600 rounded-full cursor-pointer text-md rounded text-white flex items-center justify-center h-8 w-28 bg-yellow-500">
            Add to cart
        </div>
    </div>
        `

        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center");
        addToCartEl.innerText = "Add to cart";
        addToCartEl.addEventListener("click", function(){
            addToCart(item)
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".main-section-products").appendChild(doc);
    })
}

getItems();