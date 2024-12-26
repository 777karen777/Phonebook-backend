const mongoose = require('mongoose')

const len = process.argv.length;

if (len < 3) {
    console.log('give password as argument');
    process.exit(1)    
}
if (len !== 3 && len !== 5) {
    console.log('wrong number of arguments');
    process.exit(1)    
}


const password = process.argv[2]

const url = 
`mongodb+srv://fullstack:${password}@cluster0.zza4ec9.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', true)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


if (len === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);            
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result => {
        console.log('person saved!');
        mongoose.connection.close()    
    })
}