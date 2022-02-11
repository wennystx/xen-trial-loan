
   import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from "typeorm";
  import { Transaction } from "./transaction";
  import { Customer } from "./customer";
  import {  DecimalTransformer } from '../utils/decimal.transformer';
  
  @Entity()
  export class Loan {
    @PrimaryGeneratedColumn()
    loanId!: number;
  
    @Column({type: "text"})
    loanDescription!: string;

    @Column({  type: 'numeric', precision: 15, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
    initialBalance!: number;

    @Column({ type: 'numeric', precision: 15, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
    availableBalance!: number;

    @Column({  type: 'numeric', precision: 5, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
    dailyInterestRate!: number;
  
    @Column()
    loanDate!: Date;
    
    @Column({ name: 'customerId', nullable: true })
    customerId!: number;

    @ManyToOne((_type) => Customer, (customer: Customer) => customer.loans)
    @JoinColumn({ name: 'customerId'})
    customer!: Customer;
  
    @OneToMany((_type) => Transaction, (transaction: Transaction) => transaction.loan)
    transactions!: Array<Transaction>;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }