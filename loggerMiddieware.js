const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('-----')
  next()
  // el metodo de' next()' nos ayudara a decirle  ve a la siguient e ruta.
}
module.exports = logger
