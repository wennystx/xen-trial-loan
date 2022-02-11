import { Request, Response, NextFunction } from "express";
import LoanController from "../controllers/loan.controller";

export const validate = async ( req: Request, res: Response, next: NextFunction ) => {
    console.log("validate transaction middleware!");
    const controller = new LoanController();
    const response = await controller.getLoan(req.params.id);
    if(response)
        if(req.params.type != 'DRAWDOWN' && req.params.type != 'REPAYMENT') res.status(500).send({ message: "Type should not be DRAWDOWN or REPAYMENT" });
        else
            if(req.params.type == 'DRAWDOWN') 
                if(response.availableBalance - Number(req.params.amount) < 0) res.status(500).send({ message: "Drawdown amount cannot exceed balance" });
                else next();
            else
                if( Number(req.params.amount) + response.availableBalance > response.initialBalance) res.status(500).send({ message: "Repayment amount cannot exceed loan amount minus balance" });
                else next();
    else res.status(404).send({ message: "Loan not Found" })                                                                                            
}