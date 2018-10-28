

function loadNewProductData(currentID) {
  adminGetProductInfo(function (result) {
      showNewProductData(result, currentID);
  }); 
}

function adminGetProductInfo(callback) {
  var http = new XMLHttpRequest();
  http.open('POST', "http://127.0.0.1:3000/admin/products");
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

function sendNewProductPrice(result, currentID) {
  var http = new XMLHttpRequest();
  http.open('POST', "http://127.0.0.1:3000/admin/update-product", true);
  http.send(JSON.stringify(result));
  http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var result = this.response;
          alert("Update info successful");
          loadNewProductData(currentID);
      }
      if (this.readyState == 4 && this.status != 200)
          alertError(this.response);
  };
}

function submitImage(currentID) {
  var image = document.getElementById("edit-product-image-"+currentID).files[0];
  var reader = new FileReader();
  reader.readAsDataURL(image);

  reader.onload = function () {
    var imageObject = {
        file: reader.result,
        fileName: image.name
    }
      var http = new XMLHttpRequest();
      var object = {        
          token: localStorage.getItem("token"),
          id: currentID,
          productImage: imageObject
      };
      http.open('POST', "http://127.0.0.1:3000/admin/update-product", true);
      http.send(JSON.stringify(object));
      http.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              if (this.response != "Wrong Data Input") {
                  alert("Update image successful");   
                  loadNewProductData(currentID);
              }
          }
          else if (this.readyState == 4 && this.status != 200) {
              alertError(this.response);
          }
      }
  };  
}

function checkPrice(productPrice){
if (productPrice == "" || productPrice == null || productPrice.length > 6) {
    return true; 
} 
if (isNaN(productPrice)) 
{
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
  var result = {}, validInput = true ;
  var newPrice = document.getElementById("product-price-"+currentID).value;
  if (checkPrice(newPrice) || newPrice == "") {
      validInput = false;
      alert("Not valid price/Empty value");
      return;
  } else {
      result.token = localStorage.getItem("token");
      result.id = currentID;
      result.productPrice = newPrice;
  }
  if (validInput) {
      document.getElementById("product-price-"+currentID).disabled = true;
      document.getElementById("edit-mode-"+currentID).disabled = false;
      document.getElementById("show-mode-"+currentID).disabled = true;  
      sendNewProductPrice(result, currentID);
  } else {
      loadNewProductData(currentID); 
  }
}

function defaultInputStatus (currentID) {
    document.getElementById("product-price-"+ currentID).disabled = true;
    document.getElementById("edit-mode-"+ currentID).disabled = false;
    document.getElementById("show-mode-"+ currentID).disabled = true;
}

function showNewProductData(result, currentID) {
  var position;
  for (var i=0; i<result.length; ++i) {
      if (currentID == result[i]._id) {
          position = i;
      }
  }
  var priceDisplay = document.getElementById("product-price-" + currentID);
  var newProductImage = document.getElementById("product-img-" + currentID);
  newProductImage.setAttribute("src", result[position].img);
  priceDisplay.value = result[position].price;
  
}


