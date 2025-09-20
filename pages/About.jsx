import React from "react";
import { Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{ p: { xs: 2, sm: 4, md: 6 }, mt: { xs: 15, sm: 9, md: 9, lg: 8 } }}
    >
      <Typography variant="h4" gutterBottom>
        About This Project
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        The Library Management Dashboard is a responsive React.js application
        designed to efficiently manage a collection of books. It provides a
        user-friendly interface for viewing, adding, editing, and deleting book
        records. The application leverages modern frontend technologies such as
        React.js, Material-UI for UI components, and React Hook Form for
        seamless form validations.
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        Key features include:
        <ul>
          <li>Displaying books in a paginated table with 10 books per page.</li>
          <li>Real-time search by book title or author.</li>
          <li>Filters for book genre and status (Available or Issued).</li>
          <li>
            Add/Edit book functionality via modal forms with validation rules.
          </li>
          <li>
            Delete books with confirmation and toast notifications for success
            or error.
          </li>
          <li>Tracking when a book is added or updated with timestamps.</li>
          <li>
            Highlighting new arrivals if added within the last 30 minutes.
          </li>
        </ul>
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <ul style={{ listStyle: "none" }}>
          <li>
            The application integrates with a mock REST API (
            <code>JSON-server</code>) for persistent data storage.{" "}
          </li>
          <li>
            Redux Toolkit manages the global state for efficient updates and
            reactivity, while React Router handles navigation between pages such
            as Home and About.
          </li>
        </ul>
      </Typography>

      <Typography variant="body1">
        The dashboard emphasizes responsive design, accessibility, and
        performance optimization. Users can efficiently manage a library
        collection from any device while maintaining a clear overview of book
        statistics, including total books, issued books, available books, and
        new arrivals.
      </Typography>

      <Typography variant="body1" paragraph>
        This project serves as a comprehensive demonstration of full-stack
        frontend skills using React.js, showcasing state management, form
        handling, API integration, and modern UI/UX best practices.
      </Typography>
    </Box>
  );
};

export default About;
