import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import JobCard from "./JobCard";
import "./cardview.css";
import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);

  const [careerData, setCareerData] = useState([
    { Title: "title3", Description: "description1" },
    { Title: "title4", Description: "description2" },
    { Title: "title5", Description: "description3" },
  ]);

  const [swipeStack, setSwipeStack] = useState([
    { Title: "title1", Description: "description1" },
    { Title: "title2", Description: "description2" },
  ]);

  const DislikeItem = async () => {
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    if (loading) {
      return;
    } else {
      setLoading(true);

      prev.disabled = true;
      next.disabled = true;
    }

    let carouselInner = document.querySelector(".carousel-inner");
    let activeCard = carouselInner.querySelector(".active");

    let temp = swipeStack.filter((_, index) => index != activeCard.id);

    let newItem = careerData[0];

    let item = swipeStack[activeCard.id];
    console.log("Disliked");
    console.log(item);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    prev.disabled = false;
    next.disabled = false;
    setLoading(false);

    setCareerData(careerData.slice(1));
    if (activeCard.id == 0) {
      setSwipeStack([newItem, ...temp]);
    } else {
      setSwipeStack([...temp, newItem]);
    }
  };

  const LikeItem = async () => {
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    if (loading) {
      return;
    } else {
      setLoading(true);

      prev.disabled = true;
      next.disabled = true;
    }

    let carouselInner = document.querySelector(".carousel-inner");
    let activeCard = carouselInner.querySelector(".active");

    let temp = swipeStack.filter((_, index) => index != activeCard.id);

    let newItem = careerData[0];

    let item = swipeStack[activeCard.id];
    console.log("Liked");
    console.log(item);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    prev.disabled = false;
    next.disabled = false;
    setLoading(false);

    setCareerData(careerData.slice(1));
    if (activeCard.id == 0) {
      setSwipeStack([newItem, ...temp]);
    } else {
      setSwipeStack([...temp, newItem]);
    }
  };
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            AI4Good
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Create
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Resource
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div class="container">
          <div class="row">
            <div
              id="carouselExample"
              class="carousel slide"
              data-bs-theme="dark"
            >
              <div class="carousel-inner" data-bs-theme="light">
                {swipeStack.map((data, index) => {
                  return (
                    <div
                      id={index}
                      className={
                        index === 0 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <div class="d-flex justify-content-center align-items-center">
                        <JobCard
                          title={data.Title}
                          description={data.Description}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={DislikeItem}
                style={{ width: "60px", height: "60px", alignSelf: "center" }}
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
                id="next"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                onClick={LikeItem}
                style={{ width: "60px", height: "60px", alignSelf: "center" }}
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
                id="prev"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
