import React, { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import AsideHeader from "../../components/AsideHeader";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import axios from "axios";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SpreadGraph = ({ userId }) => {
  const [data, setData] = useState({ labels: [], values: [] });
  const [days, setDays] = useState(10); // Default to 10 days

  const fetchData = (selectedDays) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_PORT}/review/reviews/analytics/${userId}?days=${selectedDays}`
      )
      .then((response) => {
        const { labels, values } = response.data;
        setData({ labels, values });
      })
      .catch((error) => {
        console.error("Error fetching reviews data:", error);
      });
  };

  useEffect(() => {
    fetchData(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, days]);

  const handleDaysChange = (e) => {
    setDays(Number(e.target.value)); // Update the selected days
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Reviews",
        data: data.values,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Daily Reviews Analytics (Last ${days} Days)`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Reviews",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "auto", height: "100%" }}>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="days-select">Select Days: </label>
        <select id="days-select" value={days} onChange={handleDaysChange}>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={90}>90</option>
        </select>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

const User = () => {
  const [data, setData] = useState({
    instaPercentage: 0,
    facebookPercentage: 0,
    googleMapsPercentage: 0,
    twitterPercentage: 0,
    totalClicks: 0,
  });
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.authentication.userId);

  useEffect(() => {
    async function getGraphData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_PORT}/game/pages/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    }
    if (userId) {
      getGraphData();
    }
  }, [userId]);

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-500">Loading analytics...</div>
      ) : (
        <div>
          <div className="flex mb-20">
            <AsideHeader />
            <div>
              <div className="flex flex-col items-center w-full mt-4 max-md:mt-10">
                <div className="justify-center text-center self-start p-2.5 mt-6 font-medium tracking-wide leading-6 text-blue-950 text-3xl md:text-lg">
                  Tableau de bord
                </div>
                <div className="flex flex-row flex-wrap justify-center gap-10 m-10 md:flex-nowrap ">
                  <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                    <p
                      className="pb-3 font-semibold"
                      style={{
                        margin: "3px 0",
                        fontSize: "18px",
                        color: "#000",
                      }}
                    >
                      Instagram
                    </p>
                    <div className="container-goal">
                      <div
                        className="circular-progress1"
                        style={{ backgroundColor: "#DAD7FE" }}
                      >
                        <div className="value-container">{`${data.instaPercentage?.toFixed(
                          2
                        )}%`}</div>
                      </div>
                      <style>{`
                    .circular-progress1 {
                        background: conic-gradient(
                            #8497FC ${
                              data.instaPercentage?.toFixed(2) * 3.6
                            }deg,
                            #DAD7FE ${data.instaPercentage?.toFixed(2) || 0}deg
                            );
                        }
                        `}</style>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                    <p
                      className="pb-3 font-semibold"
                      style={{
                        margin: "3px 0",
                        fontSize: "18px",
                        color: "#000",
                      }}
                    >
                      Facebook
                    </p>
                    <div className="container-goal">
                      <div
                        className="circular-progress"
                        style={{ backgroundColor: "#6AD2FF" }}
                      >
                        <div className="value-container">{`${
                          data.facebookPercentage?.toFixed(2) || 0
                        }%`}</div>
                      </div>
                      <style>{`
                    .circular-progress {
                        background: conic-gradient(
                            #6AD2FF ${
                              data.facebookPercentage?.toFixed(2) || 0 * 3.6
                            }deg,
                            #CCF8FE ${
                              data.facebookPercentage?.toFixed(2) || 0
                            }deg
                            );
                        }
                        `}</style>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                    <p
                      className="pb-3 font-semibold"
                      style={{
                        margin: "3px 0",
                        fontSize: "18px",
                        color: "#000",
                      }}
                    >
                      Twitter
                    </p>
                    <div className="container-goal">
                      <div
                        className="circular-progress2"
                        style={{ backgroundColor: "#FDFDAF" }}
                      >
                        <div className="value-container">{`${
                          data.twitterPercentage?.toFixed(2) || 0
                        }%`}</div>
                      </div>
                      <style>{`
                    .circular-progress2 {
                        background: conic-gradient(
                            #FCFC3A ${
                              data.twitterPercentage?.toFixed(2) || 0 * 3.6
                            }deg,
                            #FDFDAF ${
                              data.twitterPercentage?.toFixed(2) || 0
                            }deg
                            );
                        }
                        `}</style>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                    <p
                      className="pb-3 font-semibold"
                      style={{
                        margin: "3px 0",
                        fontSize: "18px",
                        color: "#000",
                      }}
                    >
                      Google Maps
                    </p>
                    <div className="container-goal">
                      <div
                        className="circular-progress3"
                        style={{ backgroundColor: "#91D7E0" }}
                      >
                        <div className="value-container">{`${
                          data.googleMapsPercentage?.toFixed(2) || 0
                        }%`}</div>
                      </div>
                      <style>{`
                    .circular-progress3 {
                        background: conic-gradient(
                            #02A0FC ${
                              data.googleMapsPercentage?.toFixed(2) || 0 * 3.6
                            }deg,
                            #91D7E0 ${
                              data.googleMapsPercentage?.toFixed(2) || 0
                            }deg
                            );
                        }
                        `}</style>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto">
                <SpreadGraph userId={userId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
