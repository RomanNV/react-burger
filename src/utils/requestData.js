import { checkResponce } from "./checkResponce";

function requestData(url, option) {
  return fetch(url, option).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      res.json().then((err) => Promise.reject(err));
    }
  });
}
export { requestData };
