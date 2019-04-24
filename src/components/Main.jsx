import React from "react";
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
const tableHeadStyle = {
  padding: "20px"
};
const Main = (props) => {
  return (
    <div style={ContainerDivStyle}>
      <table style={tableStyle}>
        <thead style={tableHeadStyle}>
          <tr>
            <th>Name</th>
            <th>Modified</th>
            <th>Members</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Camera Upload</td>
            <td>--</td>
            <td>only you</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Code</td>
            <td>--</td>
            <td>only you</td>
            <td>...</td>
          </tr>
          <tr>
            <td>iPhone intro.pdf</td>
            <td>2019-10-10</td>
            <td>only you</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Photos</td>
            <td>--</td>
            <td>only You</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Main;
