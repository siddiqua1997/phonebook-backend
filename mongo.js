const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
const url = process.env.MONGODB_URI

if (!url) {
  console.error('Missing MONGODB_URI in environment')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', PersonSchema)

Person.find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error fetching persons:', error.message)
    mongoose.connection.close()
  })
