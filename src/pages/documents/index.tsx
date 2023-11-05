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
import { BiSolidSortAlt } from "react-icons/bi";

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
      const response = await axios.get(
        "http://localhost:3001/v1/get-documents/"
      );
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const handleEdit = (document: Document) => {
    setSelectedDocument(document);
    setUpdatedDocumentName(document.name);
    onOpen();
  };

  const handleSave = async () => {
    if (selectedDocument && updatedDocumentName) {
      try {
        const response = await axios.put(
          `http://localhost:3001/v1/update-document/${selectedDocument.id}`,
          {
            newDocumentName: updatedDocumentName,
          }
        );

        if (response.status === 200) {
          onClose();
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

  const handleDelete = async () => {
    if (!selectedDocument) {
      return;
    }

    const { id, name } = selectedDocument;

    try {
      const response = await axios.delete(
        `http://localhost:3001/v1/delete-document/${id}`
      );

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

  const handleSearch = () => {
    // Perform a search based on the searchQuery
    // Update the 'documents' state with the search results
  };
  const handleSort = (column: string) => {
    // Toggle sorting direction if the same column is clicked again
    if (column === sortColumn) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
    setDocuments((prevDocuments) => {
      return prevDocuments
        .filter(
          (document) =>
            document.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            document.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          if (sortColumn === "name") {
            return sortAsc
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortColumn === "uploadDate") {
            return sortAsc
              ? a.uploadDate.localeCompare(b.uploadDate)
              : b.uploadDate.localeCompare(a.uploadDate);
          } else {
            return sortAsc
              ? a.category.localeCompare(b.category)
              : b.category.localeCompare(a.category);
          }
        });
    });
  };

  return (
    <Box p={4} mt={"50px"}>
      <UploadDoc onUpload={fetchDocuments} />
      <Input
        placeholder="Search by document or category"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th className="sortable" onClick={() => handleSort("name")}>
              Document Name{" "}
              {sortColumn === "name" &&
                (sortAsc ? <BiSolidSortAlt /> : <BiSolidSortAlt />)}
            </Th>
            <Th className="sortable" onClick={() => handleSort("uploadDate")}>
              <div className="sortable-container">
                <span>Upload Date</span>
                {sortColumn === "uploadDate" && (
                  <div className="sortable-icon">
                    {sortAsc ? <BiSolidSortAlt /> : <BiSolidSortAlt />}
                  </div>
                )}
              </div>
            </Th>

            <Th onClick={() => handleSort("category")}>
              Category
              {sortColumn === "category" &&
                (sortAsc ? <BiSolidSortAlt /> : <BiSolidSortAlt />)}
            </Th>
            <Th>Document Preview</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {documents
            .filter(
              (document) =>
                document.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                document.category
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
              if (sortColumn === "name") {
                return sortAsc
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name);
              } else if (sortColumn === "uploadDate") {
                return sortAsc
                  ? a.uploadDate.localeCompare(b.uploadDate)
                  : b.uploadDate.localeCompare(a.uploadDate);
              } else {
                return sortAsc
                  ? a.category.localeCompare(b.category)
                  : b.category.localeCompare(a.category);
              }
            })
            .map((document) => (
              <Tr key={document.id}>
                <Td>{document.name}</Td>
                <Td>{formatDate(document.uploadDate)}</Td>
                <Td>{document.category}</Td>
                <Td>
                  <FilePreview url={document.imageURL} name={document.name} />
                </Td>
                <Td>
                  <Button variant={"secondary"}
                  
                 
                    onClick={() => handleEdit(document)}
                  >
                    Edit
                  </Button>
                  <Button variant={"secondary"}
                  
                  
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
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
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
