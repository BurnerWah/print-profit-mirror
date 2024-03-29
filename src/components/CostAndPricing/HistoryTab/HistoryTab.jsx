import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuoteTableRow from './QuoteTableRow';

export default function HistoryTab({ setTab }) {
  const dispatch = useDispatch();
  const quoteHistory = useSelector((store) => store.quote.quoteHistory);

  // fetches all the quotes for a given user's company
  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_QUOTE_HISTORY',
    });
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Quote id</TableCell>
              <TableCell>Quote name</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Date created</TableCell>
              <TableCell>Number of products</TableCell>
              <TableCell>Total selling price</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quoteHistory.quotes?.map((row) => (
              <QuoteTableRow
                key={row.id}
                id={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                row={row}
                setTab={setTab}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
