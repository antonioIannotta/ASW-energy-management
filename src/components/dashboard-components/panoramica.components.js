import React from "react";

import Userfront from "@userfront/react";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import {
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
  Chip,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const axios = require("../../axios/axios");

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

export class PanoramicaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userCity: "",
      userRegion: "",
      totalCost: "",
      electricCost: "",
      waterCost: "",
      heatCost: "",
      electricCostArray: [],
      waterCostArray: [],
      heatCostArray: [],
      dateArray: [],
      costsArray: [],
    };
  }

  componentDidMount() {
    let selfCityRegion = this.props.isSelfCityRegion;

    if (selfCityRegion === "self") {
      let userId = Userfront.user.userUuid;
      if (axios.get(`http://localhost:5000/users/${userId}`, userId)) {
        let user = axios.get(`http://localhost:5000/users/${userId}`, userId);

        user.then((res) => {
          let totalCost = 0;
          let electricCost = 0;
          let electricCostArray = [];
          let waterCost = 0;
          let waterCostArray = [];
          let heatCost = 0;
          let heatCostArray = [];
          let dateArray = [];
          let costsArray = [];

          let usageDateMap = new Map();

          for (let i = 0; i < res.data["electricUsage"].length; i++) {
            electricCost += res.data["electricUsage"][i].cost;
            dateArray.push(
              new Date(res.data["electricUsage"][i].insertionDate)
            );
          }
          for (let i = 0; i < res.data["waterUsage"].length; i++) {
            waterCost += res.data["waterUsage"][i].cost;
            dateArray.push(new Date(res.data["waterUsage"][i].insertionDate));
          }
          for (let i = 0; i < res.data["heatUsage"].length; i++) {
            heatCost += res.data["heatUsage"][i].cost;
            dateArray.push(new Date(res.data["heatUsage"][i].insertionDate));
          }

          dateArray.sort((date1, date2) => date1 - date2);

          for (let i = 0; i < dateArray.length; i++) {
            usageDateMap.set(formatDateFromDMnY(dateArray[i]), new Array(3));
          }

          let uniqueMonths = Array.from(usageDateMap.keys());
          let newMap = new Map();

          for (let i = 0; i < uniqueMonths.length; i++) {
            let array = usageDateMap.get(uniqueMonths[i]);
            for (let j = 0; j < array.length; j++) {
              array[j] = [];
            }
            newMap.set(uniqueMonths[i], array);
          }

          for (let i = 0; i < res.data["electricUsage"].length; i++) {
            let costsArray = newMap.get(
              formatDateFromDMnY(
                new Date(res.data["electricUsage"][i].insertionDate)
              )
            );
            costsArray[0].push(res.data["electricUsage"][i].cost);
          }
          for (let i = 0; i < res.data["waterUsage"].length; i++) {
            let costsArray = newMap.get(
              formatDateFromDMnY(
                new Date(res.data["waterUsage"][i].insertionDate)
              )
            );
            costsArray[1].push(res.data["waterUsage"][i].cost);
          }
          for (let i = 0; i < res.data["heatUsage"].length; i++) {
            let costsArray = newMap.get(
              formatDateFromDMnY(
                new Date(res.data["heatUsage"][i].insertionDate)
              )
            );
            costsArray[2].push(res.data["heatUsage"][i].cost);
          }

          for (let i = 0; i < uniqueMonths.length; i++) {
            let costsArray = newMap.get(uniqueMonths[i]);
            let electric = 0;
            let water = 0;
            let heat = 0;
            for (let j = 0; j < costsArray[0].length; j++) {
              electric += costsArray[0][j];
            }
            for (let j = 0; j < costsArray[1].length; j++) {
              water += costsArray[1][j];
            }
            for (let j = 0; j < costsArray[2].length; j++) {
              heat += costsArray[2][j];
            }
            electricCostArray.push(electric);
            waterCostArray.push(water);
            heatCostArray.push(heat);
          }

          dateArray = uniqueMonths;
          totalCost = electricCost + waterCost + heatCost;
          costsArray = [electricCost, waterCost, heatCost];

          this.setState({
            username: res.data.username,
            electricCost: electricCost.toFixed(2),
            waterCost: waterCost.toFixed(2),
            heatCost: heatCost.toFixed(2),
            electricCostArray: electricCostArray,
            waterCostArray: waterCostArray,
            heatCostArray: heatCostArray,
            dateArray: dateArray,
            totalCost: totalCost.toFixed(2),
            costsArray: costsArray,
          });
        });
      } else {
        console.log("non trovato");
      }
    } else if (selfCityRegion === "city") {
      /*CITTÀ */
      let userId = Userfront.user.userUuid;
      let user = axios.get(`http://localhost:5000/users/${userId}`, userId);
      user.then((user) => {
        let city = user.data.city;
        let users = axios.getAll(`http://localhost:5000/users/`);

        users.then((res) => {
          let totalCost = 0;
          let electricCost = 0;
          let electricCostArray = [];
          let waterCost = 0;
          let waterCostArray = [];
          let heatCost = 0;
          let heatCostArray = [];
          let dateArray = [];
          let costsArray = [];

          let usersInCity = res.data.filter(
            (res) => res.city.toLowerCase() === city.toLowerCase()
          );
          let usageDateMap = new Map();

          for (let j = 0; j < usersInCity.length; j++) {
            for (let i = 0; i < usersInCity[j]["electricUsage"].length; i++) {
              electricCost += usersInCity[j]["electricUsage"][i].cost;
              dateArray.push(
                new Date(usersInCity[j]["electricUsage"][i].insertionDate)
              );
            }
            for (let i = 0; i < usersInCity[j]["waterUsage"].length; i++) {
              waterCost += usersInCity[j]["waterUsage"][i].cost;
              dateArray.push(
                new Date(usersInCity[j]["waterUsage"][i].insertionDate)
              );
            }
            for (let i = 0; i < usersInCity[j]["heatUsage"].length; i++) {
              heatCost += usersInCity[j]["heatUsage"][i].cost;
              dateArray.push(
                new Date(usersInCity[j]["heatUsage"][i].insertionDate)
              );
            }
          }

          dateArray.sort((date1, date2) => date1 - date2);

          for (let i = 0; i < dateArray.length; i++) {
            usageDateMap.set(formatDateFromDMnY(dateArray[i]), new Array(3));
          }

          let uniqueMonths = Array.from(usageDateMap.keys());
          let newMap = new Map();

          for (let i = 0; i < uniqueMonths.length; i++) {
            let array = usageDateMap.get(uniqueMonths[i]);
            for (let j = 0; j < array.length; j++) {
              array[j] = [];
            }
            newMap.set(uniqueMonths[i], array);
          }

          for (let j = 0; j < usersInCity.length; j++) {
            for (let i = 0; i < usersInCity[j]["electricUsage"].length; i++) {
              let costsArray = newMap.get(
                formatDateFromDMnY(
                  new Date(usersInCity[j]["electricUsage"][i].insertionDate)
                )
              );
              costsArray[0].push(usersInCity[j]["electricUsage"][i].cost);
            }
            for (let i = 0; i < usersInCity[j]["waterUsage"].length; i++) {
              let costsArray = newMap.get(
                formatDateFromDMnY(
                  new Date(usersInCity[j]["waterUsage"][i].insertionDate)
                )
              );
              costsArray[1].push(usersInCity[j]["waterUsage"][i].cost);
            }
            for (let i = 0; i < usersInCity[j]["heatUsage"].length; i++) {
              let costsArray = newMap.get(
                formatDateFromDMnY(
                  new Date(usersInCity[j]["electricUsage"][i].insertionDate)
                )
              );
              costsArray[2].push(usersInCity[j]["heatUsage"][i].cost);
            }
          }

          for (let i = 0; i < uniqueMonths.length; i++) {
            let costsArray = newMap.get(uniqueMonths[i]);
            let electric = 0;
            let water = 0;
            let heat = 0;
            for (let j = 0; j < costsArray[0].length; j++) {
              electric += costsArray[0][j];
            }
            for (let j = 0; j < costsArray[1].length; j++) {
              water += costsArray[1][j];
            }
            for (let j = 0; j < costsArray[2].length; j++) {
              heat += costsArray[2][j];
            }
            electricCostArray.push(electric);
            waterCostArray.push(water);
            heatCostArray.push(heat);
          }

          totalCost = electricCost + waterCost + heatCost;
          costsArray = [electricCost, waterCost, heatCost];

          dateArray = uniqueMonths;

          this.setState({
            electricCost: electricCost.toFixed(2),
            waterCost: waterCost.toFixed(2),
            heatCost: heatCost.toFixed(2),
            electricCostArray: electricCostArray,
            waterCostArray: waterCostArray,
            heatCostArray: heatCostArray,
            dateArray: dateArray,
            totalCost: totalCost.toFixed(2),
            costsArray: costsArray,
            userCity: city,
          });
        });
      });
    } else {
      /*REGIONE */
      let userId = Userfront.user.userUuid;
      let user = axios.get(`http://localhost:5000/users/${userId}`, userId);
      user.then((user) => {
        let region = user.data.region;
        let users = axios.getAll(`http://localhost:5000/users/`);

        users.then((res) => {
          let totalCost = 0;
          let electricCost = 0;
          let electricCostArray = [];
          let waterCost = 0;
          let waterCostArray = [];
          let heatCost = 0;
          let heatCostArray = [];
          let dateArray = [];
          let costsArray = [];

          let usersInRegion = res.data.filter(
            (res) => res.region.toLowerCase() === region.toLowerCase()
          );
          let usageDateMap = new Map();

          for (let j = 0; j < usersInRegion.length; j++) {
            for (let i = 0; i < usersInRegion[j]["electricUsage"].length; i++) {
              electricCost += usersInRegion[j]["electricUsage"][i].cost;
              dateArray.push(
                new Date(usersInRegion[j]["electricUsage"][i].insertionDate)
              );
            }
            for (let i = 0; i < usersInRegion[j]["waterUsage"].length; i++) {
              waterCost += usersInRegion[j]["waterUsage"][i].cost;
              dateArray.push(
                new Date(usersInRegion[j]["waterUsage"][i].insertionDate)
              );
            }
            for (let i = 0; i < usersInRegion[j]["heatUsage"].length; i++) {
              heatCost += usersInRegion[j]["heatUsage"][i].cost;
              dateArray.push(
                new Date(usersInRegion[j]["heatUsage"][i].insertionDate)
              );
            }
          }

          dateArray.sort((date1, date2) => date1 - date2);

          for (let i = 0; i < dateArray.length; i++) {
            usageDateMap.set(formatDateFromDMnY(dateArray[i]), new Array(3));
          }

          let uniqueMonths = Array.from(usageDateMap.keys());
          let newMap = new Map();

          for (let i = 0; i < uniqueMonths.length; i++) {
            let array = usageDateMap.get(uniqueMonths[i]);
            for (let j = 0; j < array.length; j++) {
              array[j] = [];
            }
            newMap.set(uniqueMonths[i], array);
          }

          for (let j = 0; j < usersInRegion.length; j++) {
            for (let i = 0; i < usersInRegion[j]["electricUsage"].length; i++) {
              let costsArray = newMap.get(
                formatDateFromDMnY(
                  new Date(usersInRegion[j]["electricUsage"][i].insertionDate)
                )
              );
              costsArray[0].push(usersInRegion[j]["electricUsage"][i].cost);
            }
            for (let i = 0; i < usersInRegion[j]["waterUsage"].length; i++) {
              let costsArray = newMap.get(
                formatDateFromDMnY(
                  new Date(usersInRegion[j]["waterUsage"][i].insertionDate)
                )
              );
              costsArray[1].push(usersInRegion[j]["waterUsage"][i].cost);
            }
            for (let i = 0; i < usersInRegion[j]["heatUsage"].length; i++) {
              let costsArray = newMap.get(
                formatDateFromDMnY(
                  new Date(usersInRegion[j]["electricUsage"][i].insertionDate)
                )
              );
              costsArray[2].push(usersInRegion[j]["heatUsage"][i].cost);
            }
          }

          for (let i = 0; i < uniqueMonths.length; i++) {
            let costsArray = newMap.get(uniqueMonths[i]);
            let electric = 0;
            let water = 0;
            let heat = 0;
            for (let j = 0; j < costsArray[0].length; j++) {
              electric += costsArray[0][j];
            }
            for (let j = 0; j < costsArray[1].length; j++) {
              water += costsArray[1][j];
            }
            for (let j = 0; j < costsArray[2].length; j++) {
              heat += costsArray[2][j];
            }
            electricCostArray.push(electric);
            waterCostArray.push(water);
            heatCostArray.push(heat);
          }

          totalCost = electricCost + waterCost + heatCost;
          costsArray = [electricCost, waterCost, heatCost];

          dateArray = uniqueMonths;

          this.setState({
            electricCost: electricCost.toFixed(2),
            waterCost: waterCost.toFixed(2),
            heatCost: heatCost.toFixed(2),
            electricCostArray: electricCostArray,
            waterCostArray: waterCostArray,
            heatCostArray: heatCostArray,
            dateArray: dateArray,
            totalCost: totalCost.toFixed(2),
            costsArray: costsArray,
            userRegion: region,
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
          label={this.state.userCity.toUpperCase()}
          variant="outlined"
        />
      );
    } else if (this.props.isSelfCityRegion === "region") {
      breadcrumb = "Regione";
      cityOrRegion = (
        <Chip
          icon={<SouthAmericaIcon />}
          label={this.state.userRegion.toUpperCase()}
          variant="outlined"
        />
      );
    }

    return (
      <Grid mt={5} container spacing={3}>
        <Grid item xs={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography variant="h6" component="h2">
              Dashboard
            </Typography>
            <Typography variant="h6" component="h2">
              {breadcrumb}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Panoramica
            </Typography>
          </Breadcrumbs>
          <Typography sx={{ marginTop: "1rem" }} variant="h5" component="h2">
            {cityOrRegion}
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <ReactApexChart
                series={[
                  {
                    name: "Costo Elettricità",
                    data: this.state.electricCostArray,
                  },
                  {
                    name: "Costo Acqua",
                    data: this.state.waterCostArray,
                  },
                  {
                    name: "Costo energia termica",
                    data: this.state.heatCostArray,
                  },
                ]}
                options={{
                  chart: {
                    type: "bar",
                    height: 350,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "55%",
                      endingShape: "rounded",
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                  },
                  xaxis: {
                    categories: this.state.dateArray,
                  },
                  yaxis: {
                    title: {
                      text: "€ Euro",
                    },
                  },
                  fill: {
                    opacity: 1,
                  },
                  tooltip: {
                    y: {
                      formatter: function(val) {
                        return "€" + val;
                      },
                    },
                  },
                }}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={5.5}>
          <Card>
            <CardContent>
              <ReactApexChart
                series={this.state.costsArray}
                options={{
                  chart: {
                    redrawOnParentResize: true,
                  },
                  labels: [
                    "Costo elettricità €",
                    "Costo acqua €",
                    "Costo riscaldamento €",
                  ],
                  responsive: [
                    {
                      breakpoint: 3000,
                      options: {
                        chart: {
                          height: 300,
                          redrawOnParentResize: true,
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                }}
                type="pie"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} align="center" md={3}>
          <Card sx={{ minWidth: 275, mb: 1 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Spesa totale luce
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.electricCost + " €"}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Spesa totale acqua
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.waterCost + " €"}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Spesa totale riscaldamento
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.heatCost + " €"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3.5}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Spesa Totale
              </Typography>
              <Typography variant="h4" component="div">
                {this.state.totalCost + " €"}
              </Typography>
            </CardContent>
          </Card>
          <br></br>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Spesa totale ultimo mese
              </Typography>
              <Typography variant="h4" component="div">
                {(
                  this.state.heatCostArray[
                    this.state.heatCostArray.length - 1
                  ] +
                  this.state.waterCostArray[
                    this.state.waterCostArray.length - 1
                  ] +
                  this.state.electricCostArray[
                    this.state.electricCostArray.length - 1
                  ]
                ).toFixed(2) + " €"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
