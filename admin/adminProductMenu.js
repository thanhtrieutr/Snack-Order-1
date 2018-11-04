//loadProduct function for initialize product list
function loadProduct() {
  //Using utilities variable from admin.js
  productRank = 0;
  var choiceList = document.getElementsByClassName("choice");
  for (var i = 0; i < choiceList.length; i++) {
      choiceList[i].className = choiceList[i].className.replace(" is-active", "");
  }
  var currentChoice = document.getElementById("product");
  currentChoice.className = currentChoice.className + " is-active";
  //Calling removeAll funnction from admin.js
  removeAll();
  //Send request to admin API server to fetch product data
  //Promise sector
  var loadProducts = new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:3000/admin-controller/get-products", true);
      var obj = {};
      obj.token = localStorage.getItem("token");
      http.send(JSON.stringify(obj));
      http.onload = () => resolve(http.response);
      http.onerror = () => reject(http.response);
  });

  //If success then send back data to client side
  loadProducts.then((response) => {
      //Parsing response information and placing it into product detail information
      var listProduct = JSON.parse(response);
      var contentContainer = document.getElementById("product-content");
      if (contentContainer.style.display == "none" || contentContainer.style.display == "") {
          contentContainer.style.display = "block";
      }
      listProduct.forEach(product => {
          var newProduct = createNewProduct(product, product._id);
          contentContainer.appendChild(newProduct);
      });
      document.getElementById("user-content").style.display = "none";
  }).catch((error) => {
      //Calling alertError function from utilityFunction.js
      alertError(error);
  });
}

//Function create new modal to check product information with product database
function createNewProduct(product, currentID) {
  productRank++;
  //Initializing product detail information element
  var newProduct = document.createElement('div');
  var productDetail = document.createElement('div');
  productDetail.innerHTML = 
  `<div id="display-container" onclick="showModal('product-detail-${productRank}', 'product-detail-label')">
      <table class="table is-fullwidth">
          <td class="display-item" style="width: 60%;">${product.name}</td>
          <td id="dynamic-price" class="display-item" style="width: 40%;">${product.price}</td>
      </table>
  </div>`
  //Creating new modal box element of product
  var productTable = document.createElement('div');
  productTable.innerHTML = 
  `<div id="product-detail-${productRank}" class="modal">
       <div class= "columns is-mobile">
          <div class="modal-background"></div>
          <div class="modal-card ">
              <header class="modal-card-head">
                  <p class="modal-card-title"> <b> Product Information </b> </p>
              </header>
              <section class="modal-card-body">
              <div class="columns">
              <div id="product-picture" class="column is-5">
                  <div id="product-description"> <u> <b> Product Image </b> </u> </div>
                  <div id="product-border-box">
                      <img id="product-img-${productRank}" class="product" src=${product.img} alt="Product Image">
                      <input type="file" id="edit-product-image-${productRank}" data-id="${currentID}" onchange="submitImage('${productRank}')">  
                  </div>
              </div>
              <div id="product-detail-information" class="column is-7">
                  <div id="product-description"> <u> <b> Product Details </b> </u> </div>
                  <div id="product-information-box" class="is-multiline">
                      <div id="product-information" class="columns is-mobile">
                          <label class="name column is-3"> <b>Name: </b> </label>
                          <p id="product-name" class="text column is-9" > ${product.name} </p>
                      </div>  
                      <div id="product-information" class="columns is-mobile">
                          <label class="name column is-3"> <b> Price: </b> </label>
                          <input id="product-price-${productRank}" class="text column is-7" data-id="${currentID}" value="${product.price}" onkeypress="checkEnterKey(event, '${productRank}')" disabled> </input>
                      </div>  
                  </div>           
              </section>
              <footer class="modal-card-foot">
                  <div class="columns is-mobile is-multiline">
                  <button class="button column is-12-mobile" id="edit-mode-${productRank}" onclick="editMode('${productRank}')"> <b> Edit Product </b> </button>
                  <button class="button column is-12-mobile" id="show-mode-${productRank}" onclick="showMode('${productRank}')" disabled> <b> Save Info  </b> </button>
                  <button id="cancel-edit" class="button column is-12-mobile" onclick="closeModal('product-detail-${productRank}', 'product-detail-label');defaultInputStatus('${productRank}')"> <b> Close </b> </button>
                  </div>
              </footer>
          </div>
      </div>
  </div>`
  newProduct.appendChild(productDetail);
  newProduct.appendChild(productTable);
  return newProduct;
}