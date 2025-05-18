// src/components/DirectoryUploader.jsx

import {default as log} from "../loggers/roarr-logger.js";
import * as FileUtils from "../util/file_utils.js";
import React, { useState } from "react";


function getDirectoryStructure(files) {
  const tree = {};
  for (const file of files) {
    let temp = file.webkitRelativePath;
    const pathParts = temp.split("/");
    pathParts.reduce((acc, part, i) => {
      if (i === pathParts.length - 1) return acc;
      if (!acc[part]) acc[part] = {};
      return acc[part];
    }, tree);
  }
  return tree;
}


export default function DirectoryUploader() {
  const [validFiles, setValidFiles] = useState([]);
  const [skippedFiles, setSkippedFiles] = useState([]);
  const [directoryStructure, setDirectoryStructure] = useState(null);

  const handleDrop = async (event) => {
    event.preventDefault();
    const items = event.dataTransfer.items;
    const allFiles = [];
   // log.trace_data(event.dataTransfer);
    //log.trace_data(items);
    
    const traverseFileTree = async (item, path = "") => {
      return new Promise((resolve) => {
        if (item.isFile) {
          item.file((file) => {
            log.trace_data(file);
            if(FileUtils.isTextOrMarkdown(file)) {
              allFiles.push(file);
            }
            else log.trace('not a text file');
            resolve();
          });
        } else if (item.isDirectory) {
          const dirReader = item.createReader();
          dirReader.readEntries(async (entries) => {
            for (const entry of entries) {
              //log.trace_data(entry.text);
              await traverseFileTree(entry, path + item.name + "/");
            }
            resolve();
          });
        }
      });
    };

    const promises = [];
    for (const item of items) {
      const entry = item.webkitGetAsEntry();
      if (entry) promises.push(traverseFileTree(entry));
    }
    await Promise.all(promises);

    const valid = [], skipped = [];
    for (const file of allFiles) {
      if (await FileUtils.isProbablyTextFile(file)) {
        file.body = await FileUtils.getFileText(file);
        valid.push(file);
      } else {
        skipped.push(file.name);
        log.trace_data(file)
        log.trace("WAS NOT ACTUALLY TEXT OK..")
      }
    }

    setValidFiles(valid);
    setSkippedFiles(skipped);
    setDirectoryStructure(getDirectoryStructure(valid));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ border: "2px dashed #ccc", padding: 20, textAlign: "center" }}
    >
      <h2>Drag and Drop a Folder Here</h2>
      <p>Only markdown and text files will be processed</p>

      {skippedFiles.length > 0 && (
        <div>
          <h4>Skipped Files:</h4>
          <ul>
            {skippedFiles.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {validFiles.length > 0 && (
        <div>
          <h4>Included Files</h4>
        <ul>
          {
           validFiles.map((file,idx) => (
            <li key={idx}>{file.name}
            <div>
              {file.body}
            </div>
            </li>
           ))
          }
        </ul>
        </div>
      )}
      {directoryStructure && (
        <div>
          <h4>Detected Directory Structure</h4>
          <pre>{JSON.stringify(directoryStructure, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
