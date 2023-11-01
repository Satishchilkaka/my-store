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
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { UploadDoc } from "@/components/UploadDoc";

interface Document {
  name: string;
  uploadDate: string;
  url: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>();
  const [newDocumentName, setNewDocumentName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/v1/get-documents/");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (document: Document) => {
    setSelectedDocument(document);
    onOpen();
  };

  const handleRename = () => {
    if (selectedDocument && newDocumentName) {
      axios
        .put(`http://localhost:3001/v1/update-document/${selectedDocument.name}`, {
          newDocumentName: newDocumentName,
        })
        .then((response) => {
          if (response.status === 200) {
            const updatedDocuments = documents.map((doc) => {
              if (doc === selectedDocument) {
                return { ...doc, name: newDocumentName };
              }
              return doc;
            });
            setDocuments(updatedDocuments);
            onClose();
          }
        })
        .catch((error) => {
          console.error('Error renaming document:', error);
        });
    }
  };

  const handleDelete = () => {
    if (selectedDocument) {
      axios
        .delete(`http://localhost:3001/v1/delete-document/${selectedDocument.name}`)
        .then((response) => {
          if (response.status === 200) {
            const updatedDocuments = documents.filter((doc) => doc !== selectedDocument);
            setDocuments(updatedDocuments);
            onClose();
          }
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
        });
    }
  };

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
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => window.open(document.url, "_blank")}
                >
                  Download
                </Button>
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() => handleEdit(document)}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
            <Button colorScheme="teal" mr={3} onClick={handleRename}>
              Rename
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Documents;
