const host = 'http://127.0.0.1:3000';

let _helper = {
  fetchPOST: function (endpoint, dataToBeSent, callback) {
    if (!dataToBeSent.token && localStorage.token) {
      dataToBeSent.token = localStorage.token;
    }
    fetch(host + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToBeSent)
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        callback(!json.success, json);
      })
  },

  fetchGET: function (endpoint, callback) {
    fetch(host + endpoint)
      .then((response) => {
        callback(response);
      });
  }
}

export {_helper};