import React from "react";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
const breadcrumb = {
  flex: 6,
  display: "flex",
  paddingLeft: "10px",
  color: "#637282"
};
const breadcrumbLinks = {
  margin: "0 5px",
  fontSize: "14px",
  color: "#637282"
};
const PureBreadcrumbs = ({ breadcrumbs }) => {
  return (
    <div style={breadcrumb}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => {
        if (index !== 0) {
          return (
            <div key={match.url}>
              <Link
                style={breadcrumbLinks}
                to={match && match.url === "/" ? "/Files" : match.url}
              >
                {breadcrumb}
              </Link>
              {index < breadcrumbs.length - 1 && <span>&#62;</span>}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
export default withBreadcrumbs()(PureBreadcrumbs);
