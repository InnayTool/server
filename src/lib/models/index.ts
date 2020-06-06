import { Sequelize } from 'sequelize-typescript'
import { cloneDeep } from 'lodash'
import { Author } from './author'
import { Note } from './note'
import { Revision } from './revision'
import { Temp } from './temp'
import { User } from './user/User'
import { logger } from '../logger'
import { config } from '../config'

const dbconfig = cloneDeep(config.db)
dbconfig.logging = config.debug ? (data): void => {
  logger.info(data)
} : false

export let sequelize: Sequelize

// Heroku specific
if (config.dbURL) {
  sequelize = new Sequelize(config.dbURL, dbconfig)
} else {
  sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig)
}

sequelize.addModels([Author, Note, Revision, Temp, User])

export { Author, Note, Revision, Temp, User }
