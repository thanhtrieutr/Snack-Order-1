let backendHost;

if (process.env === 'production') {
  backendHost = 'http://178.128.115.211';
} else {
  backendHost = 'http://127.0.0.1:3000';
}

console.log(backendHost);

export const API_ROOT = backendHost;
