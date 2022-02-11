// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     ManyToOne,
//     CreateDateColumn,
//     UpdateDateColumn,
//     JoinColumn,
//   } from "typeorm";
//   import { Loans } from "./loans";
  
//   @Entity()
//   export class Transactions {
//     @PrimaryGeneratedColumn()
//     transactionId!: number;
  
//     @Column({
//       type: "text",
//     })
//     description!: string;

//     @Column()
//     type!: string;

//     @Column()
//     amount!: number;
  
//     @Column()
//     loanId!: number;
//     @ManyToOne((_type) => Loans, (loans: Loans) => loans.transactions)
//     @JoinColumn()
//     loans!: Loans;
  
//     @CreateDateColumn()
//     createdAt!: Date;
  
//     @UpdateDateColumn()
//     updatedAt!: Date;
//   }