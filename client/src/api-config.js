let backendHost;

console.log(process.env.REACT_APP_ENV);
if (process.env.REACT_APP_ENV !== 'production') {
  backendHost = 'http://127.0.0.1:3000';
} else {
  backendHost = 'http://178.128.115.211';
}

console.log(backendHost);

export const API_ROOT = backendHost;
