import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import moment from "moment";

const refresh = async (config: AxiosRequestConfig): Promise<any> => {
  const refreshToken = Cookies.get("refreshToken");
  const expireAt = localStorage.getItem("expiresAt");
  let token = localStorage.getItem("accessToken");

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
    const body = {
      refreshToken,
    };

    // 토큰 갱신 서버통신
    const { data } = await axios.post("/refreshtoken", body);
    console.log(data);
    token = data.data.accessToken;
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("expiresAt", moment().add(1, "minutes").format("yyyy-MM-DD HH:mm:ss"));
  }
  if (!config.headers) config.headers = {};
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

const refreshErrorHandle = (err: any) => {
  Cookies.remove("refreshToken");
};

export { refresh, refreshErrorHandle };
