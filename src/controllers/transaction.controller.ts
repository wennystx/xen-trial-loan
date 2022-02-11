import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Transaction } from "../models";
import {
  getTransactions,
  createTransaction,
  ITransactionPayload,
  getTransaction,
} from "../repositories/transaction.repository";
import {
  getLoan,
  updateLoanBalance,
} from "../repositories/loan.repository";
import { getManager } from "typeorm";

@Route("transactions")
@Tags("Transaction")
export default class TransactionController {
  @Get("/")
  public async getTransactions(): Promise<Array<Transaction>> {
    return getTransactions();
  }

  @Post("/")
  public async createTransaction(@Body() body: ITransactionPayload): Promise<any> {
    console.log(body.type.toUpperCase());
    const loanData = await getLoan(body.loanId);
    if(!loanData) throw({message: `No Loan Data`});
    let count = 0;
    
    count = loanData.initialBalance;
    loanData.transactions.forEach( item => {
      if(item.type.toUpperCase() == 'REPAYMENT') count =+ item.amount;
      if(item.type.toUpperCase() == 'DRAWDOWN') count =- item.amount;
    });
    console.log("balance: " + count);

    if(body.type.toUpperCase() == 'REPAYMENT'){
      if( body.amount > loanData.initialBalance - loanData.availableBalance) {
        console.log(body.amount);
        console.log(loanData.initialBalance - loanData.availableBalance);
        return {error:{
                  status: 500,
                  message: `Repayment amount cannot exceed loan amount minus balance`}};
      }
    }else{
      if(body.type.toUpperCase() == 'DRAWDOWN'){
        if( body.amount > loanData.availableBalance) {
          console.log(body.amount);
          console.log(loanData.availableBalance);
          return {error:{
                    status: 500,
                    message: `Drawdown amount cannot exceed balance`}};
        }
      }
    }
    
    const trx = await createTransaction(body);
    if(body.type.toUpperCase() == 'DRAWDOWN') {
      updateLoanBalance(loanData.loanId, loanData.availableBalance - body.amount)
    }
    if(body.type.toUpperCase() == 'REPAYMENT') {
      // loanData.availableBalance = loanData.availableBalance + body.amount;
      updateLoanBalance(loanData.loanId, loanData.availableBalance + body.amount)
    }

    // await getManager().transaction(async transactionalEntityManager => {
    //     await transactionalEntityManager.save(loanData);
    // });

    return trx;
  }

  @Get("/:id")
  public async getTransaction(@Path() id: string): Promise<Transaction | null> {
    return getTransaction(Number(id));
  }


  public async getAvailableBalance(id: string): Promise<Number | null> {
    const loanData = await getLoan(Number(id));
    let count = 0;
    if(loanData){
      count = loanData?.initialBalance;
      loanData?.transactions.forEach( item => {
        if(item.type.toUpperCase() == 'REPAYMENT') count =+ item.amount;
        if(item.type.toUpperCase() == 'DRAWDOWN') count =- item.amount;
      });
    }
    return count;
  }
}