import mongoose, { MongooseError, MongooseOptions } from "mongoose"
import env from "dotenv";
env.config();
export class DB {
    private static uri = `${process.env.MONGO_CONNECTION_STRING}/${process.env.DB_NAME}`
    private static options: MongooseOptions = {
        autoIndex: true,
    }

    static connect() {
        console.log(this.uri)
        return new Promise(async (resolve, reject) => {
            try {
                await mongoose.connect(this.uri, this.options)
                console.log(`Server Connected with db using this URI ${this.uri}`);
                resolve(true)
                
            } catch (error) {
                console.error(error);
                reject(error)
            }
        })

    }
}