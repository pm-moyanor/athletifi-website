import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowUp,
  faTimes,
  faRotateRight,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

interface FileWithPreview extends File {
  preview: string;
  status: 'uploading' | 'success' | 'error';
}

interface UploadProgressState {
  [key: string]: number;
}

const DragDropUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgressState>({});

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          status: 'uploading' as const,
        }),
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      // Simulate file upload
      newFiles.forEach((file) => {
        simulateFileUpload(file);
      });
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/x-m4v': ['.m4v'],
      'video/webm': ['.webm'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
  });

  const simulateFileUpload = (file: FileWithPreview) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.name === file.name ? { ...f, status: 'success' as const } : f,
          ),
        );
      }
    }, 500);
  };

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setUploadProgress((prev) => {
      const { [fileName]: removed, ...rest } = prev;
      return rest;
    });
  };

  const retryUpload = (file: FileWithPreview) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.name === file.name ? { ...f, status: 'uploading' as const } : f,
      ),
    );
    simulateFileUpload(file);
  };

  return (
    <div className="">
      <div
        {...getRootProps()}
        className="border border-dashed shadow-md border-skyblue border-opacity-50 rounded p-8 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <div
          className="border border-skyblue p-4 w-20 h-20 flex justify-center items-center
        rounded-full mx-auto mb-6"
        >
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            size="2xl"
            className="text-skyblue"
          />
        </div>
        <p className="text-white">
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag & drop video file or click to select files'}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Supported formats: MP4, M4V, WebM, JPEG, PNG, GIF, WebP
        </p>
      </div>

      <div className="mt-4">
        {files.map((file) => (
          <motion.div
            initial={{ opacity: 0, height: 0, x: -20 }}
            animate={{ opacity: 1, height: 'auto', x: 0 }}
            exit={{ opacity: 0, height: 0, x: -20 }}
            transition={{ duration: 0.08 }}
            key={file.name}
            className="flex items-center bg-cardsDark opacity-50 rounded-md mb-2 overflow-hidden"
          >
            <div
              className={`w-2 h-10 mr-3 ${
                file.status === 'uploading'
                  ? 'bg-partnersBorders'
                  : file.status === 'success'
                    ? 'bg-green-500'
                    : 'bg-chartRed'
              }`}
            ></div>
            <span className="flex-grow text-white truncate text-sm">
              {file.name}
            </span>
            <div className="flex items-center">
              {file.status === 'uploading' && (
                <FontAwesomeIcon
                  icon={faCircleNotch as IconDefinition}
                  spin
                  className="text-skyblue mr-4"
                />
              )}
              {file.status === 'success' && (
                <button
                  onClick={() => retryUpload(file)}
                  className="text-primary opacity-80 hover:text-skyblue mr-6 flex items-center"
                >
                  <FontAwesomeIcon icon={faRotateRight as IconDefinition} />
                  <span
                    className="ml-[4px]
                   text-sm underline "
                  >
                    try again
                  </span>
                </button>
              )}
              <button
                onClick={() => removeFile(file.name)}
                className="text-red-500 hover:text-red-400 pr-4"
              >
                <FontAwesomeIcon icon={faTimes as IconDefinition} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DragDropUpload;
