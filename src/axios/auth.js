import axios from './axios'

export const apiUserLogin = async (email, password) => { 
  const { data } = await axios.post('/guess/login', { email, password });
  return data;
};

export const apiUserLogout = async () => { 
  const { data } = await axios.post('/guess/logout');
  return data;
};

export const apiUserSignup = async (nickname, email, password) => {
  const { data } = await axios.post('/guess/signUp', { nickname, email, password });
  return data;
};
