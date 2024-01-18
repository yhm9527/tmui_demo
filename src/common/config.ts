let API = '';
// #ifdef APP-PLUS
API = import.meta.env.VITE_API_URL
// #endif

// #ifdef H5
API = import.meta.env.VITE_API_H5_URL
// #endif
console.log('DEFAULT_API', API)
export const DEFAULT_API = API;