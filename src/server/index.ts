import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import bot from './apis/bot'

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
app.use(bodyParser.json())

// API Routers
app.use(bot)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
