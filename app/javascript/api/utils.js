import axios from 'axios';

export async function getUserInfo() {
    try {
      const response = await axios.get('/userinfo');
      return response.data
    } catch (error) {
      console.error(error);
    }
  }