import Axios from "axios";
const SERVER_URL = "http://127.0.0.1:1337/api";

export async function axiosRequest(method:any, url:any, data = null) {
  try {
    let response = await Axios({
      method: method,
      url: `${SERVER_URL}${url}`,
      data: data,
    });
    return await response.data;
  } catch (error) {
    return error;
  }
}
