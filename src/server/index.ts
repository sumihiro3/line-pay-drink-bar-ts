/* eslint-disable import/first */
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import * as firebase from 'firebase-admin'
import * as serviceAccount from './ServiceAccount.json'

// Create express instance
const app = express()
// Security issues
app.disable('x-powered-by')
const sessionOptions: session.SessionOptions = {
  secret: String(process.env.SESSION_SECRET),
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_COOKIE_SECURE === 'true',
    maxAge: 60 * 60 * 24 * Number(process.env.SESSION_COOKIE_MAX_AGE_DAYS)
  }
}
const defaultSession = session(sessionOptions)
app.use(defaultSession)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// initalize Firebase
if (!firebase.apps.length) {
  const firebaseCredentials = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  }
  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseCredentials)
  })
}

// API Routers
import bot from './apis/bot'
import item from './apis/item'
import order from './apis/order'
app.use('/bot', bot)
app.use('/item', item)
app.use('/order', order)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
