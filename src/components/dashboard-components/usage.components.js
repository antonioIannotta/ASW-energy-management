import React from "react";
import Userfront from "@userfront/react";
import {
  Grid,
  Card,
  CardContent,
  Chip,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import ReactApexChart from "react-apexcharts";

const axios = require("../../axios/axios");

function formatDate(date) {
  let newDate = date
    .slice(0, 10)
    .split("-")
    .reverse();
  let month = newDate[1];
  let year = newDate[2];
  switch (month) {
    case "01":
      month = "Gen '" + year.slice(2, 4);
      break;
    case "02":
      month = "Feb '" + year.slice(2, 4);
      break;
    case "03":
      month = "Mar '" + year.slice(2, 4);
      break;
    case "04":
      month = "Apr '" + year.slice(2, 4);
      break;
    case "05":
      month = "Mag '" + year.slice(2, 4);
      break;
    case "06":
      month = "Giu '" + year.slice(2, 4);
      break;
    case "07":
      month = "Lug '" + year.slice(2, 4);
      break;
    case "08":
      month = "Ago '" + year.slice(2, 4);
      break;
    case "09":
      month = "Set '" + year.slice(2, 4);
      break;
    case "10":
      month = "Ott '" + year.slice(2, 4);
      break;
    case "11":
      month = "Nov '" + year.slice(2, 4);
      break;
    case "12":
      month = "Dic '" + year.slice(2, 4);
      break;
    default :
      break;
  }
  return month;
}

function formatDateFromDMnY(date) {
  let month = date.getMonth() + 1;
  let year = date
    .getYear()
    .toString()
    .substr(1);
  switch (month) {
    case 1:
      month = "Gen '" + year;
      break;
    case 2:
      month = "Feb '" + year;
      break;
    case 3:
      month = "Mar '" + year;
      break;
    case 4:
      month = "Apr '" + year;
      break;
    case 5:
      month = "Mag '" + year;
      break;
    case 6:
      month = "Giu '" + year;
      break;
    case 7:
      month = "Lug '" + year;
      break;
    case 8:
      month = "Ago '" + year;
      break;
    case 9:
      month = "Set '" + year;
      break;
    case 10:
      month = "Ott '" + year;
      break;
    case 11:
      month = "Nov '" + year;
      break;
    case 12:
      month = "Dic '" + year;
      break;
    default :
      break;
  }
  return month;
}
export class UsageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      averageUsage: 0,
      lastCost: 0,
      averageCost: 0,
      totalUsage: 0,
      totalCost: 0,
      usageDateArray: [],
      usageArray: [],
      measureUnit: "",
      cityRegion: "",
    };
  }

  componentDidMount() {
    let usageType = this.props.usageType;
    let isSelfCityRegion = this.props.isSelfCityRegion;

    if (isSelfCityRegion === "self") {
      const userId = Userfront.user.userUuid;
      let usage;
      let measureUnit = "";
      let user = axios.get(`http://localhost:5000/users/${userId}`, userId);

      if (usageType === "electric") {
        usage = "electricUsage";
        measureUnit = "KW/h";
      } else if (usageType === "water") {
        usage = "waterUsage";
        measureUnit = "Lmc";
      } else if (usageType === "heat") {
        usage = "heatUsage";
        measureUnit = "Smc";
      }

      user.then((res) => {
        let averageUsage = 0;
        let lastCost = 0;
        let averageCost = 0;
        let totalUsage = 0;
        let totalCost = 0;
        let usageDateArray = [];
        let usageArray = [];

        lastCost = res.data[usage][res.data[usage].length - 1].cost;
        for (let i = 0; i < res.data[usage].length; i++) {
          totalUsage += res.data[usage][i].usage;
          totalCost += res.data[usage][i].cost;
          usageDateArray.push(formatDate(res.data[usage][i].insertionDate));
          usageArray.push(res.data[usage][i].usage);
        }
        averageUsage = totalUsage / res.data[usage].length;
        averageCost = totalCost / res.data[usage].length;

        this.setState({
          username: res.data.username,
          averageUsage: averageUsage,
          lastCost: lastCost,
          averageCost: averageCost,
          totalUsage: totalUsage,
          totalCost: totalCost,
          usageDateArray: usageDateArray,
          usageArray: usageArray,
          measureUnit: measureUnit,
        });
      });
    } else if (isSelfCityRegion === "city") {
      const userId = Userfront.user.userUuid;
      let usage;
      let measureUnit = "";
      let user = axios.get(`http://localhost:5000/users/${userId}`, userId);

      if (usageType === "electric") {
        usage = "electricUsage";
        measureUnit = "KW/h";
      } else if (usageType === "water") {
        usage = "waterUsage";
        measureUnit = "Lmc";
      } else if (usageType === "heat") {
        usage = "heatUsage";
        measureUnit = "Smc";
      }

      user.then((res) => {
        let city = res.data.city;
        let allUsers = axios.getAll(`http://localhost:5000/users/`);

        allUsers.then((res) => {
          let averageUsage = 0;
          let lastCost = 0;
          let averageCost = 0;
          let totalUsage = 0;
          let totalCost = 0;
          let usageDateArray = [];
          let usageArray = [];
          let counter = 0;
          let usageDateMap = new Map();
          let usersInCity = res.data.filter((res) => res.city === city);

          for (let i = 0; i < usersInCity.length; i++) {
            lastCost +=
              usersInCity[i][usage][usersInCity[i][usage].length - 1].cost;
            for (let j = 0; j < usersInCity[i][usage].length; j++) {
              counter++;
              totalUsage += usersInCity[i][usage][j].usage;
              totalCost += usersInCity[i][usage][j].cost;
              usageDateArray.push(
                new Date(usersInCity[i][usage][j].insertionDate)
              );
            }
          }
          usageDateArray.sort((date1, date2) => date1 - date2);

          for (let i = 0; i < usageDateArray.length; i++) {
            usageDateMap.set(
              formatDateFromDMnY(usageDateArray[i]),
              []
            );
          }

          let uniqueMonths = Array.from(usageDateMap.keys());

          for (let i = 0; i < usersInCity.length; i++) {
            for (let j = 0; j < usersInCity[i][usage].length; j++) {
              let arrayVal = usageDateMap.get(
                formatDateFromDMnY(
                  new Date(usersInCity[i][usage][j].insertionDate)
                )
              );
              arrayVal.push(usersInCity[i][usage][j].usage);
            }
          }

          usageDateArray = uniqueMonths;

          for (let i = 0; i < usageDateArray.length; i++) {
            let values = usageDateMap.get(usageDateArray[i]);
            let val = 0;
            let cnt = 0;
            for (let j = 0; j < values.length; j++) {
              val += values[j];
              cnt++;
            }
            usageArray.push(val / cnt);
            usageDateMap.set(uniqueMonths[i], val / cnt);
          }

          averageUsage = totalUsage / counter;
          averageCost = totalCost / counter;

          this.setState({
            averageUsage: averageUsage,
            lastCost: lastCost,
            averageCost: averageCost,
            totalUsage: totalUsage,
            totalCost: totalCost,
            usageDateArray: usageDateArray,
            usageArray: usageArray,
            measureUnit: measureUnit,
            cityRegion: city,
          });
        });
      });
    } else {
      const userId = Userfront.user.userUuid;
      let usage;
      let measureUnit = "";
      let user = axios.get(`http://localhost:5000/users/${userId}`, userId);

      if (usageType === "electric") {
        usage = "electricUsage";
        measureUnit = "KW/h";
      } else if (usageType === "water") {
        usage = "waterUsage";
        measureUnit = "Lmc";
      } else if (usageType === "heat") {
        usage = "heatUsage";
        measureUnit = "Smc";
      }

      user.then((res) => {
        let region = res.data.region;
        let allUsers = axios.getAll(`http://localhost:5000/users/`);

        allUsers.then((res) => {
          let averageUsage = 0;
          let lastCost = 0;
          let averageCost = 0;
          let totalUsage = 0;
          let totalCost = 0;
          let usageDateArray = [];
          let usageArray = [];
          let counter = 0;
          let usageDateMap = new Map();

          let usersInRegion = res.data.filter((res) => res.region === region);

          for (let i = 0; i < usersInRegion.length; i++) {
            lastCost +=
              usersInRegion[i][usage][usersInRegion[i][usage].length - 1].cost;
            for (let j = 0; j < usersInRegion[i][usage].length; j++) {
              counter++;
              totalUsage += usersInRegion[i][usage][j].usage;
              totalCost += usersInRegion[i][usage][j].cost;
              usageDateArray.push(
                new Date(usersInRegion[i][usage][j].insertionDate)
              );
            }
          }

          usageDateArray.sort((date1, date2) => date1 - date2);

          for (let i = 0; i < usageDateArray.length; i++) {
            usageDateMap.set(
              formatDateFromDMnY(usageDateArray[i]),
              []
            );
          }

          let uniqueMonths = Array.from(usageDateMap.keys());

          for (let i = 0; i < usersInRegion.length; i++) {
            for (let j = 0; j < usersInRegion[i][usage].length; j++) {
              let arrayVal = usageDateMap.get(
                formatDateFromDMnY(
                  new Date(usersInRegion[i][usage][j].insertionDate)
                )
              );
              arrayVal.push(usersInRegion[i][usage][j].usage);
            }
          }

          usageDateArray = uniqueMonths;

          for (let i = 0; i < usageDateArray.length; i++) {
            let values = usageDateMap.get(usageDateArray[i]);
            let val = 0;
            let cnt = 0;
            for (let j = 0; j < values.length; j++) {
              val += values[j];
              cnt++;
            }
            usageArray.push(val / cnt);
            usageArray[i] = usageArray[i].toFixed(2);
            usageDateMap.set(uniqueMonths[i], val / cnt);
          }

          averageUsage = totalUsage / counter;
          averageCost = totalCost / counter;

          this.setState({
            averageUsage: averageUsage,
            lastCost: lastCost,
            averageCost: averageCost,
            totalUsage: totalUsage,
            totalCost: totalCost,
            usageDateArray: usageDateArray,
            usageArray: usageArray,
            measureUnit: measureUnit,
            cityRegion: region,
          });
        });
      });
    }
  }

  render() {
    let breadcrumb = "I miei dati";
    let cityOrRegion = "";
    if (this.props.isSelfCityRegion === "city") {
      breadcrumb = "Città";
      cityOrRegion = (
        <Chip
          icon={<LocationCityIcon />}
          label={this.state.cityRegion.toUpperCase()}
          variant="outlined"
        />
      );
    } else if (this.props.isSelfCityRegion === "region") {
      breadcrumb = "Regione";
      cityOrRegion = (
        <Chip
          icon={<SouthAmericaIcon />}
          label={this.state.cityRegion.toUpperCase()}
          variant="outlined"
        />
      );
    }

    let breadcrumb1 = "";
    if (this.props.usageType === "electric") {
      breadcrumb1 = "Energia elettrica";
    } else if (this.props.usageType === "water") {
      breadcrumb1 = " Acqua";
    } else if (this.props.usageType === "heat") {
      breadcrumb1 = " Gas";
    }

    return (
      <Grid container sx={{ height: "fit-content" }} spacing={3} mt={3}>
        <Grid item xs={12} md={9}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography variant="h6" component="h2">
              Dashboard
            </Typography>
            <Typography variant="h6" component="h2">
              {breadcrumb}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {breadcrumb1}
            </Typography>
          </Breadcrumbs>
          <Typography
            sx={{ marginBottom: "15px", marginTop: "1rem" }}
            variant="h5"
            component="h2"
          >
            {cityOrRegion}
          </Typography>
        </Grid>

        <Grid item xs={12} md={9}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <ReactApexChart
                series={[
                  {
                    name: "Consumo (" + this.state.measureUnit + ")",
                    data: this.state.usageArray,
                  },
                ]}
                options={{
                  chart: {
                    type: "bar",
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 10,
                      dataLabels: {
                        position: "top",
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                      return val + "";
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "12px",
                      colors: ["#304758"],
                    },
                  },

                  xaxis: {
                    categories: this.state.usageDateArray,
                    position: "top",
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    crosshairs: {
                      fill: {
                        type: "gradient",
                        gradient: {
                          colorFrom: "#D8E3F0",
                          colorTo: "#BED1E6",
                          stops: [0, 100],
                          opacityFrom: 0.4,
                          opacityTo: 0.5,
                        },
                      },
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  yaxis: {
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    labels: {
                      show: false,
                      formatter: function(val) {
                        return val;
                      },
                    },
                  },
                  title: {
                    text: "Consumo mensile",
                    floating: true,
                    offsetY: 467,
                    align: "center",
                    style: {
                      color: "#444",
                    },
                  },
                  responsive: [
                    {
                      breakpoint: 500,
                      options: {
                        chart: {
                          redrawOnParentResize: true,
                          height: 320,
                        },
                      },
                    },
                  ],
                }}
                height={485}
                type="bar"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} align="center" md={3}>
          <Card sx={{ minWidth: 275, mb: 3 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Consumi ultimo mese
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.usageArray[this.state.usageArray.length - 1] +
                  " " +
                  this.state.measureUnit}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Media consumi nei mesi
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.averageUsage.toFixed(2) +
                  " " +
                  this.state.measureUnit}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Costo ultimo mese
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.lastCost.toFixed(2) + " €"}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Media costi
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.averageCost.toFixed(2) + " €"}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Spesa Totale
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.totalCost.toFixed(2) + "€"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
