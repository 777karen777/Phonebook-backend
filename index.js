const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())

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

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'Wrong datas!'
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