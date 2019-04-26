import React, { useState, useEffect } from "react";
import { Dropbox } from "dropbox";

const ContainerDivStyle = {
  flex: 6,
  height: "100%",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "start"
};
const tableStyle = {
  width: "100%",
  textAlign: "left"
};

const iconImgStyle = {
  width: "32px",
  verticalAlign: "middle",
  marginRight: "15px"
};
const Main = (props) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    let t;
    let dbx = new Dropbox({
      accessToken:
        "nQQ4w7BcqgAAAAAAAAAG3vluPdsVHJ9H7UoZXpX7Ehf49Vd278DUeZUB-wcTTEQQ",
      fetch
    });
    dbx
      .filesListFolder({ path: "" })
      .then((res) => {
        console.log(res);
        return res.entries;
      })
      .then((res) => {
        t = res;
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
            //setThumbnailRes(res.entries);
            const arr = t.map((file) => {
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
            setFiles(arr);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={ContainerDivStyle}>
      {files && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Modified</th>
              <th>Size</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {files
              .sort((a, b) => {
                if (
                  (a[".tag"] === "folder" || b[".tag"] === "folder") &&
                  !(a[".tag"] === b[".tag"])
                ) {
                  return a[".tag"] === "folder" ? -1 : 1;
                } else {
                  return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
                }
              })
              .map((file) => {
                let thumbnail;
                if (file[".tag"] === "file") {
                  thumbnail = file.thumbnail
                    ? `data:image/jpeg;base64, ${file.thumbnail.thumbnail}`
                    : `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 60 60' style='enable-background:new 0 0 60 60;' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M42.5,22h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,22,42.5,22z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M17.5,16h10c0.552,0,1-0.447,1-1s-0.448-1-1-1h-10c-0.552,0-1,0.447-1,1S16.948,16,17.5,16z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,30h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,30,42.5,30z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,38h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,38,42.5,38z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,46h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,46,42.5,46z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z' style='fill: rgb(0, 126, 229);'/%3E%3C/g%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3C/svg%3E`;
                } else {
                  thumbnail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' focusable='false' width='40' height='40' viewBox='0 0 40 40' class='mc-icon mc-icon-template-content mc-icon-template-content--folder-small brws-file-name-cell-icon' role='img'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2371B9F4'%3E%3C/path%3E%3Cpath d='M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2392CEFF'%3E%3C/path%3E%3C/g%3E%3C/svg%3E`;
                }
                return (
                  <tr key={file.name}>
                    <td>
                      <img style={iconImgStyle} alt="icon" src={thumbnail} />
                      {file.name}
                    </td>
                    <td>{file.server_modified}</td>
                    <td>
                      {file.size && (file.size * 0.000001).toFixed(2) + "MB"}
                    </td>
                    <td>...</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Main;
