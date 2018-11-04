//Function createUserContainer for initialzing order history table
function createUserContainer(oneOrder, currentId) {
  //Creating order history detail element
  var userOrder = document.createElement("div");
  userOrder.setAttribute("id", "display-container");
  userOrder.setAttribute("onclick", `showDetail('order-detail-${currentId}', "order-detail-label")`);
  userOrder.innerHTML = 
  `<table class="table is-fullwidth"> 
      <tbody>
          <tr>
              <td class="display-item" style="width: 30%;">
                  ${oneOrder.user}
              </td>
              <td class="display-item" style="width: 35%;">
                  Total: ${displayPrice(oneOrder.actualTotalPrice)}
              </td>
              <td class="display-item" style="width: 35%;">
                  Time: ${oneOrder.time}
              </td>
          </tr>
      </tbody>
  </table>`;
  return userOrder;
}

//Function createRowProduct for initializing detail of order history table 
function createRowProdct(oneProduct) {
  //Creating order history table element
  var oneRowProduct = document.createElement('TR');
  oneRowProduct.innerHTML = 
  `<td>${oneProduct.name}</td>
  <td>${oneProduct.quantity}</td>
  <td>${displayPrice(oneProduct.price)}</td>
  <td>${displayPrice(oneProduct.totalPrice)}</td>
  <td>${oneProduct.status}</td>`;
  return oneRowProduct;
}

//Function createOrderDetail for initializing every product detail in order history table
function createOrderDetail(oneOrder, currentId) {
  //Creating detail element for every product
  var orderDetail = document.createElement('div');
  orderDetail.setAttribute("id", `order-detail-${currentId}`);
  orderDetail.setAttribute("class", "detail");
  var orderTable = document.createElement('TABLE');
  orderTable.setAttribute("class", "table is-striped is-fullwidth");
  var oneRow = document.createElement("TR");
  oneRow.setAttribute("class", "has-background-grey-lighter");
  oneRow.innerHTML = `<th>Product name</th>
  <th>Quantity</th>
  <th>Unit price</th>
  <th>Total</th>
  <th>Actions</th>`;
  orderTable.appendChild(oneRow);
  for (var i in oneOrder.products) {
      oneRow = createRowProdct(oneOrder.products[i]);
      orderTable.appendChild(oneRow);
  }
  orderDetail.appendChild(orderTable);
  return orderDetail;
}

//Function loadOrderHistory fetch data from admin API server
function loadOrderHistory() {
  var choiceList = document.getElementsByClassName("choice");
  for (var i = 0; i < choiceList.length; i++) {
      choiceList[i].className = choiceList[i].className.replace(" is-active", "");
  }
  var currentChoice = document.getElementById("order-history");
  currentChoice.className = currentChoice.className + " is-active";
  //Calling removeAll function from admin.js
  removeAll();
  //Send request to admin API server to fetch order history information 
  //Promise section
  var loadOrder = new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:3000/admin-controller/get-order-history", true);
      var obj = {};
      obj.token = localStorage.getItem("token");
      http.send(JSON.stringify(obj));
      http.onload = () => resolve(http);
      http.onerror = () => reject(http.response);
  });

  //If success send data to client side, otherwise send error
  loadOrder.then((http) => {
      if (http.status == 200) {
          var response = http.response;
      }
      else {
          alertError(http.response);
          return;
      }
      //Parsing response data to placing it to every order history detail element 
      var listProduct = JSON.parse(response);
      var orderContainer = document.getElementById("order-content");
      //Using utilities variables from admin.js
      var currentId = 0;
      listProduct.reverse();
      listProduct.forEach(oneOrder => {
          var oneUserContainer = createUserContainer(oneOrder, currentId);
          var oneOrderDetail = createOrderDetail(oneOrder, currentId);
          var oneDiv = document.createElement("div");
          oneDiv.appendChild(oneUserContainer);
          oneDiv.appendChild(oneOrderDetail);
          currentId++;
          orderContainer.appendChild(oneDiv);
      });
  }).catch((error) => {
      //Calling alertError function from utilityFunction.js
      alertError(error);
  });
}