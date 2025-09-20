import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";

const BookFormModal = ({
  open,
  onClose,
  onSubmit = () => {},
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      name: "",
      author: "",
      year: "",
      genre: "Fiction",
      status: "Available",
      issuedTo: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  useEffect(() => {
    reset(
      defaultValues || {
        name: "",
        author: "",
        year: "",
        genre: "Fiction",
        status: "Available",
      }
    );
  }, [defaultValues, reset]);

  const statusValue = useWatch({
    control,
    name: "status",
    defaultValue: defaultValues?.status || "Available",
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{defaultValues ? "Edit Book" : "Add Book"}</DialogTitle>
      <form
  onSubmit={handleSubmit((data) => {
    onSubmit(data);
    reset({ name: '', author: '', year: '', genre: 'Fiction', status: 'Available' });
  })}
>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Book Name"
            autoFocus
            {...register("name", { required: "Book name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Author"
            {...register("author", { required: "Author is required" })}
            error={!!errors.author}
            helperText={errors.author?.message}
          />
          <TextField
            label="Year"
            type="number"
            {...register("year", {
              required: "Year is required",
              min: { value: 1000, message: "Enter a valid year" },
              max: {
                value: new Date().getFullYear(),
                message: "Year cannot be in future",
              },
            })}
            error={!!errors.year}
            helperText={errors.year?.message}
          />

          <Controller
            name="genre"
            control={control}
            rules={{ required: "Genre is Required." }}
            render={({ field }) => (
              <TextField
                select
                label="Genre"
                {...field}
                error={!!errors.genre}
                helperText={errors.genre?.message}
              >
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
                <MenuItem value="Scientific-Literature">Scientific-Literature</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="status"
            control={control}
            defaultValue={defaultValues?.status || "Available"}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                select
                label="Status"
                {...field}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Issued">Issued</MenuItem>
              </TextField>
            )}
          />

          {statusValue === "Issued" && (
            <TextField
              label="Issued To"
              {...register("issuedTo", {
                required: "Issued to is required when book is issued.",
              })}
              error={!!errors.issuedTo}
              helperText={errors.issuedTo?.message}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {defaultValues ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookFormModal;
