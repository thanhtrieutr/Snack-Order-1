//add product
function loadAddForm(){
  var choiceList = document.getElementsByClassName("choice");
  for (var i = 0; i < choiceList.length; i++) {
      choiceList[i].className = choiceList[i].className.replace(" is-active", "");
  }
  var currentChoice = document.getElementById("add-product");
  currentChoice.className = currentChoice.className + " is-active";
  removeAll();
  var inputField = inputNameField();
  document.getElementById("add-product-content").appendChild(inputField);
}

function checkValidProductName() {
  var check;
  var productName = document.getElementById("product-name").value;
  if (productName == "" || productName == null || productName.length > 40) {
      check = true;
  } 
  else {
      check = /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/.test(productName);
  }
  if (!check) {
      sendProductname(productName);
  } else {
      alert("Wrong product name");
  }
}

function sendProductname(productName) {
  var sendName = new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:3000/admin-controller/check-product-name", true);
      var obj = {};
      obj.token = localStorage.getItem("token");
      obj.productName = productName;
      http.send(JSON.stringify(obj));
      http.onload = () => resolve(http.response);
      http.onerror = () => reject(http.response);
  });
  
  sendName.then((response) => {
      if (response == "OK") {
          afterCheck();
      } 
      else {
          alert("Your new product already exist");
      }
  }).catch((error) => {
      alertError(error);
  });
}

function afterCheck() {
  var button = document.getElementById("submit-name-button");
  button.parentNode.removeChild(button);
  var productName = document.getElementById("product-name").value;
  document.getElementById("input-field").innerHTML = 
  `<input id="product-name" class="input" type="text" value="${productName}" readonly>`
  var infoField = productInfoField();
  document.getElementById("product-field").appendChild(infoField);
  document.getElementById("product-price").focus();
  document.getElementById("product-image").addEventListener("change", addSubmitButton);
}



function productInfoField() {
  var infoField = document.createElement("div");
  infoField.innerHTML = 
  `
  <div class="field is-horizontal">
      <div class="field-label is-medium">
          <label class="label">Product price</label>
      </div>
      <div class="field-body">
          <div class="field">
              <div class="control">
                  <input id="product-price" class="input" type="text" placeholder="*Price in number*" required>
              </div> 
          </div>
      </div>
  </div>
  <div class="file has-name">
      <div class="field-label is-medium">
          <label class="label">Product image</label>
      </div>
      <input type="file" id="product-image">  
  </div>
  `
  return infoField;
}


function addSubmitButton() {
  var newButton = document.getElementById("submit-button");
  if (newButton != null) {
      return;
  }
  var submitContainer = document.createElement('div');
  submitContainer.innerHTML = 
  `<a id="submit-button" class="button is-info" onclick="createProduct()">Submit</a>`
  document.getElementById("product-field").appendChild(submitContainer);
}

function createProduct() {
  var productImage = document.getElementById("product-image").files[0];
  var reader = new FileReader();
  reader.readAsDataURL(productImage);
  reader.onload = function () {
      var object = {
          file: reader.result,
          fileName: productImage.name
      };
      var obj = {};
      obj.token = localStorage.getItem("token");
      obj.productName = document.getElementById("product-name").value;
      obj.productPrice = document.getElementById("product-price").value;
      obj.productImage = object;
      var sendProduct = new Promise((resolve, reject) => {
          var http = new XMLHttpRequest();
          http.open("POST", "http://127.0.0.1:3000/admin-controller/create-new-product", true);
          http.send(JSON.stringify(obj));
          http.onload = () => resolve(http.response);
          http.onerror = () => reject(http.response);
      });
      sendProduct.then((response) => {
          if (response == "OK") {
              alert("Success");
          }
          else {
              alert("Fail");
          } 
      }).catch((error) => {
          alertError(error);
      });
  };
}


function inputNameField(){
  var nameField = document.createElement('div');
  nameField.setAttribute("id","product-field");
  nameField.innerHTML = 
  `<div class="field is-horizontal">
      <div class="field-label is-medium">
          <label class="label">Product name</label>
      </div>
      <div class="field-body">
          <div class="field">
              <div id = "input-field" class="control">
                  <input id="product-name" class="input" type="text" placeholder="*Product name is less than 40 letters*" required>
              </div> 
          </div>
      </div>
  </div>
  <a id="submit-name-button" class="button is-info is-hovered" onclick="checkValidProductName()">Submit</a>
  `
  return nameField;
}

function checkKeyPress(key) {
  var tab = document.getElementById("add-product");
  var checkCurrentTab = tab.className.indexOf("is-active");
  if (key.keyCode == 13 && checkCurrentTab != -1) {
      checkValidProductName();
  }
}

addEventListener("keypress",checkKeyPress);