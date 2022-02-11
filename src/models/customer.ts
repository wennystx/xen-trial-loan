import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    UpdateDateColumn,
  } from "typeorm";
  import { Loan } from "./loan";
  
  @Entity()
  export class Customer {
    @PrimaryGeneratedColumn()
    customerId!: number;
  
    @Column()
    firstName!: string;
  
    @Column()
    lastName!: string;
  
    @Column()
    email!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    identityType!: string;

    @Column()
    identityNumber!: string;

    @Column({type: "text"})
    address!: string;

    @Column()
    dateOfBirth!: Date;
  
    @OneToMany((_type) => Loan, (loan: Loan) => loan.customer)
    loans!: Array<Loan>;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }