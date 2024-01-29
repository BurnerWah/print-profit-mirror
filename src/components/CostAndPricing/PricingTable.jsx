// @ts-check

import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { staticColumns } from './columns';

/** @typedef {import('@tanstack/react-table').ColumnDef<Product>[]} ProductColumn */

/**
 * @param {object} props
 * @param {Quote} props.quote
 */
export function PricingTable({ quote }) {
  /** @type {[ProductColumn, import('react').Dispatch<ProductColumn>]} */
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /** @type {[ProductColumn, import('react').Dispatch<ProductColumn>]} */
  const [columns, setColumns] = useState([...staticColumns, ...dynamicColumns]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Rule breaks on this code
  useEffect(() => {
    setDynamicColumns(
      quote.products[0].costs.map((cost, index) => ({
        accessorFn: (row) => row.costs[index].value,
        header: cost.name,
      })),
    );
  }, [quote.products]);

  useEffect(() => {
    setColumns([...staticColumns, ...dynamicColumns]);
  }, [dynamicColumns]);

  return <DataTable data={quote.products} columns={columns} />;
}
