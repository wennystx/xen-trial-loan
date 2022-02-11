
  //  import {
  //   Entity,
  //   PrimaryGeneratedColumn,
  //   Column,
  //   ManyToOne,
  //   OneToMany,
  //   CreateDateColumn,
  //   UpdateDateColumn,
  //   JoinColumn,
  // } from "typeorm";
  // import { Transactions } from "./transactions";
  // import { DecimalTransformer } from '../utils/decimal.transformer';
  
  // @Entity()
  // export class Loan {
  //   @PrimaryGeneratedColumn({name:"loan_id"})
  //   loanId!: number;
  
  //   @Column({name: 'loan_description', type: "text"})
  //   loanDescription!: string;

  //   @Column({ name: 'initial_balance', type: 'numeric', precision: 15, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
  //   initialBalance!: number;

  //   @Column({ name: 'available_balance', type: 'numeric', precision: 15, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
  //   availableBalance!: number;

  //   @Column({ name: 'daily_interest_rate', type: 'numeric', precision: 5, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
  //   dailyInterestRate!: number;
  
  //   @Column({ name: 'loan_date'})
  //   loanDate!: Date;

  //   @Column({ name: 'borrower_name', type: 'varchar', length: 255})
  //   borrowerName!: String;

  //   @Column({ name: 'borrower_identity_type', type: 'varchar', length: 255})
  //   borrowerIdentityType!: String;
 
  //   @Column({ name: 'borrower_identity_number', type: 'varchar', length: 255})
  //   borrowerIdentityNumber!: String;

  //   @Column({ name: 'borrower_address', type: 'text'})
  //   borrowerAddress !: String;

  //   @Column({ name: 'borrower_phone_number', type: 'varchar', length: 255})
  //   borrowerPhoneNumber !: String;

  //   @Column({ name: 'borrower_email', type: 'varchar', length: 255})
  //   borrowerEmail !: String;
  
  //   @OneToMany((_type) => Transactions, (transactions: Transactions) => transactions.loans)
  //   transactions!: Array<Transactions>;
  
  //   @CreateDateColumn({name: 'created_at'})
  //   createdAt!: Date;
  
  //   @UpdateDateColumn({name: 'updated_at'})
  //   updatedAt!: Date;
  // }