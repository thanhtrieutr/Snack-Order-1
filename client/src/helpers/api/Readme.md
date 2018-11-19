# API

Sử dụng Fetch để gọi API.

Link tham khảo:
https://developer.mozilla.org/en-US/docs/Web/API/Request

i.e: 

```js
fetch('https://youtube.com').then(response => {
  // your code here.
}) 
```

```js
fetch('https://youtuve.com', {
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  method: 'GET', // POST, DELETE, PUT,
  body: 'foo=bar&lorem=ipsum' // object
}).then(response => {
  // your code here.
})
```