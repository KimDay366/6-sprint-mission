export default function errorHandler(err, req, res, next) {
  if (!err) {
    // err = undefined, null 인 경우
    return res.status(500).send({ message: 'Unknown Server error' });
  }

  // 나머지 에러를 확인하는 작업
  const status = err?.status || 500;

  const messages = {
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Unknown Server Error',
  };

  return res.status(status).json({
    status,
    message: messages[status] || 'Unexpected Error',
  });
}
