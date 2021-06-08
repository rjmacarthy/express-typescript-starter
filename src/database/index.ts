
import * as mongoose from 'mongoose'

export default (connectionString: string) => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(e => {
      console.log('Error connecting to mongo db', e.message)
    })
}