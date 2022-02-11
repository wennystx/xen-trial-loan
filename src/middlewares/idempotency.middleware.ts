import { Request, Response, NextFunction } from "express";
import { SimpleConsoleLogger } from "typeorm";

const dummyCache = {};
var cacheKey: string;
var cacheRes: Response;

export const idempotency = async ( req: Request, res: Response, next: NextFunction ) => {
    console.log('this is idempotency middleware');
    console.log(req.get('idempotency-key'));
    const idempotencyKey = req.get('idempotency-key');

	if (!idempotencyKey) res.status(400).send({ message: "idempotency-key is mandatory" });
    

    if(cacheKey == idempotencyKey){
        console.log("cache=idempotencyKey");  
         res.status(304).send({ message: 'not modified'});
        // console.log(cacheRes);
        // res.send(cacheRes);
    }  else{ 

        await next();
        
        cacheKey = idempotencyKey as string;    
        // cacheRes = res.body;
        console.log("cache:" + cacheKey);  
    }  
}