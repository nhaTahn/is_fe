// components/Utils/EssayInput.tsx
import React from "react";
import { TextField } from "@mui/material";

interface EssayInputProps {
  essay: string;
  /** now emits the raw string, not the DOM event */
  onChange: (value: string) => void;
}

const EssayInput: React.FC<EssayInputProps> = ({ essay, onChange }) => (
  <TextField
    placeholder="Write your essay here..."
    multiline
    minRows={15}
    maxRows={25}
    value={essay}
    /** strip away the event and just send back the new text */
    onChange={e => onChange(e.target.value)}
    variant="outlined"
    fullWidth
    sx={{
      width: "100%",
      mb: 2,
      border: "1px solid #ccc",
      borderRadius: 1,
    }}
  />
);

export default EssayInput;
