import type {
  CellContext,
  Getter,
  HeaderContext,
  Row,
  Table,
} from '@tanstack/react-table';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { Product, Quote } from './data-types';

export type CellProps<TValue> = CellContext<Product, TValue>;
export type HeaderProps<TValue> = HeaderContext<Product, TValue>;

export interface PricingTableProps {
  readonly quote: Quote;
  readonly setQuote: Dispatch<SetStateAction<Quote>>;
}

export interface TotalsTableProps {
  readonly quote: Quote;
  readonly table: Table<Product>;
  readonly setQuote: Dispatch<SetStateAction<Quote>>;
}

export interface TotalsTableRowProps {
  readonly table: Table<Product>;
  readonly column: string;
  readonly title: string;
}

export interface ContributionRowsProps {
  readonly slots: {
    readonly marginInput: ReactNode;
  };
  readonly state: {
    readonly manualPrice: number;
  };
  readonly profitMarginTotalPrice: number;
  readonly totalVariableCosts: number;
  readonly estimatedTotalHours: number;
}

export interface ProductNameCellProps {
  /** the getValue function from tanstack tables */
  readonly getValue: Getter<string>;
  /** the table the cell is in */
  readonly table: Table<Product>;
  /** the row the cell is in */
  readonly row: Row<Product>;
}

export interface DollarCellProps {
  readonly getValue: Getter<number>;
}

export interface PercentCellProps {
  readonly getValue: Getter<number>;
}

export interface AddCostHeaderProps {
  readonly table: Table<Product>;
}

export interface AddProductCellProps {
  readonly table: Table<Product>;
}

export interface QuoteActionGroupProps {
  readonly quote: Quote;
  readonly setQuote: Dispatch<SetStateAction<Quote>>;
}

export interface SaveQuoteProps {
  readonly quote: Quote;
  readonly setQuote: Dispatch<SetStateAction<Quote>>;
}

export interface UpdateQuoteProps {
  readonly quote: Quote;
}

export interface NewQuoteProps {
  readonly setQuote: Dispatch<SetStateAction<Quote>>;
}

export interface QuoteSnackbarProps {
  readonly message: ReactNode;
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly autoHideDuration?: number;
}

export interface PricingTabProps {
  readonly quote: Quote;
  readonly setQuote: Dispatch<SetStateAction<Quote>>;
}
