const express = require('express')
const requestModule = require('request')
const PORT = 3000
const API_KEY = '226c9c957d15ae0020ff9df0fe24f13d'
const app = express()



app.use(express.static(__dirname + '/public'))

app.use(function(request, response, next){
	console.log('LOG:');
  console.log(`URL: ${request.url}`)
	console.log(request.query);
	next();
})

app.listen(process.env.port || PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT} CNTL-C to quit`)
    console.log(`To Test the App:`)
    console.log(`http://localhost:3000`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000/recipes`)
    console.log(`http://localhost:3000/recipes.html`)
    console.log(`To Test the App with initial ingredients:`)
    console.log(`http://localhost:3000/recipes?ingredient=Basil`)
    console.log(`http://localhost:3000/recipes?ingredient=Basil,Cumin`)
    
  }
})

app.get('/', (request, response) => {
  let ingredient = request.query.ingredient
  response.sendFile(__dirname + '/views/index.html')
})


app.get('/recipes.html', (request, response) => {
    
    response.redirect('/')
})
app.get('/index.html', (request, response) => {
      
      response.redirect('/')
})



app.get('/recipes', (request, response) => {
  let url = ''
  let ingredient = request.query.ingredient
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/api', (request, response) => {
  let url = ''
  let ingredient = request.query.ingredient
  if(!ingredient) {
 
    url = `https://food2fork.com/api/search?key=${API_KEY}`
  }
  else {
    url = `https://food2fork.com/api/search?key=${API_KEY}&q=${ingredient}`
  }
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))
  })
})
