const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person)
  })
  mongoose.connection.close()
})