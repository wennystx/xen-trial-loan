import { getRepository } from "typeorm";
import { Customer, Loan } from "../models";

export interface ILoanPayload {
  loanDescription: string;
  loanDate: Date;
  initialBalance: number;
  availableBalance: number;
  dailyInterestRate: number;
  customerId: number; 
}

// export interface ILoanPayloadUpdate {
//   loanId: number;
//   loanTitle: string;
//   loanDesc: string;
//   customerId: number;
//   initialBalance: number;
//   availableBalance: number;
//   dailyInterestRate: number;
// }

export const getLoans = async (): Promise<Array<Loan>> => {
  const loanRepository = getRepository(Loan);
  return loanRepository.find({
    relations: ['transactions'],
    order: {
      'createdAt': 'DESC'
    }
  });
};

export const createLoan = async (payload: ILoanPayload): Promise<Loan> => {
  const loanRepository = getRepository(Loan);
  const loan = new Loan();
  return loanRepository.save({
    ...loan,
    ...payload,
  });
};

export const getLoan = async (id: number): Promise<Loan | null> => {
  const loanRepository = getRepository(Loan);
  const loan = await loanRepository.findOne({ loanId: id}, { relations: ['transactions']});
  if (!loan) return null;
  return loan;
};


export const updateLoanBalance = async (id: number, newBalance: number): Promise<Loan | null> => {
  const loanRepository = getRepository(Loan);
  //const loan = await loanRepository.findOne({ loanId: id });
  return loanRepository.save({
    loanId: id,
    availableBalance: newBalance
  });
};