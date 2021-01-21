const { ApolloServer, UserInputError, gql } = require('apollo-server')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
// const Person = require('./models/person')
const User = require('./models/user')
const File = require('./models/file')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0.lljed.mongodb.net/fullstack-ht?retryWrites=true&w=majority'

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

const conn = mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type User {
    username: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    me: User
    files: [File!]
  }
  type Mutation {
    singleUpload(
      file: Upload!
      ): File!
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token 
  }  
`
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    files: async () => {
      return await File.find();
    }  
  },
  Mutation: {
      singleUpload: async (parent, args) => {
        const file = await args.file
        const {createReadStream, filename, mimetype} = file
        const fileStream = file.createReadStream();
  
        // const uploadParams = {Bucket: 'apollo-file-upload-test', Key: filename, Body: fileStream}
        const result = await File.create(file)
        // const result = await s3.upload(uploadParams).promise()
        console.log(result)

        return file
      },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    }, 
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }   
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }  
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})