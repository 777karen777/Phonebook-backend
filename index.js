const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())

app.use(express.json())

// app.use(morgan('tiny'))

morgan.token('req-body', (req) => {
  return req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
// app.use(morgan("common"))
// app.use(morgan("combined", {immediate: true}))
// app.use(morgan("combined"))
/* app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
})) */
/* app.use(morgan(function (tokens, req, res) {
  console.log(Object.keys(tokens))
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})) */
// app.use(morgan("short"))
// app.use(morgan("tiny"))

// console.log('Avvvvailable tokens:', morgan.token());


const baseUrl = '/api/persons'

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get(baseUrl, (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
  const curentDate = new Date().toString()
  
  response.send(`<p>Phonebook has info for ${persons.length} people <br/> ${curentDate} </p>`)
  // console.log(Object.keys(request))
  // response.json(request)
})

app.get(`${baseUrl}/:id`, (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = request.params.id;
  const found = persons.find(p => p.id === id)
  if(found) {
    persons = persons.filter(person => person.id !== id)
    response.status(200).json(found)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  let id, found
  while(true) {
    id = Math.floor(Math.random() * 100000)
    found = persons.find(person => person.id === id)
    if(!found) {
      return (id)
    }
  }
}

app.post(baseUrl, (request, response) => {

  const body = request.body
  let errorMessage = null

  if (body.name) {
    const foundName = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())
    if(foundName) {
      errorMessage = 'name must be unique'
    }
  } else {
    errorMessage = "name can't be missed"    
  }
  
  if(!body.number) {
    if(errorMessage) {
      errorMessage += "\n number can't be missed"
    } else {
      errorMessage = "number can't be missed"
    }
  }

  if(errorMessage) {
    return response.status(400).json({
      error: errorMessage
    })
  }

  const person = {
    id: generateId().toString(),
    name: body.name,
    number: body.number.toString()
  }

  persons = persons.concat(person)

  response.json(person)
} )



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})