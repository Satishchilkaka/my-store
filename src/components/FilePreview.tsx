import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

interface FilePreviewProps {
  url: string;
  name: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ url, name }) => {
  const ext = (name.split(".").pop() || "").toLowerCase();

  if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif") {
    //  image 
    return <img src={url} alt="File Preview" width="200" />;
  } else if (ext === "pdf") {
    //  PDF files
    return (
      <iframe
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        width="200"
        height="200"
      ></iframe>
    );
  } else if (ext === "doc" || ext === "docx" || ext === "txt") {
    // Word and Text files
    return (
      <Link href={url} target="_blank" rel="noreferrer">
        <Text>{name}</Text>
      </Link>
    );
  } else {
    return <Text>Unsupported File Type</Text>;
  }
};

export default FilePreview;
