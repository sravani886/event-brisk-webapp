import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Signin from "./auth/signin";
import CenterCard363 from "./centerCard363";

function Home(props) {
  return (
    <div>
      <div
        className="p-5 text-center bg-image img-fluid"
        style={{
          backgroundImage: "url('https://i.ibb.co/x1GnWbW/wallpaper.jpg')",
          height: 690,
          backgroundSize: "cover",
          backgroundColor: "rgba(0,0,0, 0.8)",
          objectFit: "cover",
        }}
      >
        <div
          className="mask p-4"
          style={{ backgroundColor: "rgba(255,255,255, 0.4)" }}
        >
          <div
            className="d-flex justify-content-center align-middle"
            style={{ marginTop: "15%", marginBottom: "15%" }}
          >
            <div className="text-white">
              <h1 className="mb-3">Welcome to Event Brisk</h1>
              <h4 className="mb-3">Organize Events with Ease</h4>
            </div>
          </div>
        </div>
      </div>

      {/* <img src="https://i.ibb.co/x1GnWbW/wallpaper.jpg" class="img-fluid" width={ "100%" }  height={ "690px" } alt="..."
    style={{ backgroundSize: 'cover', opacity: 0.8 }} /> */}

      <div class="container">
        <div class="row mt-sm-5 mb-sm-5">
          <div
            class="col-sm col-12 m-sm-2 m-1 p-2"
            style={{ backgroundColor: "#FFF0F0", borderRadius: "50px" }}
          >
            {/* <h3 class="text-center">About</h3> */}
            <h4 class="p-4"  style={{ backgroundColor: "#FFF0F0", fontSize: "25px", margin: "40px" }}>
              Event Brisk is a fun platform where users can book venues for
              their events while also keeping their venues and services
              available for booking. This also provides services for customers
              who want to book their venues, such as entertainment, food and
              beverages, and equipment at reasonable prices. 
              {/* Users can also
              reserve venues months in advance and view venue details such as
              price and service costs after making their selection. Our payment
              methods are simple and convenient for customers, who can pay with
              credit, debit, or razopay. */}
            </h4>
          </div>
          {!props.authenticated && (
            <div
              class="col-sm col-12 m-sm-2 m-1 p-2"
              style={{ backgroundColor: "#928D72", borderRadius: "50px" }}
            >
              <Signin />
            </div>
          )}
        </div>

        <div class="p-5" style={{ backgroundColor: "#FFF0F0" }}>
          <div class="row mt-4 mb-4">
            <div class="col-sm-6 col-12">
              <Link to={props.auth_type == "user" ? "/event/add/Concert" : "#"}>
                <img
                  src="https://i.ibb.co/FqFzkPy/concerts.jpg"
                  class="img-fluid"
                  style={{ borderRadius: "50px"}}
                  alt="..."
                ></img>
              </Link>
            </div>
            <div class="col-sm-6 col-12">
              <h4 class="p-5" style={{margin:"75px 0"}}>
                Concert Events like musical concerts, award functions and dance
                events
              </h4>
            </div>
          </div>

          <div class="row mt-4 mb-4">
            <div class="col-sm-6 col-12">
              <h4 class="p-5" style={{margin:"75px 0"}}>
                Technical Events like Workshops, Team Building activities,
                seminars and much more
              </h4>
            </div>
            <div class="col-sm-6 col-12">
              <Link
                to={props.auth_type == "user" ? "/event/add/Technical" : "#"}
              >
                <img
                  src="https://i.ibb.co/5FnKnC0/business-events.jpg"
                  class="img-fluid"
                  style={{ borderRadius: "50px"}}
                  alt="..."
                ></img>
              </Link>
            </div>
          </div>

          <div class="row mt-4 mb-4">
            <div class="col-sm-6 col-12">
              <Link to={props.auth_type == "user" ? "/event/add/Party" : "#"}>
                <img
                  src="https://i.ibb.co/Nn0qtqq/parties.jpg"
                  class="img-fluid"
                  style={{ borderRadius: "50px" }}
                  alt="..."
                />
              </Link>
            </div>
            <div class="col-sm-6 col-12">
              <h4 class="p-5" style={{margin:"75px 0"}}>
                Parties such as birthday, weddings and baby shower
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    auth_type: auth.auth_type,
  };
}

export default connect(mapStateToProps, null)(Home);
