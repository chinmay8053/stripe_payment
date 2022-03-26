import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./container.styles.scss";

export default function Container() {
  const [name, setName] = useState("");

  return (
    <Box sx={{ backgroundColor: "pink", borderRadius: "30px", padding: "20px 30px", minWidth: "600px" }}>
      <TextField
        sx={{}}
        id="filled-basic"
        label="name"
        variant="filled"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Box>
  );
}
