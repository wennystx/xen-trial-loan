import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
  } from "typeorm";
  import { Loan } from "./loan";
  
  @Entity()
  export class Transaction {
    @PrimaryGeneratedColumn()
    transactionId!: number;
  
    @Column({
      type: "text",
    })
    description!: string;

    @Column()
    type!: string;

    @Column()
    amount!: number;
  
    @Column({name: 'loanId', nullable: true})
    loanId!: number;
    @ManyToOne((_type) => Loan, (loan: Loan) => loan.transactions)
    @JoinColumn({name: 'loanId'})
    loan!: Loan;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }