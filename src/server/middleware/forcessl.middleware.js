export default (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(301, `https://${req.headers.host}${req.url}`)
  } else {
    next()
  }
}
