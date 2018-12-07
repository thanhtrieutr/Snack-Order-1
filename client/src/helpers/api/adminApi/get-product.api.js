import {_helper} from '../_helper';

export function loadProduct(callback) {
  var token = 'WdBXsuK5S8gvC3QE1PeFPWsnRwVf4hj7GCRNHwr96CXkcjcPMrW+8NueApSJhe7eYWRtaW5AZ21haWwuY29t';
  _helper.fetchPost('/admin-controller/get-products', {token}, result => {
    console.log(result);
  });
}
