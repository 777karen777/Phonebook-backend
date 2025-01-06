const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
// const mongoose = require('mongoose')

// const password = process.argv[2]




const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformated id'})
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } /* else if(error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } */ 

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

// app.use(cors())
app.use(express.static('dist'))

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


app.get(baseUrl, (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info', (request, response) => {
  const curentDate = new Date().toString()
  
  Person.countDocuments({})
    .then(count => {
      response.send(`<p>Phonebook has info for ${count} people <br/> ${curentDate} </p>`)
    })
    .catch(error => next(error))
  
})

app.get(`${baseUrl}/:id`, (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete(`${baseUrl}/:id`, (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))  
})



app.post(baseUrl, (request, response, next) => {

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error: 'Name and number are both required'})
  }
  
  Person.findOne({name: body.name})
    .then(existingPerson => {
      if (existingPerson) {
        existingPerson.number = body.number.toString()
        return existingPerson.save().then(updatedPerson => {
          response.json(updatedPerson)
        })
      } else {
        const person = new Person ({
          name: body.name,
          number: body.number.toString()
        })
      
        person.save()
          .then(savedPerson => {
            response.json(savedPerson)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => {next(error)})  
})

app.put(`${baseUrl}/:id`, (request, response, next) => {
  const body = request.body
  const {id} = request.params

  const person = {
    name: body.name,
    number: body.number,
  }

  if (!body.number) {
    return response.status(400).json({error: 'Number is required'})
  }

  Person.findByIdAndUpdate(id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})