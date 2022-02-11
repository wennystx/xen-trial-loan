import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Loan, Customer } from "../models";
import {
  getLoans,
  createLoan,
  ILoanPayload,
  getLoan,
} from "../repositories/loan.repository";
import { getManager } from "typeorm";

@Route("loans")
@Tags("Loan")
export default class LoanController {

  @Get("/")
  public async getLoans(): Promise<Array<Loan>> {
    return getLoans();
  }

  @Post("/")
  public async createLoan(@Body() body: ILoanPayload): Promise<Loan> {
    return createLoan(body);
  }

  @Post("/bulk")
  public async createLoanBulk(@Body() body: Array<ILoanPayload>): Promise<any> {
    // let dataArray: Array<ILoanPayload> = [];
    let totalLoan = 0;
    await getManager().transaction(async transactionalEntityManager => {
      body.forEach( async item => {
        let loan = new Loan();
        loan.loanDescription = item.loanDescription;
        loan.initialBalance = item.initialBalance;
        loan.availableBalance = item.availableBalance;
        loan.dailyInterestRate = item.dailyInterestRate;
        loan.loanDate = item.loanDate;
        loan.customerId = item.customerId;
        await transactionalEntityManager.save(loan);
        totalLoan++;
      });
    });

    // body.forEach( item => {
    //   //let data = createLoan(item);
    //   let loan = new Loan();
    //    createLoan(item);
    // });

    return { message: `Loans created successfully` };
  }

  @Get("/:id")
  public async getLoan(@Path() id: string): Promise<Loan | null> {
    return getLoan(Number(id));
  }
}