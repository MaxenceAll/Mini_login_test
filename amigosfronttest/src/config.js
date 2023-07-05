const config = {
    development: {
      api: {
        url: import.meta.env.VITE_APP_API_URL,
      },
    },
    production: {
      api: {
        url: import.meta.env.VITE_APP_API_URL,
      },
    },
  };
  
  export default config[import.meta.env.VITE_APP_ENV];
  