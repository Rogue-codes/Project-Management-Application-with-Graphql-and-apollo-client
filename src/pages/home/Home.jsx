import React, { useState } from "react";
import Nav from "../../components/nav/Nav";
import { useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Clients from "../../components/Clients";
import { GET_CLIENTS } from "../../queries/GraphQueries";
import SpinnerContainer from "../../components/SpinnerContainer";
import AddClient from "../../components/AddClients";
import Button from "react-bootstrap/esm/Button";
import { FiUserPlus } from "react-icons/fi";
import {BiListPlus} from "react-icons/bi"
import ProjectContainer from "../../components/ProjectContainer";
import AddProject from "../../components/AddProjects";

function Home() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [show, setShow] = useState(false);
  const [showProject, setShowProject] = useState(false);

  const handleShow = () => setShow(true);
  const handleProjectShow = () => setShowProject(true);
  if (loading) return <SpinnerContainer />;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="home">
      <Nav />
      <AddClient show={show} setShow={setShow} />
      <AddProject showProject={showProject} setShowProject={setShowProject} />

      <div className="add-button-container">
        <Button variant="primary" onClick={handleShow} className="btn">
          <div className="icon-container">
            <FiUserPlus />
            Add client
          </div>
        </Button>

        <Button variant="secondary" onClick={handleProjectShow} className="btn">
          <div className="icon-container">
            <BiListPlus size="1.5rem"/>
            New Project
          </div>
        </Button>
      </div>
      <ProjectContainer />
      <>
        {!loading && !error && (
          <div className="parent">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((item) => (
                  <Clients key={item.id} client={item} />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </>
    </div>
  );
}

export default Home;
