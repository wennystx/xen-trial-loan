import { getRepository } from "typeorm";
import { Transaction } from "../models";

export interface ITransactionPayload {
  description: string;
  type: string;
  amount: number;
  loanId: number;
}

export const getTransactions = async (): Promise<Array<Transaction>> => {
  const transactionRepository = getRepository(Transaction);
  return transactionRepository.find();
};

export const createTransaction = async (payload: ITransactionPayload): Promise<Transaction> => {
  const transactionRepository = getRepository(Transaction);
  const transaction = new Transaction();
  return transactionRepository.save({
    ...transaction,
    ...payload,
  });
};

export const getTransaction = async (id: number): Promise<Transaction | null> => {
  const transactionRepository = getRepository(Transaction);
  const transaction = await transactionRepository.findOne({ transactionId: id });
  if (!transaction) return null;
  return transaction;
};


// export const uploadTransactionBalance = async (id: number, newBalance: number): Promise<Transaction | null> => {
//   const transactionRepository = getRepository(Transaction);
//   //const transaction = await transactionRepository.findOne({ transactionId: id });
//   return transactionRepository.save({
//     transactionId: id,
//     balance: newBalance
//   });
// };