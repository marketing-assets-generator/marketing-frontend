import axios from "axios";

// export const baseUrl = "http://ybigta-marketing-env.eba-vrahvqv2.ap-northeast-2.elasticbeanstalk.com";
export const baseUrl = "http://localhost:8080";

export const api = axios.create({
  baseURL: baseUrl
});
