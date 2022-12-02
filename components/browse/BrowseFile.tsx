import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FileExtension } from "./fileExtension";
import style from "../../styles/file.module.css";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const BrowseFile = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  fileValues = [],
  viewType,
  ...otherProps
}) => {
  const fileInputField = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField?.current!.click();
  };

  const addNewFiles = (newFiles) => {
    for (const file of newFiles) {
      if (
        otherProps.accept
          .split(",")
          .includes(FileExtension.find((ext) => ext.type === file.type)?.name)
      ) {
        if (file.size <= maxFileSizeInBytes) {
          if (!otherProps.multiple) {
            return { file };
          }
          files[file.name.toLowerCase()] = file;
        } else {
          toast.error(`File size too large. file size less than 5mb.`);
        }
      } else {
        toast.error(
          `User cannot upload ${
            FileExtension.find((ext) => ext.type === file.type)?.name
          } form here`
        );
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  // use Effect
  useEffect(() => {
    const controller = new AbortController();

    if (!!fileValues && Array.isArray(fileValues) && fileValues.length > 0)
      setFiles(fileValues);
    return () => controller.abort();
  }, [fileValues]);

  return (
    <div className={style.header}>
      <input
        className={style.input}
        type="file"
        ref={fileInputField}
        onChange={handleNewFileUpload}
        title=""
        value=""
        {...otherProps}
      />

      <button
        type="button"
        onClick={handleUploadBtnClick}
        id="button"
        className={style.btnWrap}
      >
        Upload a file
      </button>
      <>
        {Object.keys(files).length === 0 ? (
          <></>
        ) : (
          Object.keys(files).map((fileName, index) => {
            const file = files[fileName];

            const name = { ...file.name };
            return (
              <motion.div key={index} className={style.fileContainer}>
                <div>
                  <span>
                    {name[15] !== undefined
                      ? file.name.split(".")[0].substring(0, 16).concat("...")
                      : file.name.split(".")[0]}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </>
    </div>
  );
};

export default BrowseFile;
