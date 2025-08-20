import mongoose from "mongoose"

async function connect_db(db_uri,db_name) {
    try {
        await mongoose.connect(`${db_uri}${db_name}`)
        console.log("Connected to DB")
       
    } catch (error) {
        console.error("Error connecting to mongo db", error)
        throw error
    }
}

export {connect_db}