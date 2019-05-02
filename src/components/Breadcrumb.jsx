import React from "react";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
const breadcrumb = {
  flex: 6,
  display: "flex",
  paddingLeft: "30px"
};
const PureBreadcrumbs = ({ breadcrumbs }) => {
  return (
    <div style={breadcrumb}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => {
        return (
          <div key={match.url}>
            <Link to={match && match.url === "/" ? "/files" : match.url}>
              {breadcrumb}
            </Link>
            {index < breadcrumbs.length - 1 && ">"}
          </div>
        );
      })}
    </div>
  );
};
export default withBreadcrumbs()(PureBreadcrumbs);
