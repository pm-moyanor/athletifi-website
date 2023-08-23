
import { axiosRequest } from "./ApiHelper";

// NEWS GET REQUEST HANDLER
export const GetRequestHandler = async (path:any) =>
  await axiosRequest(
    "GET",
    `${path}`
  );
// NEWSLETTER POST REQUEST HANDLER
export const PostRequestHandler = async (path:any,data:any) =>
  await axiosRequest(
    "Post",
    path,
    data
  );