// impotación de module
const express = require('express')
const logger = require('./loggerMiddieware')

// EJECUCION DE EXPRESS
const app = express()

// parser de app

app.use(express.json())

app.use(logger)

// variable de Products
const products = require('./ListProducts')

// callback
//! antes sin el framework

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(products));
// });

// RUTAS PETICIONES HTTP
//! ahora con  el framework  express

app.get('/', (request, response) => {
  response.send('<h1> Hola mundo </h1>')
})
// lista de todos los productos
app.get('/api/products', (request, response) => {
  response.json(products)
})
// Lista de producto por el ID
app.get('/api/products/:id', (request, response) => {
  // se utiliza el metodo Number para trasformar el string que por defecto llegara al dicho id que necesitamos sea un numero
  const id = Number(request.params.id)
  const product = products.find((product) => product.id === id)
  if (product) {
    response.json(product)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  products = products.filter((product) => product.id != id)
  response.status(204).end()
})

app.post('/api/products', (request, response) => {
  const productBody = request.body

  if (!productBody || !productBody.content) {
    return response.status(400).json({
      error: 'productBody.content is missing'
    })
  }

  const ids = products.map((p) => p.id)
  console.log(ids)
  const maxId = Math.max(...ids)

  const newProduct = {
    id: maxId + 1,
    content: productBody.content,
    product: productBody.product,
    price: productBody.price,
    image: productBody.image,
    date: new Date().toISOString()
  }

  const productsArray = [...products, newProduct]

  console.log(productsArray)
  response.status(201).json(productsArray)
})
//  el app.Use() para el error 404
app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})
// Puerto de salida: Servidor (con express)
const PORT = 3001
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto: ${PORT}`)
})
