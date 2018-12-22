import {API_ROOT} from '../../api-config'

let _helper = {
  fetchPOST: function (endpoint, dataToBeSent, callback) {
    if (!dataToBeSent.token && localStorage.token) {
      dataToBeSent.token = localStorage.token;
    }
    fetch(API_ROOT + endpoint, {
        method: 'POST',
        headers: {
          'token': localStorage.token,
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
    fetch(API_ROOT + endpoint)
      .then((response) => {
        callback(response);
      });
  }
}

export {_helper};