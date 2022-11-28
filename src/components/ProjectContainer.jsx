import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/GraphQueries";
import SpinnerContainer from "./SpinnerContainer";
import {AiFillWarning} from "react-icons/ai"
import { Link } from "react-router-dom";
function ProjectContainer() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <SpinnerContainer />;
  if (error) return <p>An error occured</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="project-container">
          {data.projects.map((project) => (
            <div className="project-cards" key={project.id}>
              <h2>{project.name}</h2>
              <span>Status: </span>
              <p><strong>{project.status}</strong></p>
              <Link to={`/project/${project.id}`}>view</Link>
            </div>
          ))}
        </div>
      ):(<div className="no-project">
        <AiFillWarning size="2rem" color="red"/>
        <p>No Project Available</p>
        </div>)}
    </>
  );
}

export default ProjectContainer;
