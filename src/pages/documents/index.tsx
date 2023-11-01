import { useState, useEffect } from "react";
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
  TableContainer,
} from "@chakra-ui/react";
import { UploadDoc } from "@/components/UploadDoc";
import FilePreview from "@/components/FilePreview";
import { FaSortUp, FaSortDown } from "react-icons/fa"; 

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [sortColumn, setSortColumn] = useState("uploadDate");

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

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  const sortedDocuments = [...documents].sort((a, b) => {
    if (sortColumn === "uploadDate") {
      if (sortAsc) {
        return a.uploadDate.localeCompare(b.uploadDate);
      } else {
        return b.uploadDate.localeCompare(a.uploadDate);
      }
    }
    return 0;
  });

  return (
    <Box p={4} mt={"50px"}>
      <UploadDoc />
      <Box mt={'20px'}>
        <Input
          placeholder="Search by document name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <TableContainer>

     
      <Table variant='striped' colorScheme='teal' mt={"50px"}>
        <Thead>
          <Tr>
            <Th fontSize="md" onClick={() => handleSort("name")}>
              Document Name
            </Th>
            <Th fontSize="md" onClick={() => handleSort("uploadDate")}>
  Upload Date
  {sortColumn === "uploadDate" && (
    <span style={{ cursor: "pointer", marginLeft: "4px" }}>
      {sortAsc ? <FaSortUp /> : <FaSortDown />}
    </span>
 )}
</Th>

            <Th fontSize="md">Document Preview</Th>
            <Th fontSize="md">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedDocuments.map((document, index) => (
            <Tr key={index}>
              <Td>{document.name}</Td>
              <Td>{formatDate(document.uploadDate)}</Td>
              <Td>
                <FilePreview url={document.url} name={document.name} />
              </Td>
              <Td>
                <Button
                  mt={2}
                  size="md"
                  colorScheme="blue"
                  onClick={() => window.open(document.url, "_blank")}
                >
                  Download
                </Button>
                <Button
                  mt={2}
                  size="md"
                  colorScheme="teal"
                  ml={"15px"}
                  onClick={() => handleEdit(document)}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
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
