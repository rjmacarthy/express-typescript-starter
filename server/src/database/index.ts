import * as mongoose from 'mongoose'

export default (connectionString: string) => {
  mongoose.connect(connectionString).catch((e) => {
    console.log('Error connecting to mongo db', e.message)
  })
}
