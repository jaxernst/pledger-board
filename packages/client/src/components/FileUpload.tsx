import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

export function FileUpload({
  onFileSelected,
  file,
}: {
  onFileSelected: (file: File) => void;
  file?: File | null;
}) {
  return (
    <FileUploader
      multiple={false}
      maxSize={8}
      handleChange={onFileSelected}
      fileOrFiles={file}
      name="file"
      types={fileTypes}
    />
  );
}
