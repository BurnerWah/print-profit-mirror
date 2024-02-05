// @ts-check

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

/**
 *
 * @param {import("./prop-types").QuoteActionsProps} props
 */
export function QuoteActions({ quote }) {
  return (
    <Stack direction="row" spacing={2}>
      <SaveQuote quote={quote} />
      <Button type="button">Update</Button>
    </Stack>
  );
}

/**
 * @param {import("./prop-types").QuoteActionsProps} props
 */
function SaveQuote({ quote }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(quote.name ?? '');

  const saveQuote = () => {
    dispatch({ type: 'SAGA/SAVE_QUOTE', payload: quote });
  };

  /**
   * @param {import('react').FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    saveQuote();
    setOpen(false);
  };

  const closeDialog = () => {
    setOpen(false);
    setName(quote.name ?? '');
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Save
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Save Quote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please specify a name for the quote.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            id="quoteName"
            name="quoteName"
            label="Quote Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
