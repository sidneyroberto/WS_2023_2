import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import * as EmailValidator from 'email-validator'
import { pbkdf2Sync, randomBytes } from 'crypto'

export enum STATUS {
    INVALID_EMAIL = 'Invalid email',
    INVALID_NAME = 'Invalid name',
    INVALID_PASSWORD = 'Password must contain at least 8 characters,'
    + ' 1 uppercase character, and 1 digit',
    OK = 'Ok',
    REGISTRATION_ERROR =
    'An error occurred while trying to register the user',
    NOT_AUTHORIZED = 'User not authorized'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column({ unique: true })
    email: string

    @Column()
    salt: string

    @Column()
    hash: string

    password: string

    constructor(fullname: string, email: string, password: string) {
        this.email = email
        this.fullname = fullname
        this.password = password
        this._generatePassword()
    }

    isValid(): STATUS {
        if (!this.fullname) {
            return STATUS.INVALID_NAME
        }

        if (!EmailValidator.validate(this.email)) {
            return STATUS.INVALID_EMAIL
        }

        if (!this._isPasswordValid()) {
            return STATUS.INVALID_PASSWORD
        }

        return STATUS.OK
    }

    isPasswordCorrect(password: string): boolean {
        const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
        return hash === this.hash
    }

    private _isPasswordValid(): boolean {
        return this.password
            && this.password.length >= 8
            && /[A-Z]/g.test(this.password)
            && /[0-9]/g.test(this.password)
    }

    private _generatePassword() {
        if (this._isPasswordValid()) {
            this.salt = randomBytes(16).toString('hex')
            this.hash = pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex')
        }
    }
}
