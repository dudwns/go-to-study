import axios from "axios";
import { refresh, refreshErrorHandle } from "./refresh";

const Api = axios.create({
  baseURL: "/",
  timeout: 10000,
  params: {},
});

Api.interceptors.request.use(refresh, refreshErrorHandle);

export default Api;
