import * as bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { MinLength, IsEmail } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 150,
    })
    @MinLength(2)
    firstName: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    @MinLength(2)
    lastName: string;

    @Column({
        type: 'varchar',
        length: 250,
        unique: true
    })
    @IsEmail()
    email: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true,
        select: false
    })
    password: string|undefined;

    @Column({
        type: 'varchar',
        length: 250
    })
    hashPass: string;

    @BeforeInsert()
    async hashPassword() {
        this.hashPass = await bcrypt.hash(this.password, 10);
        this.password = null;
    }

    async isValidPassword(password) {
        const user = this;
        return await bcrypt.compare(password, user.hashPass);
    }
}

export interface IUser {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    hashPass?: string
}
