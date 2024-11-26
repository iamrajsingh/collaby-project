import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import apiService from "./../../service/apiService";
import { teamData } from "../../utils/ProjectList";

const Team = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeamLists();
  }, []);

  const fetchTeamLists = async () => {
    try {
      const response = await apiService.post("front/team");

      if (response.data && Array.isArray(response.data)) {
        // Filter out items with empty data
        const filteredTeams = response.data.filter(
          (team) => team.t_name && team.t_designation
        );

        // Sort the filtered lists
        const sortedLists = filteredTeams.sort((a, b) => b.t_id - a.t_id);

        // Update the state with the filtered and sorted lists
        setTeams(sortedLists);
      } else {
        // Handle if the response data is not an array
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <Header />

      <div className="homeabout-Sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="secHeading">
                <h3>Meet Our Team</h3>
              </div>
            </div>

            {teamData.map((member, index) => (
              <div
                key={index}
                className="col-md-3 col-sm-6 col-xs-12"
                align="center"
              >
                <div className="teamSecD">
                  <img
                    src={member.photo}
                    className="img-responsive"
                    alt={member.t_name}
                  />
                  <h4>{member.t_name}</h4>
                  <p>{member.t_designation}</p>
                  <span>
                    <a
                      href={"https://twitter.com/" + member.twitter_id}
                      target="_blank"
                    >
                      <i
                        className="fa-brands fa-square-x-twitter"
                        aria-hidden="true"
                      ></i>
                    </a>

                    <a
                      href={"https://www.linkedin.com/in/" + member.linkdin_id}
                      target="_blank"
                    >
                      <i
                        className="fa-brands fa-linkedin"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </div>
  );
};

export default Team;
