import React, { useContext } from "react";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import "./css/breadcrumbs.css";
import { DataContext } from "../store";

/*component breadcrumbs är inpackad i withBreadcrumbs som automatiskt skapa
brödsmulor på grund av aktuella url */
/*under render är props{breadcrumbs} åtkomliga liksom 'location' match och alla dem andra som ära
använd i route.
Crumbs blir dinamysk tack vare rendera med Link och lägga till aktuella url*/
const Breadcrumbs = ({ breadcrumbs }) => {
  const { dispatch } = useContext(DataContext);

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <div className="bc" key={match.url}>
          <Link
            to={match.url || ""}
            onClick={() => dispatch({ type: "SEARCH_OFF" })}
          >
            {breadcrumb}
          </Link>
          >
        </div>
      ))}
    </div>
  );
};

export default withBreadcrumbs()(Breadcrumbs);
