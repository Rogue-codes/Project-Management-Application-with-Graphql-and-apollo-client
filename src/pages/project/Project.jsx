import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../../queries/GraphQueries";
import ClientInfo from "../../components/ClientInfo";
import SpinnerContainer from "../../components/SpinnerContainer";
import {BiArrowBack} from "react-icons/bi"
import {Link} from "react-router-dom"
import DeleteProject from "../../components/DeleteProject";
import EditProjectBtn from "../../components/EditProjectBtn";
function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <SpinnerContainer />;
  if (error) return <p>an error occurred while loading</p>;
  return (
    <>
      {!loading && !error && (
        <div className="project-card">
          <Link to='/'><BiArrowBack/>  back</Link>
          <h2>{data.project.name}</h2>
          <p>{data.project.description}</p> <br />
          <p>
            <strong>Project Status:</strong>
          </p>
          <span
            className={
              data.project.status === "Not started"
                ? "red"
                : data.project.status === "In progress"
                ? "orange"
                : "green"
            }
          >
            {data.project.status}
          </span>
          <div className="update-delete-container">
            <DeleteProject id={data.project.id}/>
            <EditProjectBtn initValues={data.project} />
          </div>
          <ClientInfo client={data.project.client} />
        </div>
      )}
    </>
  );
}

export default Project;
