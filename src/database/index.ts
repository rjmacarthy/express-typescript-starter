import * as mongoose from 'mongoose'

export default (uri: string) => {
  try {
    mongoose.connect(uri)
  } catch (e) {
    console.log('Error connecting to mongo db', e.message)
  }
}
