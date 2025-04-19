import React from "react";
import { TextField } from "@mui/material";

interface EssayInputProps {
  essay: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EssayInput: React.FC<EssayInputProps> = ({ essay, onChange }) => {
  return (
    <TextField
      placeholder="Write your essay here..."
      multiline
      minRows={20}
      maxRows={30}
      value={essay}
      onChange={onChange}
      variant="outlined"
      fullWidth
      sx={{
        width: "1380px",
        marginBottom: "0%",
        borderStyle: "solid",
        borderWidth: "1px"
      }}
    />
  );
};

export default EssayInput;
