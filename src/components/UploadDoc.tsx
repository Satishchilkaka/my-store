import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  Center,
  useToast,
  Flex,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface UploadDocProps {
  onUpload: () => void;
}

export const UploadDoc: React.FC<UploadDocProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]); // Store categories
  const toast = useToast();

  const validateSelectedFile = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      if (!file) {
        reject(new Error("No file selected."));
      } else {
        const allowedExtensions = [
          ".pdf",
          ".jpeg",
          ".jpg",
          ".png",
          ".doc",
          ".docx",
        ];
        const extname = file.name
          .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
          .toLowerCase();

        if (allowedExtensions.includes(extname)) {
          resolve();
        } else {
          reject(new Error("Invalid file type."));
        }
      }
    });
  };

  const handleInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.length >= 3 && /^[a-zA-Z]+$/.test(newCategory)) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
    } else {
      toast({
        title: "Invalid Category",
        description: "Category names must be at least 3 characters and contain only letters.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpload = async () => {
    if (selectedFile && selectedCategory) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("category", selectedCategory);

      try {
        const uploadResponse = await axios.post(
          "http://localhost:3001/v1/upload-document/",
          formData
        );

        if (uploadResponse.status === 200) {
          toast({
            title: "File Upload Successful",
            description: "The file has been successfully uploaded.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setSelectedFile(null);

          if (onUpload) {
            onUpload();
          }
        } else {
          console.error("File upload failed:", uploadResponse.statusText);
        }
      } catch (error) {
        console.error("File upload failed:", error);
        toast({
          title: "File Upload Failed",
          description:
            "There was an error while uploading the file. Please re-try.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      console.error("No file selected or category not provided.");
      toast({
        title: "Missing Information",
        description: "Please select a file and a category before uploading.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex rounded="md">
      <Box>
        <label htmlFor="fileInput">
          <Button variant="primary" as="span">
            <FaCloudUploadAlt />
            &nbsp; Choose File
          </Button>
          <input
            type="file"
            id="fileInput"
            accept=".pdf, .jpeg, .jpg, .png, .doc, .docx, .txt, .zip"
            style={{ display: "none" }}
            onChange={(event) => {
              handleInputFile(event);
            }}
          />
        </label>
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </Box>

      <Box ml={5} mr={5}>
        <InputGroup>
          <Input
            colorScheme="green"
            borderColor="#4391F2"
            border="md"
            variant="outline"
            placeholder="Enter Category or Tag name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
<InputLeftAddon>
  <Button onClick={handleAddCategory}>Add</Button>
</InputLeftAddon>
        </InputGroup>
      </Box>

      <Button variant="primary" mt={2} colorScheme="teal" onClick={handleUpload}>
        Upload Document
      </Button>
    </Flex>
  );
};
