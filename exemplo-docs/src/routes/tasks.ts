import { Router } from 'express'
import { Severity } from '../enums/Severity'
import { TaskController } from '../controllers/TaskController'
import { Task } from '../entity/Task'

export const tasksRouter = Router()
const taskCtrl = new TaskController()

tasksRouter.post('/', async (req, res) => {
  const { description, deadline, severity } = req.body

  const errorMessages: string[] = []

  if (!description) {
    errorMessages.push('Description cannot be empty')
  }

  const deadlineDate = new Date(deadline)
  if (deadlineDate < new Date()) {
    errorMessages.push('Deadline cannot be a past date')
  }

  const severityNumber = Number(severity)
  if (
    isNaN(severityNumber) ||
    severityNumber < Severity.LOW ||
    severityNumber > Severity.HIGH
  ) {
    errorMessages.push('Invalid severity level')
  }

  if (errorMessages.length === 0) {
    const task = new Task()
    task.deadline = deadlineDate
    task.description = description
    task.severity = severityNumber
    const savedTask = await taskCtrl.save(task)
    return res.status(201).json({ task: savedTask })
  }

  return res.status(400).json({ errorMessages })
})
