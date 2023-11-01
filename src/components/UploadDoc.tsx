import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Input, Center, useToast, Flex } from "@chakra-ui/react";

export const UploadDoc: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const validateSelectedFile = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      if (!file) {
        reject(new Error("No file selected."));
      } else {
        const allowedExtensions = [".pdf", ".jpeg", ".jpg", ".png", ".doc", ".docx"];
        const extname = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

        if (allowedExtensions.includes(extname)) {
          resolve();
        } else {
          reject(new Error("Invalid file type."));
        }
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      setIsLoading(true);
      validateSelectedFile(file)
        .then(() => setIsLoading(false))
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const uploadResponse = await axios.post("http://localhost:3001/v1/upload-document/", formData);

        if (uploadResponse.status === 200) {
          toast({
            title: "File Upload Successful",
            description: "The file has been successfully uploaded.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setSelectedFile(null);
        } else {
          console.error("File upload failed:", uploadResponse.statusText);
        }
      } catch (error) {
        console.error("File upload failed:", error);
        toast({
          title: "File Upload Failed",
          description: "There was an error while uploading the file. Please re-try.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      console.error("No file selected.");
    }
  };

  return (
   
    <Flex alignItems="center" borderWidth="1px" p="2" rounded="md">
      <Input 
            variant="soft-rounded"
            colorScheme="green"
            border={"medium"}
            borderColor="#999999"
        type="file"
        accept=".pdf, .jpeg, .jpg, .png, .doc, .docx, .txt, .zip"
        onChange={handleFileChange}
      />
      <Button mt={2} colorScheme="teal" onClick={handleUpload} ml="2">
        Upload Document
      </Button>
    </Flex>
   
  );
};
