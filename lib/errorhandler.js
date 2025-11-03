export default function errorHandler(err, req, res, next) {
  if (err) {
    // err = undefined, null 인 경우
    return res.send('error check!');
  }

  res.send('알 수 없는 오류');
}
