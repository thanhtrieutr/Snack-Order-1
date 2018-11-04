//Calling loadTodayOrders function after page loading finished
loadTodayOrders()

//loadTodayOrders function for initialize bill list in today
function loadTodayOrders() {
  //Using utilities function from admin.js
  productRank=0;
  orderIdList = [];
  userList = [];
  var choiceList = document.getElementsByClassName("choice");
  for (var i = 0; i < choiceList.length; i++) {
      choiceList[i].className = choiceList[i].className.replace(" is-active", "");
  }
  var currentChoice = document.getElementById("today-order");
  currentChoice.className = currentChoice.className + " is-active";
  //Calling removeAll function from admin.js
  removeAll();
  //Push request to admin API server to fetch order data in today
  //Promise sector
  var loadTodayOrder = new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:3000/admin-controller/get-today-order", true);
      var obj = {};
      obj.token = localStorage.getItem("token");
      http.send(JSON.stringify(obj));
      http.onload = () => resolve(http);
      http.onerror = () => reject(http.response);
  });

  //If success then send back data to client side
  loadTodayOrder.then((http) => {
      if (http.status == 200) {
          var response = http.response;
      }
      else {
          return;
      }
      //Parsing response information and placing it into order table
      var listProduct = JSON.parse(response);
      var productContainer = document.getElementById("today-content-container");
      var tableHeader = createTable();
      productContainer.appendChild(tableHeader);
      var productTable = document.getElementById("today-content");
      var check = 0;
      listProduct.forEach(product => {
          createTodayOrderProduct(product, productTable);
          check += 1;
      });
      if (check > 0) {
          //Calling todaySubmit function
          todaySubmit();
      }
  }).catch((error) => {
      //If error then calling alertError function from utilityFunction.js
      alertError(error);
  });
}

//ChangeStatus function change status of every product in every bill
function changeStatus() {
  var selectionList = document.getElementsByClassName("selections");
  var updateList = [];
  for (var i = 0; i < selectionList.length; i++) {
      var obj = {};
      obj.productId = selectionList[i].getAttribute("data-id");
      obj.orderId = orderIdList[i];
      obj.user = userList[i];
      var selectAnswer = document.getElementById(selectionList[i].id);
      obj.status = selectAnswer.options[selectAnswer.selectedIndex].value;
      updateList.push(obj);
  }
  //After changing status, update status list
  changeTodayStatus(updateList);
}

//changeTodayStatus function for pushing updated product status to admin database
function changeTodayStatus(updateList) {
  //Push request to admin API server to pushed updated product status to server
  //Promise sector
  var changeOrderStatus = new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:3000/admin-controller/change-order-status", true);
      var obj = {};
      obj.token = localStorage.getItem("token");
      obj.updateList = updateList;
      http.send(JSON.stringify(obj));
      http.onload = () => resolve(http);
      http.onerror = () => reject(http.response);
  });
  
  //If success then send back data to client side
  changeOrderStatus.then((http) => {
      if (http.status == 200) {
          var response = http.response;
          if (response == "Success") {
              alert("Update success");
          }
          else alert("Update Fail");
      }
  }).catch((error) => {
      //If error then calling alertError function from utilityFunction.js
      alertError(error);
  });
}

//todaySubmit function for initialize submit button for pushing updated information
function todaySubmit() {
  var newButton = document.createElement('a');
  newButton.setAttribute("class", "button is-info");
  newButton.setAttribute("id", "today-button");
  newButton.setAttribute("onclick", "changeStatus()")
  newButton.innerHTML = 
  `Submit`
  document.getElementById("today-content-container").appendChild(newButton);
}

//createTable function for initialize bill infomation table 
function createTable() {
  var newTable = document.createElement("table");
  newTable.setAttribute("id", "today-content");
  newTable.setAttribute("class", "tab table is-striped is-fullwidth");
  newTable.innerHTML =
      `<tr class="has-background-grey-lighter">
          <th>Product name</th>
          <th>Quantity</th>
          <th>Unit price</th>
          <th>Total</th>
          <th>Buyer</th>
          <th>Time</th>
          <th>Actions</th>
      </tr> `
  return newTable;
}

//createTodayOrderProduct function for pulling and displaying all product information
function createTodayOrderProduct(product, productTable) {
  productRank++;
  var currentId = product.productId.toString();
  //Initializing order table element
  var newProduct = document.createElement("TR");
  newProduct.innerHTML =
  `<td class="product-name">${product.name}</td>
  <td>${product.quantity}</td>
  <td>${product.price}</td>
  <td>${product.totalPrice}đ</td>
  <td>${product.user}</td>
  <td>${product.time}</td>
  <td  class="action">
      <div class="select">
          <select class="selections" id="select-${productRank}-${product.user}" data-id="${currentId}">
          <option value="pending"> Pending </option>
          <option value="accept"> Accept </option>
          <option value="reject"> Reject </option>
          </select>
      </div>
  </td>`;
  orderIdList.push(product.orderId);
  userList.push(product.user);
  productTable.appendChild(newProduct);
  //Updating index following to updated product status
  var index;
  if (product.status == "pending") {
      index = 0;
  }
  else if (product.status == "accept") {
      index = 1;
  }
  else {
      index = 2;
  }
  document.getElementById("select-" + productRank + "-" + product.user).selectedIndex = index;
}
