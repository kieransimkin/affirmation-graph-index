var  dotenv = require('dotenv');
dotenv.config()
var neo4j = require('neo4j-driver');
let driver = null;
const getDriver = async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  if (driver) return driver;

  try {
    driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
  return driver;
}

exports.getDriver = getDriver;