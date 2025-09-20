import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Typography,
  Button,
  TablePagination,
  Alert,
  Snackbar,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addBooks,
  deleteBook,
  fetchbooks,
  updateBook,
} from "../redux/slices/bookslice";
import BookFormModal from "./BookFormModal";
import ConfirmDialog from "./ConfirmDialouge";
import Header from "./header";
import { Controller } from "react-hook-form";

const BookTable = () => {
  const dispatch = useDispatch();
  const { items: books, loading, error } = useSelector((state) => state.books);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchbooks());
  }, [dispatch]);

  const totalPages = Math.max(1, Math.ceil(books.length / rowsPerPage));
  const start = page * rowsPerPage;
  const visible = books.slice(start, start + rowsPerPage);

  const handleOpenAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleSubmitForm = async (data) => {
    try {
      if (editing && editing.id) {
        await dispatch(updateBook({ id: editing.id, data })).unwrap();
        setToast({
          open: true,
          msg: "Book Updated Successfully!",
          severity: "success",
        });
      } else {
        await dispatch(addBooks(data)).unwrap();
        setToast({
          open: true,
          msg: "Book Added Successfully!",
          severity: "success",
        });
      }
      setOpenForm(false);
      setEditing(null);
    } catch (err) {
      console.error("Error saving book:", err);
      setToast({
        open: true,
        msg: `Error saving book: ${err.message || "Unknown error"}`,
        severity: "error",
      });
    }
  };

  function confirmDelete(book) {
    setToDelete(book);
    setConfirmOpen(true);
  }

  async function handleDelete() {
    try {
      await dispatch(deleteBook(toDelete.id)).unwrap();
      setToast({
        open: true,
        msg: "Book Deleted Successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Error deleting book:", err);
      setToast({ open: true, msg: "Delete Failed.", severity: "error" });
    } finally {
      setConfirmOpen(false);
    }
  }

  const filteredBooks = books
    .filter(
      (book) =>
        book.name?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((book) => (statusFilter ? book.status === statusFilter : true))
    .filter((book) => (genreFilter ? book.genre === genreFilter : true));

  const pagination = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Header onAdd={handleOpenAdd} />

<Box sx={{ mt: 2, p: 2 }}>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      mb: 2,
      gap: 2,
    }}
  >
    <Typography variant="h6" fontWeight="bold">
      📚 Books List
    </Typography>

    <TextField
      label="Search by Name or Author"
      variant="outlined"
      size="small"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(0);
      }}
      sx={{ width: '25%' }}
    />
  </Box>

  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2, justifyContent: 'end' }}>
    <TextField
      select
      label="Status"
      variant="outlined"
      size="small"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      sx={{ width: "12%" }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Available">Available</MenuItem>
      <MenuItem value="Issued">Issued</MenuItem>
    </TextField>

    <TextField
      select
      label="Genre"
      variant="outlined"
      size="small"
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value)}
      sx={{ width: '12%' }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Fiction">Fiction</MenuItem>
      <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
      <MenuItem value="Mystery">Mystery</MenuItem>
      <MenuItem value="Thriller">Thriller</MenuItem>
      <MenuItem value="Romance">Romance</MenuItem>
      <MenuItem value="Fantasy">Fantasy</MenuItem>
      <MenuItem value="Science-Fiction">Science-Fiction</MenuItem>
      <MenuItem value="Biography">Biography</MenuItem>
      <MenuItem value="History">History</MenuItem>
      <MenuItem value="Children">Children</MenuItem>
      <MenuItem value="Young-Adults">Young-Adults</MenuItem>
    </TextField>
  </Box>


        <TableContainer
          component={Paper}
          sx={{ borderRadius: "12px", boxShadow: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Book Name</b>
                </TableCell>
                <TableCell>
                  <b>Author</b>
                </TableCell>
                <TableCell>
                  <b>Year</b>
                </TableCell>
                <TableCell>
                  <b>Genre</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell align="center">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagination.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEditing(book);
                        setOpenForm(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => confirmDelete(book)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBooks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No books found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredBooks.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </TableContainer>

        <BookFormModal
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setEditing(null);
          }}
          onSubmit={handleSubmitForm}
          defaultValues={editing}
        />
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
          title="Delete book?"
        />
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        >
          <Alert severity={toast.severity}>{toast.msg}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default BookTable;
