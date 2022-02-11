import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

// export const DecimalToString = (decimals: number = 2) => (decimal?: Decimal) => decimal?.toFixed?.(decimals) || decimal;