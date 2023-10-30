import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Center } from "@chakra-ui/react";

export const UploadDoc: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("document", file);
      
      try {
        await axios.post("http://localhost:3001/v1/upload-document/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Document uploaded successfully!");
      } catch (error) {
        console.error("Error uploading document:", error);
      }
    }
  };

  return (
      <Box>
        <input type="file" accept=".pdf, .jpeg, .jpg, .png, .doc, .docx" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Upload Document</Button>
      </Box>
  );
};
