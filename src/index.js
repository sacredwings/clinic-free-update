import { MongoClient, ObjectId } from "mongodb"
import Fs from "fs";
import Config from "../config.json"


setTimeout(() => handler(), 1000);

async function handler(req, res) {
    console.log('--- START ---')
    const client = new MongoClient(Config.mongo.connect.url)
    await client.connect()
    let mongoClient = client.db(Config.mongo.connect.dbName)

    //Пользователи
    let collectionUser = mongoClient.collection(`user`)
    let arFieldsUser = {
        login: 'test',
        password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq'
    }
    await collectionUser.insertOne(arFieldsUser)
    arFieldsUser = {
        login: 'admin',
        password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq'
    }
    await collectionUser.insertOne(arFieldsUser)

    //Клинтка
    let collectionClinic = mongoClient.collection(`clinic`)
    let arFieldsClinic = {
        title: 'Клиника здоровья',
        legal_name: 'ООО Пульсар',

        inn: '5446012122',
        kpp: '544601001',
        ogrn: '1105472000787',

        create_user_id: new ObjectId(arFieldsUser._id),
        create_date: new Date()
    }
    await collectionClinic.insertOne(arFieldsClinic)

    let collectionWorker = mongoClient.collection(`worker`)
    await collectionWorker.rename("prof-examination")
    await collectionWorker.updateMany({}, {$set: {clinic_id: new ObjectId(arFieldsClinic._id)}})

    let collectionOrg = mongoClient.collection(`org`)
    await collectionOrg.updateMany({}, {$set: {clinic_id: new ObjectId(arFieldsClinic._id)}})

    let collectionContract = mongoClient.collection(`contract`)
    await collectionContract.updateMany({}, {$set: {clinic_id: new ObjectId(arFieldsClinic._id)}})

    let collectionPrice = mongoClient.collection(`price`)
    await collectionContract.updateMany({}, {$set: {clinic_id: new ObjectId(arFieldsClinic._id)}})

    /*
    let result = await collectionWorker.find({}).toArray()
    for (let item of result) {
        let arFields = {
            clinic_id: new DB().ObjectID(arFieldsClinic._id),
        }

        let result = await collectionWorker.updateOne({_id: item._id}, {$set: arFields})
        console.log(item)
    }*/





    console.log('--- END ---')

    //let collection = mongoClient.collection('post')



/*
    let i = 0
    for (let item of arPosts) {

        console.log(i)
        i++
    }

    console.log(arPosts[381])
*/


/*
    let collection = mongoClient.collection('topic')

    await collection.updateMany( {}, { $rename: { "group_id": "to_group_id" } } )

    let newId = new DB().ObjectID('61a9fdb494f73f29366ecdde')
    await collection.updateMany({}, {$set: {to_group_id: newId, to_user_id: null}})
*/
    /*
    await collection.update({}, {
        $rename: {
            "group_id": "to_group_id"
        }
    }, false, true);*/
/*
    let newId = new DB().ObjectID('61a9fdb494f73f29366ecdde')
    await collection.update({}, {$set: {to_group_id: newId, to_user_id: null}}, false, true);*/

}
