/*
1.what is database?
2.Types of Database
3.what is DBMS?
4.Different typesof Databases
5.SQL vs NoSQL
6..what is relational databases and how it works?
7.History of SQl and who invented it
8.History of MYSQL and who invented it and how it is named as MYSql(Michael widenir)
9.History of Progress Sql and who invented it and how it is named as postgress.(Michael stone Breaker)
10.Which company first took the MYSQL(Sun microsystems)
11.How mongodb came and gistory of mongodb and how it is named as mongo(humongous)
12.which companyb manages the mongodb and how that company changed to MOngodb inc from another comapny name
13.EF codd(Founder of RDB) and chodds 12 rule and if anyone uses this 12rules(0-12) then it can become a relational db
14.mongodb created by 10gen company and later changed it to mongodb inc.
*/

const { MongoClient } = require('mongodb');
const url="mongodb+srv://abcd:abcd1234@cluster0.rfnapzt.mongodb.net/";
const client=new MongoClient(url);
const dbname='Helloworld';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbname);
  const collection = db.collection('user');

  // the following code examples can be pasted here...

  const data={
    "first name":"Rajesh",
    "last name":"Bandharu",
    "City":"Eskota",
    "phone number":"7438889763"

  }
  const insertResult = await collection.insertMany([data]);
  console.log('Inserted documents =>', insertResult);
   
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  return 'done.';
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

/*
*Notes
*Go to mongodb website
*create a clustrer
*create a username and password
*Get the cluster
*Install mogodb compass
*To connect our mongodb to the node we need to use one npm package i.e; npm i mongodb
*do the process of connecting to mongodb from mongodb documentation
*Do crud operations

*/
