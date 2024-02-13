// @ts-check

import * as calc from './calculations';
import {
  AddCostHeader,
  ConsistentNumericCell,
  ContributionFooter,
  CurrencyFooter,
  DollarCell,
  NumberFooter,
  PercentCell,
  ProductNameCell,
  TotalSellingPriceCell,
} from './cells';

/**
 * Consistent columns that are always present.
 * @type {import("./data-types").ProductColumnDef[]}
 */
export const consistentColumns = [
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: ProductNameCell,
    footer: 'Total',
    meta: {
      cellVariant: 'head',
      footerVariant: 'head',
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ConsistentNumericCell,
    aggregationFn: 'sum',
    footer: NumberFooter,
    meta: {
      inputMode: 'numeric',
      productKey: 'quantity',
      inputProps: {
        allowNegative: false,
        decimalScale: 0,
      },
    },
  },
  {
    accessorKey: 'selling_price_per_unit',
    header: 'Selling Price',
    cell: ConsistentNumericCell,
    meta: {
      inputMode: 'decimal',
      adornment: '$',
      productKey: 'selling_price_per_unit',
      inputProps: {
        allowNegative: false,
        decimalScale: 2,
        fixedDecimalScale: true,
      },
    },
  },
  {
    id: 'total_selling_price',
    // Total selling price can be null, in which case we're supposed to derive
    // it from the product.
    accessorFn: calc.totalSellingPrice,
    header: 'Total Selling Price',
    cell: TotalSellingPriceCell,
    aggregationFn: 'sum',
    footer: CurrencyFooter,
    meta: {
      inputMode: 'decimal',
      adornment: '$',
      productKey: 'total_selling_price',
    },
  },
];

/**
 * @type {import("./data-types").ProductColumnDef}
 */
export const addDynamicCostColumn = {
  id: 'addDynamicCost',
  header: AddCostHeader,
};

/** @type {import("./data-types").ProductColumnDef[]} */
export const calculatedCosts = [
  {
    id: 'creditCardFee',
    accessorFn: calc.creditCardFee,
    header: 'Credit Card Fee',
    cell: DollarCell,
    aggregationFn: 'sum',
    footer: CurrencyFooter,
  },
  {
    id: 'totalVariableCosts',
    accessorFn: calc.totalVariableCosts,
    header: 'Total Variable Costs',
    cell: DollarCell,
    aggregationFn: 'sum',
    footer: CurrencyFooter,
  },
];

/**
 * This has to be separated out from some other columns, since while it's
 * editable, it's below some calculated costs.
 * @type {import('./data-types').ProductColumnDef}
 */
export const estimatedHoursColumn = {
  accessorKey: 'estimated_hours',
  header: 'Estimated Hours',
  cell: ConsistentNumericCell,
  aggregationFn: 'sum',
  footer: NumberFooter,
  meta: {
    productKey: 'estimated_hours',
    inputProps: {
      allowNegative: false,
      decimalScale: 0,
    },
  },
};

/** @type {import("./data-types").ProductColumnDef[]} */
export const contributionColumns = [
  {
    id: 'contributionDollars',
    accessorFn: calc.contribution,
    header: 'Contribution $',
    cell: DollarCell,
    // This happens to work, but it's not how the spreadsheet calculates it.
    aggregationFn: 'sum',
    footer: CurrencyFooter,
  },
  {
    accessorFn: calc.contributionMargin,
    header: 'Contribution %',
    cell: PercentCell,
    footer: ContributionFooter,
    meta: {
      footerContribDivisor: 'total_selling_price',
      footerContribFormat: 'percent',
    },
  },
  {
    accessorFn: calc.contributionPerHour,
    header: 'Contribution / Hour',
    cell: DollarCell,
    footer: ContributionFooter,
    meta: {
      footerContribDivisor: 'estimated_hours',
      footerContribFormat: 'currency',
    },
  },
];
