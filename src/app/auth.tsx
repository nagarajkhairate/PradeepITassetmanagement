import axios from "axios";

const checkAuth = () => {
  let TOKEN = null;
  try {
    const userString = sessionStorage.getItem("user");
  if (userString) {
    TOKEN = JSON.parse(userString);
  }
    
  } catch (error) {
    console.error("Failed to parse user token from sessionStorage", error);
  }

  const PUBLIC_ROUTES = ["login", "forgot-password", "register", "documentation"];
  const isPublicPage = PUBLIC_ROUTES.some(r => window.location.href.includes(r));

  if (TOKEN.token?.refresh) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN.token?.refresh}`;

    axios.interceptors.request.use(function (config) {
      // Show global loading indicator
      document.body.classList.add('loading-indicator');
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      // Hide global loading indicator
      document.body.classList.remove('loading-indicator');
      return response;
    }, function (error) {
      document.body.classList.remove('loading-indicator');
      return Promise.reject(error);
    });

    return TOKEN.token?.refresh;
  } else {
    if (!isPublicPage) {
      window.location.href = '/login';
    }
    return null;
  }
};

export default checkAuth;
