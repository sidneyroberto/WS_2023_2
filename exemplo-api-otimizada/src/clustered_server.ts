import cluster from 'cluster'
import dotenv from 'dotenv'
import { cpus } from 'os'
import { connection } from 'mongoose'

dotenv.config()

import { app } from './app'

const PORT = process.env.PORT || 3000

if (cluster.isPrimary) {
  const numberOfWorkers = cpus().length
  console.log(`Primary cluster setting up ${numberOfWorkers} workers...`)

  for (let i = 0; i < numberOfWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`)
  })

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    )

    console.log('Starting a new worker')
    cluster.fork()
  })
} else {
  const server = app.listen(PORT, () =>
    console.log(`App running on port ${PORT}`)
  )

  const events = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM']

  events.forEach((e) => {
    process.on(e, () => {
      server.close()
      connection.close()
    })
  })
}
