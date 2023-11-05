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
  const [updatedDocumentName, setUpdatedDocumentName] = useState("");


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


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Update
  const handleEdit = (document: Document) => {
    setSelectedDocument(document);
    setUpdatedDocumentName(document.name); 
    onOpen();
  };
  const handleSave = async () => {
    console.log(selectedDocument);
    if (selectedDocument && updatedDocumentName) {
      try {
        const response = await axios.put(
          `http://localhost:3001/v1/update-document/${selectedDocument.id}`,
          {
            newDocumentName: updatedDocumentName,
          }
        );
  
        if (response.status === 200) {
          // Close the modal and update the document name
          onClose();
          // Update the document name in the local state if necessary
          setDocuments((prevDocuments) => {
            return prevDocuments.map((doc) =>
              doc.id === selectedDocument.id
                ? { ...doc, name: updatedDocumentName }
                : doc
            );
          });
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };
  
  //delete
  const handleDelete = async () => {
    if (!selectedDocument) {
      return;
    }
  
    const { id, name } = selectedDocument;
  
    try {
      const response = await axios.delete(`http://localhost:3001/v1/delete-document/${id}`);
  
      if (response.status === 200) {
        onClose(); 
        fetchDocuments(); 
      } else {
        console.error("Error deleting document:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
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
        value={updatedDocumentName}
        onChange={(e) => setUpdatedDocumentName(e.target.value)}
      />
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="teal" mr={3} onClick={handleSave}>
        Save
      </Button>
      <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
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
