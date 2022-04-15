import { Card, Row, Col } from "react-bootstrap";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FiPieChart, FiArrowUp, FiArrowDown } from "react-icons/fi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { React, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const name = localStorage.getItem("name");
  // const role = localStorage.getItem("role");
  // const token = localStorage.getItem("token");

  // let navigate = useNavigate();
  const toastFrom = "dashboard";

  // const profitCalcSingle = (index) => {
  //   const prevIndex = pairs[index + 1] ? pairs[index + 1] : 0;
  //   const currentIndexProfit = eGap * prevIndex;
  //   // const currentIndexProfitAmount = currentIndexProfit * prevIndex;
  //   return currentIndexProfit;
  // };
  // const profitCalcGlobal = (index) => {
  //   const prevIndex = pairs[index + 1] ? pairs[index + 1] : 0;
  //   const currentIndexProfit = eGap * prevIndex;
  //   const currentIndexProfitAmount = currentIndexProfit * prevIndex;
  //   return currentIndexProfitAmount;
  // };

  const pairs = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];

  const pairCount = pairs.length;
  const ape = 10;
  const price = 2;

  const eGap = (price / pairCount).toFixed(2);
  // console.log(eGap);
  var totalInvest = 0;

  const profit = pairs.map((item, index) => {
    totalInvest += parseFloat(item) * parseFloat(price);
    const eCount = index + 1;
    const xCount = pairCount - eCount;
    var totalProfit = 0;
    for (let number = xCount; number >= pairs[0]; number--) {
      const painNum = pairs[parseInt(number)];
      totalProfit +=
        parseFloat(number - index) * parseFloat(eGap) * parseFloat(painNum);
    }

    if (xCount + 1 == pairCount) {
      return totalProfit;
    }
  });

  useEffect(() => {
    if (
      !localStorage.getItem("logged") &&
      localStorage.getItem("logged") === null
    ) {
      toast.error("You are not logged in", {
        toastId: toastFrom,
      });
    } else {
      // toast.info("You are logged in with " + name, {
      //   toastId: toastFrom,
      // });
    }

    document.title = "Dashboard";
  });

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-md-12 fw-bold fs-3">Dashboard</div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3 col-sm-12 mb-3 d-flex justify-content-center">
          <Card border="default" bg="default" className="shadow card-height">
            {/* <Card.Header>Header</Card.Header> */}
            <Card.Body>
              <Card.Title className="mt-2">
                <span className="shape-icons light-bg-primary me-2 ms-auto">
                  <AiOutlineLineChart />
                </span>
                <span className="text-primary fs-3 fw-light ms-auto">
                  Sales
                </span>
              </Card.Title>
              <div className="text-center">
                <span className="ms-auto fw-bold fs-4 text-muted">$10,254</span>

                <span className="pills light-bg-success ms-2">
                  <FiArrowUp /> 10%
                </span>
              </div>
              <Card.Text className="mt-0">
                <ResponsiveContainer width={260} height={100}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 col-sm-12 mb-3 d-flex justify-content-center">
          <Card border="default" bg="default" className="shadow card-height">
            {/* <Card.Header>Header</Card.Header> */}
            <Card.Body>
              <Card.Title className="mt-1">
                <span className="shape-icons light-bg-warning me-2 ms-auto">
                  <FcSalesPerformance />
                </span>
                <span className="text-warning fs-3 fw-light ms-auto">
                  Expense
                </span>
              </Card.Title>
              <div className="text-center">
                <span className="ms-auto fw-bold fs-4 text-muted">$18,254</span>
                <span className="pills light-bg-warning ms-2">
                  <FiArrowUp /> 15%
                </span>
              </div>
              <Card.Text className="mt-0">
                <ResponsiveContainer width={260} height={100}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 col-sm-12 mb-3 d-flex justify-content-center">
          <Card border="default" bg="default" className="shadow card-height">
            <Card.Body>
              <Card.Title className="mt-1">
                <span className="shape-icons light-bg-success me-2 ms-auto">
                  <FiPieChart />
                </span>
                <span className="text-success fs-3 fw-light ms-auto">
                  Profit
                </span>
              </Card.Title>
              <div className="text-center">
                <span className="ms-auto fw-bold fs-4 text-muted">-$8,254</span>
                <span className="pills light-bg-danger ms-2">
                  <FiArrowDown /> 15%
                </span>
              </div>
              <Card.Text className="mt-0">
                <ResponsiveContainer width={260} height={100}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 col-sm-12 mb-3 d-flex justify-content-center">
          <Card border="default" bg="default" className="shadow card-height">
            <Card.Body>
              <Card.Title className="mt-1">
                <span className="shape-icons light-bg-info me-2 ms-auto">
                  <FaUsers />
                </span>
                <span className="text-success fs-3 fw-light ms-auto">
                  Users
                </span>
              </Card.Title>
              <div className="text-center">
                <span className="ms-auto fw-bold fs-4 text-muted">2654</span>
                <span className="pills light-bg-success ms-2">
                  <FiArrowUp /> 10%
                </span>
              </div>
              <Card.Text className="mt-0">
                <ResponsiveContainer width={260} height={100}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Card className="mt-3 pb-5 mb-3">
            <h4 className="ms-3 mt-2">Sales</h4>
            <ResponsiveContainer width="95%" height={250}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="mt-3 pb-5 mb-3">
            <h4 className="ms-3 mt-2">Expense</h4>
            <ResponsiveContainer width="95%" height={250}>
              <LineChart
                className="pt-2 pb-5"
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      <Row className="p-5 mb-3 text-center">
        <Col md={12}>
          ${profit} profit from ${totalInvest} investment at{" "}
          {process.env.REACT_APP_API_ENDPOINT}
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
