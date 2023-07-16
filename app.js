//CreateReadUpdateDelete
require('dotenv').config();
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);
//on utilise la fonction async pour pouvoir utiliser await
async function main(){
    //on se connecte au client
    await client.connect();
    console.log('Connection OK');
    //on se connecte à la base de données
    const db = client.db('myTask');
    //on se connecte à la collection
    const collection = db.collection('document');
    
    //on insère un document
    const insertStuff = await collection.insertMany([{ a: 1}, {b: 2}, {c: 3}]);
    //on affiche les  documents insérés dans la collection
    console.log(`document insérés => ${insertStuff}`);
    
   //Create
    try {
        const insertData = await collection.insertMany([
            {
                name: 'Alex',
                age: 30,
                sexe: 'Masculin',
                hobby: 'Coding'
            },
            {
                name: 'Justine',
                age: 30,
                sexe: 'Féminin',
                hobby: 'Coding'
            },
            {
                name: 'Pierre',
                age: 35,
                sexe: 'Masculin',
                hobby: 'Escalade'
            }
        ]);
        console.log('document insérés =>',  insertData);
    } catch (e) {
        throw e;
    }
    //Read
    try {
        const findData = await collection.findOne({name: 'Justine'});
        console.log('documents trouvés', findData);
        const findMultipleData = await collection.find({age: 30});
        console.log(await findMultipleData.toArray());
    } catch (e) {
        throw e;
    }
    
    //Update
    try {
         const updatePierre = collection.updateOne({name: 'Pierre' }, {
            $set: { name: 'Pauline' , sexe: 'Feminin' }
        });
        console.log(await updatePierre);
        
        const updateAge = collection.updateMany({age: 30 }, {
            $set: { age: 31}
        });
        console.log(await updateAge);
    } catch (e) {
        throw e;
    }
    
    //Delete
    try {
        const deletePierre = await collection.deleteOne({ name: 'Pauline '});
        console.log(await deletePierre);
        const deleteEveryone = await collection.deleteMany({ age: 35});
        console.log(await deleteEveryone);
    } catch (e) {
        throw e;
    }
    return 'done!';
}
//on appelle la fonction main
main()
//on affiche le résultat
    .then(console.log)
    //on affiche les erreurs
    .catch(console.error)
    //on ferme la connexion au client
    .finally(() => client.close());
