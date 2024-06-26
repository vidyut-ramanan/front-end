import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import JobCard from "./JobCard";
import "./cardview.css";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { StarIcon } from "@chakra-ui/icons";
import { Progress } from "@chakra-ui/react";
import { confetti } from "@tsparticles/confetti";

function delayFunction(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(); // Resolve the promise after the specified delay
    }, delay);
  });
}

function App() {
  const toast = useToast();
  const [progress, setprogress] = useState(0);
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
  const GettingMatches = () => {
    delayFunction(3000).then(() => {
      setCareerData([
        { Title: "title6", Description: "description1" },
        { Title: "title7", Description: "description2" },
        { Title: "title8", Description: "description3" },
      ]);
    });

    return (
      <div>
        <Text fontSize="3xl">
          Please wait while we find more potential matches for you...
        </Text>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  };

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
      if (progress + 10 == 100) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast({
          title: "Congratulations!",
          description:
            "You've reached ten matches! 🎉 Keep up the good work! Feel free to keep swiping or take a break if you need to. ",
          status: "success",
          isClosable: true,
          duration: 10000,
        });
      }
      setprogress((p) => p + 10);
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
    <ChakraProvider>
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <nav class="navbar navbar-expand-lg bg-body-tertiary ">
          <div class="container-fluid d-flex justify-content-between">
            <a class="navbar-brand" href="#">
              <Heading
                as="h2"
                size="2xl"
                textAlign="center"
                fontFamily="'Poppins', sans-serif"
                fontWeight="700"
                color="white"
                borderRadius="full"
                letterSpacing="wider"
                backgroundColor="#FFD700"
                p={4}
              >
                ai4Career
              </Heading>
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
            <div class="collapse navbar-collapse " id="navbarNav">
              <ul class="navbar-nav ">
                <li class="nav-item ">
                  <a class="nav-link active px-4" aria-current="page" href="#">
                    <TriangleUpIcon />
                    <Text fontSize="3xl">Home</Text>
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link px-4" href="#">
                    <StarIcon />
                    <Text fontSize="3xl">You</Text>
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
          {careerData.length == 0 ? (
            GettingMatches()
          ) : (
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
                            index === 0
                              ? "carousel-item active"
                              : "carousel-item"
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
                    style={{
                      width: "60px",
                      height: "60px",
                      alignSelf: "center",
                    }}
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
                    style={{
                      width: "60px",
                      height: "60px",
                      alignSelf: "center",
                    }}
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
              <div class="row p-4">
                <Stack spacing={5}>
                  <Progress
                    colorScheme="green"
                    size="lg"
                    value={progress}
                    hasStripe
                  />
                </Stack>
              </div>
            </div>
          )}
        </body>
      </div>
    </ChakraProvider>
  );
}

export default App;
