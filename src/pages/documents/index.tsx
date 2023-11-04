import React, { useState, useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { UploadDoc } from "@/components/UploadDoc";
import FilePreview from "@/components/FilePreview";

interface Document {
  name: string;
  uploadDate: string;
  category: string;
  imageURL: string;
  id: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>();
  const [newDocumentName, setNewDocumentName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("uploadDate");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/v1/get-documents/");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleEdit = (document: Document) => {
    setSelectedDocument(document);
    onOpen();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <Box p={4} mt={"50px"}>
      <UploadDoc onUpload={fetchDocuments} />
      <Box mt={5}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Document Name</Th>
              <Th>Upload Date</Th>
              <Th>Category</Th>
              <Th>Document Preview</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {documents.map((document) => (
              <Tr key={document.id}>
                <Td>{document.name}</Td>
                <Td>{formatDate(document.uploadDate)}</Td>
                <Td>{document.category}</Td>
                <Td>
                  <FilePreview url={document.imageURL} name={document.name} />
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => handleEdit(document)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    ml={2}
                    onClick={() => window.open(document.imageURL, "_blank")}
                  >
                    Download
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="New Document Name"
              value={newDocumentName}
              onChange={(e) => setNewDocumentName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Documents;
