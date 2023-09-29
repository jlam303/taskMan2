const authorize = (req, res, next) => {
  const { apiKey } = req.query;
  if (apiKey === 'ping') {
    console.log('grant');
    req.user = { name: 'Jimmy John', id: 123456 };
    next();
  } else {
    console.log('den');
    res.send({ results: [], status: 401, message: 'denied' });
  }
};
module.exports = authorize;
