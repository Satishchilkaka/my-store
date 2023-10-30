import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text
} from "@chakra-ui/react";
import { UploadDoc } from '@/components/UploadDoc'

interface Document {
  name: string;
  uploadDate: string;
  url: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Place your API call here
    const fetchData = async () => {
      try {
        const response = await axios.get("/v1/get-documents");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Box p={4}>
      <UploadDoc />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Document Name</Th>
            <Th>Upload Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {documents.map((document, index) => (
            <Tr key={index}>
              <Td>{document.name}</Td>
              <Td>{document.uploadDate}</Td>
              <Td>
                <a href={document.url} target="_blank" rel="noreferrer">
                  <Button size="sm" colorScheme="blue">Download</Button>
                </a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Documents;
