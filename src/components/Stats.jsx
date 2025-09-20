import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { fetchbooks } from "../redux/slices/bookslice";
import { useDispatch, useSelector } from "react-redux";

const Stats = () => {
  const dispatch = useDispatch();
  const { items: books, loading, error } = useSelector((stats) => stats.books);

  useEffect(() => {
    dispatch(fetchbooks());
  }, [dispatch]);

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.status === "Available").length;
  const issuedBooks = books.filter((b) => b.status === "Issued").length;
  const now = new Date();
  const newArrivals = books.filter((book) => {
    if (!book.createdAt) return false;
    const createdAt = new Date(book.createdAt);
    const diffInMinutes = (now - createdAt) / (1000 * 60);
    return diffInMinutes <= 30;
  }).length;

  const stats = [
    { label: "Total Books", value: totalBooks, color: "#1772ccff" },
    { label: "Issued Books", value: issuedBooks, color: "#d32f2f" },
    { label: "Available Books", value: availableBooks, color: "#2e7d32" },
    { label: "New Arrival", value: newArrivals, color: "rgba(17, 170, 50, 1)" },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3, md: 4 },
        mt: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        alignItems="stretch"
        sx={{ justifyContent: "center" }}
      >
        {stats.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                width: "70%",
                px: 3,
                py: 5,
                borderRadius: "16px",
                boxShadow: 3,
                textAlign: "center",
                background: item.color,
                color: "white",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Stats;
