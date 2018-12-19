import {_helper} from '../_helper'

export function checkToken(callback) {
  _helper.fetchPOST('/user-controller/check-token', {}, (result) => {
    callback(result);
  })
}