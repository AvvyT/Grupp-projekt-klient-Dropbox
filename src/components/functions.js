import { useState } from "react";
export function FetchPath(cb, path, dbx) {
  let tempResponse;
  dbx
    .filesListFolder({ path: path === "/" ? path.replace("/", "") : path })
    .then((res) => {
      return res.entries;
    })
    .then((res) => {
      tempResponse = res;
      dbx
        .filesGetThumbnailBatch({
          entries: res
            .filter((file) => file[".tag"] === "file")
            .map((file) => ({
              path: file.path_lower,
              size: "w32h32"
            }))
        })
        .then((res) => {
          const data = tempResponse.map((file) => {
            if (file[".tag"] !== "folder") {
              return {
                ...file,
                thumbnail: res.entries.filter(
                  (thu) =>
                    thu &&
                    thu[".tag"] === "success" &&
                    thu.metadata.name === file.name
                )[0]
              };
            } else {
              return file;
            }
          });
          cb(data);
        });
    });
}
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
