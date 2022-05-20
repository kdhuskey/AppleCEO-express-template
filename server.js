const http = require('http')
const express = require('express')

const hostname = 'localhost'
const port = 3000

const app = express()
const server = http.createServer(app)