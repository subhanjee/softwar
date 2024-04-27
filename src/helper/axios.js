import axios from "axios";

const url = process.env.REACT_APP_URL;

const register = axios.create({
  baseURL: `${url}/auth/register`,
});
register.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const login = axios.create({
  baseURL: `${url}/users/login`,
});
login.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const users = axios.create({
  baseURL: `${url}/users`,
});
users.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const price = axios.create({
  baseURL: `${url}/price`,
});
price.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const footer = axios.create({
  baseURL: `${url}/footers`,
});
footer.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export {register, login, users,price,footer};