let backendHost;

if (process.env.NODE_ENV === 'production') {
  backendHost = 'http://178.128.115.211/v1';
} else {
  backendHost = 'http://127.0.0.1:3000/v1';
}

console.log(backendHost);

export const API_ROOT = backendHost;
