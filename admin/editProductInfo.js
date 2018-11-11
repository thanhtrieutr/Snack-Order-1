function loadNewProductData(currentID, trueID) {
  adminGetProductInfo(function (result) {
      showNewProductData(result, currentID, trueID);
  }); 
}

function adminGetProductInfo(callback) {
  var http = new XMLHttpRequest();
  http.open('POST', "http://127.0.0.1:3000/admin-controller/get-products");
  var obj = {};
  obj.token = localStorage.getItem("token");
  http.send(JSON.stringify(obj));
  http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var result = JSON.parse(this.response);
          if (callback) callback(result);
      }
      if (this.readyState == 4 && this.status != 200)
          console.log(this.response);
  };
}

function sendNewProductPrice(result, currentID, trueID) 
  var http = new XMLHttpRequest();
  http.open('POST', "http://127.0.0.1:3000/admin-controller/update-product/price", true);
  http.setRequestHeader("token", localStorage.getItem("token"));
  http.send(JSON.stringify(result));
  http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var result = this.response;
          alert("Update info successful");
          loadNewProductData(currentID, trueID);
      }
      if (this.readyState == 4 && this.status != 200)
          alertError(this.response);
  };
}

function submitImage(currentID) { 
    var image = document.getElementById("edit-product-image-"+currentID).files[0];
    var trueImageID = document.getElementById("edit-product-image-"+currentID).getAttribute("data-id");
    var productImageForm = document.getElementById("image-upload-"+currentID);
    var updatedImageData = new FormData(productImageForm);
    updatedImageData.append("file", image);
    updatedImageData.append("productID", trueImageID);
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/admin-controller/update-product/image", true);
    http.setRequestHeader("token", localStorage.getItem("token"));
    http.send(updatedImageData);
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response != "Wrong Data Input") {
                alert("Update image successful");   
                loadNewProductData(currentID, trueImageID);
            }
        }
        else if (this.readyState == 4 && this.status != 200) {
            alertError(this.response);
        }
    }
}

function checkPrice(productPrice){
    if (productPrice == "" || productPrice == null || productPrice.length > 6) {
        return true; 
    } 
    if (isNaN(productPrice)) {
        return true
    }
    return false;
}

function editMode (currentID){
  document.getElementById("product-price-"+currentID).disabled = false;
  document.getElementById("edit-mode-"+currentID).disabled = true;
  document.getElementById("show-mode-"+currentID).disabled =false;
}

function showMode (currentID){
  var result = {};
  var validInput = true ;
  var trueProductID = document.getElementById("product-price-"+currentID).getAttribute("data-id");
  var newPrice = document.getElementById("product-price-"+currentID).value;
  if (checkPrice(newPrice) || newPrice == "") {
      validInput = false;
      alert("Not valid price/Empty value");
      return;
  } else {
      result.token = 
      result.id = trueProductID;
      result.productPrice = newPrice;
  }
  if (validInput) {
      document.getElementById("product-price-"+currentID).disabled = true;
      document.getElementById("edit-mode-"+currentID).disabled = false;
      document.getElementById("show-mode-"+currentID).disabled = true;  
      sendNewProductPrice(result, currentID, trueProductID);
  } else {
      loadNewProductData(currentID, trueProductID); 
  }
}

function checkEnterKey(event, currentID) {
    if (event.keyCode == 13) {
        showMode(currentID);
    }
  }
  

function defaultInputStatus (currentID) {
    var trueModalID = document.getElementById("product-price-"+currentID).getAttribute("data-id");
    loadNewProductData(currentID, trueModalID); 
    document.getElementById("product-price-"+ currentID).disabled = true;
    document.getElementById("edit-mode-"+ currentID).disabled = false;
    document.getElementById("show-mode-"+ currentID).disabled = true;
}

function showNewProductData(result, currentID, trueID) {
  var position;
  for (var i=0; i<result.length; ++i) {
      if (trueID == result[i]._id) {
          position = i;
      }
  }
  document.getElementById("dynamic-price-"+currentID).innerHTML = displayPrice(result[position].price);
  var priceDisplay = document.getElementById("product-price-" + currentID);
  var newProductImage = document.getElementById("product-img-" + currentID);
  newProductImage.setAttribute("src", result[position].img);
  priceDisplay.value = displayPrice(result[position].price);
}


