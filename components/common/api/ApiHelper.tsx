import Axios from "axios";
const SERVER_URL = "https://vidalco.in/api";

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
