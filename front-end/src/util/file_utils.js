
export function isTextOrMarkdown(file) {
  const validMimePrefixes = ["text/", "application/json"];
  const validExtensions = [".txt", ".md", ".json"];
  const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

  // Check MIME type and extension
  return (
    validMimePrefixes.some((prefix) => file.type.startsWith(prefix)) ||
    validExtensions.includes(ext)
  );
}

export function isProbablyTextFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const blob = file.slice(0, 512); // Read first 512 bytes

    reader.onload = function (e) {
      const text = e.target.result;
      let suspicious = 0;
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        // Allow printable ASCII, newline, tab
        if (
          (charCode >= 32 && charCode <= 126) || 
          charCode === 9 || 
          charCode === 10 || 
          charCode === 13
        ) {
          continue;
        }
        suspicious++;
      }
      const ratio = suspicious / text.length;
      resolve(ratio < 0.1); // Less than 10% binary characters
    };

    reader.onerror = () => resolve(false);
    reader.readAsText(blob);
  });
}

export function getFileText(file) {
    return new Promise((resolve,reject) => {
      
    const reader = new FileReader();
    
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    
    reader.onerror = function() {
      reject("Error reading the file.");
    };

    reader.readAsText(file);
    });
  }


