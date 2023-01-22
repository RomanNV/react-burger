function checkResponce(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error();
}
export { checkResponce };
