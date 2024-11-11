import { MongoClient, ObjectId } from "mongodb"
import Fs from "fs";
import Config from "../config.json"


setTimeout(() => handler(), 1000);

async function handler(req, res) {
    console.log('--- START ---')
    const client = new MongoClient(Config.mongo.connect.url)
    await client.connect()
    let mongoClient = client.db(Config.mongo.connect.dbName)

    let collectionContractType = mongoClient.collection(`contract-type`)
    let collectionHF = mongoClient.collection(`hf`)
    let collectionResearch = mongoClient.collection(`research`)
    let collectionSpecialist = mongoClient.collection(`specialist`)
    let collectionRole = mongoClient.collection(`role`)

    //Пользователи
    let collectionUser = mongoClient.collection(`user`)
    let arFieldsUser = {
        login: 'test1',
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
    await collectionPrice.updateMany({}, {$set: {clinic_id: new ObjectId(arFieldsClinic._id)}})

    //ORG
    let resultOrg = await collectionOrg.find({}).toArray()
    for (let item of resultOrg) {
        let arFields = {
            title: item.name,
        }

        await collectionOrg.updateOne({_id: item._id}, {$set: arFields})
    }

    //CONTRACT
    let resultContract = await collectionContract.find({}).toArray()
    for (let item of resultContract) {
        let arFields = {
            title: item.name,
        }

        await collectionContract.updateOne({_id: item._id}, {$set: arFields})
    }

    //CONTRACT-TYPE
    let resultContractType = await collectionContractType.find({}).toArray()
    for (let item of resultContractType) {
        let arFields = {
            title: item.name,
        }

        await collectionContractType.updateOne({_id: item._id}, {$set: arFields})
    }

    //HF
    let resultHF = await collectionHF.find({}).toArray()
    for (let item of resultHF) {
        let arFields = {
            title: item.name,
        }

        await collectionHF.updateOne({_id: item._id}, {$set: arFields})
    }

    //Research
    let resultResearch = await collectionResearch.find({}).toArray()
    for (let item of resultResearch) {
        let arFields = {
            title: item.name,
        }

        await collectionResearch.updateOne({_id: item._id}, {$set: arFields})
    }
    //Specialist
    let resultSpecialist = await collectionSpecialist.find({}).toArray()
    for (let item of resultSpecialist) {
        let arFields = {
            title: item.name,
        }

        await collectionSpecialist.updateOne({_id: item._id}, {$set: arFields})
    }

    //ROLE
    let resultRole = await collectionRole.find({}).toArray()
    for (let item of resultRole) {
        let arFields = {
            title: item.name,
        }

        await collectionRole.updateOne({_id: item._id}, {$set: arFields})
    }
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
