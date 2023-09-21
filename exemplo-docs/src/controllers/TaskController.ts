import { Repository } from 'typeorm'
import { Task } from '../entity/Task'
import { AppDataSource } from '../data-source'

export class TaskController {
  private _repo: Repository<Task>

  constructor() {
    this._repo = AppDataSource.getRepository(Task)
  }

  async save(task: Task) {
    const savedTask = await this._repo.save(task)
    return savedTask
  }

  async findTasksToBePerformed() {
    const tasks = await this._repo.find({
      where: {
        performed: false,
      },
      order: {
        severity: 'DESC',
      },
    })

    return tasks
  }

  async setTaskAsPerformed(id: number) {
    const result = await this._repo.update(id, { performed: true })
    return result
  }
}
