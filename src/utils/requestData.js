import { checkResponce } from "./checkResponce";

function requestData(url, option) {
  return fetch(url, option).then(checkResponce);
}
export { requestData };
