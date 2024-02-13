import { InputProps, TableCellProps } from '@mui/material';
import { RowData } from '@tanstack/table-core';
import { Dispatch, SetStateAction } from 'react';
import { Product, Quote } from './data-types';

// This .d.ts file lets us define properties on the table's meta option
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    setQuote: Dispatch<SetStateAction<Quote>>;
    updateMode: boolean;
    costNames: string[];
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    inputMode?: InputProps['inputMode'];
    adornment?: string;
    costName?: string;
    productKey?: keyof Omit<Product, 'costs' | 'name'>;
    cellVariant?: TableCellProps['variant'];
    footerVariant?: TableCellProps['variant'];
    footerContribDivisor?: keyof Omit<Product, 'id' | 'costs' | 'name'>;
    footerContribFormat?: 'percent' | 'currency' | 'accounting' | 'number';
  }
}
