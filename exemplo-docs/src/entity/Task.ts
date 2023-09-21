import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  description: string

  @Column({ nullable: false })
  deadline: Date

  @Column({ default: false })
  performed: boolean

  @Column({ nullable: false })
  severity: number
}
