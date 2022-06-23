import "../scss/dashboard-style.scss";
import logo from "../img/logo.png";

import { PanoramicaComponent } from "./dashboard-components/panoramica.components";
import { UsageComponent } from "./dashboard-components/usage.components";
import { InsertData } from "./dashboard-components/insert-data.components";
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import WaterIcon from "@mui/icons-material/Water";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MenuIcon from "@mui/icons-material/Menu";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Userfront from "@userfront/react";
import {
  Link,
  CardHeader,
  Divider,
  List,
  Card,
  Drawer,
  AppBar,
  Menu,
  Avatar,
  Badge,
  ListItem,
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Button,
  styled,
} from "@mui/material";
import { amber } from "@mui/material/colors";

Userfront.init("rbv6pwxb");

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      mobileOpen: false,
      anchorElUser: "",
      isCompany: false,
      isSelfCityRegion: "self",
      isPanoramic: "true",
      usageType: "",
      insertDataView: false,
    };
    this.handleDashboardType = this.handleDashboardType.bind(this);
  }

  componentDidMount() {
    this.setState({
      refresh: !this.state.refresh,
    });
  }

  handleDashboardType(
    event,
    isPanoramic,
    isSelfCityRegion,
    usageType,
    insertDataBool
  ) {
    event.preventDefault();

    this.setState({
      refresh: !this.state.refresh,
    });

    if (insertDataBool) {
      this.setState({
        insertDataView: insertDataBool,
      });
    } else {
      if (isPanoramic) {
        this.setState({
          isPanoramic: isPanoramic,
          isSelfCityRegion: isSelfCityRegion,
          insertDataView: false,
        });
      } else {
        this.setState({
          isPanoramic: isPanoramic,
          isSelfCityRegion: isSelfCityRegion,
          usageType: usageType,
          insertDataView: false,
        });
      }
    }
  }

  render() {
    const handleDrawerToggle = () => {
      this.setState({
        mobileOpen: !this.state.mobileOpen,
      });
    };

    const drawerWidth = 240;

    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
      color: theme.palette.text.secondary,
      [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "&.Mui-expanded": {
          fontWeight: theme.typography.fontWeightRegular,
        },
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
          backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
          color: "var(--tree-view-color)",
        },
        [`& .${treeItemClasses.label}`]: {
          fontWeight: "inherit",
          color: "inherit",
        },
      },
      [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
          paddingLeft: theme.spacing(2),
        },
      },
    }));

    function StyledTreeItem(props) {
      const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
      } = props;

      return (
        <StyledTreeItemRoot
          label={
            <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
              <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "inherit", flexGrow: 1 }}
              >
                {labelText}
              </Typography>
              <Typography variant="caption" color="inherit">
                {labelInfo}
              </Typography>
            </Box>
          }
          style={{
            "--tree-view-color": color,
            "--tree-view-bg-color": bgColor,
          }}
          {...other}
        />
      );
    }

    StyledTreeItem.propTypes = {
      bgColor: PropTypes.string,
      color: PropTypes.string,
      labelIcon: PropTypes.elementType.isRequired,
      labelInfo: PropTypes.string,
      labelText: PropTypes.string.isRequired,
    };

    const drawer = (
      <div>
        <Link href="/">
          <img className="logo" src={logo} alt="LOGO" />
        </Link>
        <TreeView
          aria-label="gmail"
          defaultExpanded={["1"]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{
            height: "fit-content",
            flexGrow: 1,
            maxWidth: 400,
            mt: "2rem",
            overflowY: "auto",
          }}
        >
          <Card
            sx={{
              maxWidth: 345,
              marginLeft: "10px",
              marginRight: "10px",
              marginBottom: "3em",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: amber[700] }}
                  src="/img-standard.jpg"
                ></Avatar>
              }
              title={Userfront.user.username}
              subheader={Userfront.user.email}
            />
          </Card>

          <span
            onClick={(e) => this.handleDashboardType(e, true, "self", "", true)}
          >
            <StyledTreeItem
              nodeId="0"
              labelText="Inserisci dati"
              labelIcon={PostAddIcon}
              color="#1a73e8"
              bgColor="#e8f0fe"
            />
          </span>

          <StyledTreeItem
            nodeId="1"
            labelText="I miei dati"
            labelIcon={AccountCircleIcon}
          >
            <span
              onClick={(e) => this.handleDashboardType(e, true, "self", "")}
            >
              <StyledTreeItem
                nodeId="2"
                labelText="Panoramica"
                labelIcon={DataUsageIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              />
            </span>
            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "self", "water")
              }
            >
              <StyledTreeItem
                nodeId="3"
                labelText="Acqua"
                labelIcon={WaterIcon}
                color="#e3742f"
                bgColor="#fcefe3"
              />
            </span>
            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "self", "electric")
              }
            >
              <StyledTreeItem
                nodeId="4"
                labelText="Energia elettrica"
                labelIcon={ElectricalServicesIcon}
                color="#a250f5"
                bgColor="#f3e8fd"
              />
            </span>
            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "self", "heat")
              }
            >
              <StyledTreeItem
                nodeId="5"
                labelText="Gas"
                labelIcon={LocalFireDepartmentIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
              />
            </span>
          </StyledTreeItem>

          <StyledTreeItem
            nodeId="6"
            labelText="Città"
            labelIcon={LocationCityIcon}
          >
            <span
              onClick={(e) => this.handleDashboardType(e, true, "city", "")}
            >
              <StyledTreeItem
                nodeId="7"
                labelText="Panoramica"
                labelIcon={DataUsageIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              />
            </span>
            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "city", "water")
              }
            >
              <StyledTreeItem
                nodeId="8"
                labelText="Acqua"
                labelIcon={WaterIcon}
                color="#e3742f"
                bgColor="#fcefe3"
              />
            </span>

            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "city", "electric")
              }
            >
              <StyledTreeItem
                nodeId="9"
                labelText="Energia elettrica"
                labelIcon={ElectricalServicesIcon}
                color="#a250f5"
                bgColor="#f3e8fd"
              />
            </span>
            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "city", "heat")
              }
            >
              <StyledTreeItem
                nodeId="10"
                labelText="Gas"
                labelIcon={LocalFireDepartmentIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
              />
            </span>
          </StyledTreeItem>

          <StyledTreeItem
            nodeId="11"
            labelText="Regione"
            labelIcon={SouthAmericaIcon}
          >
            <span
              onClick={(e) => this.handleDashboardType(e, true, "region", "")}
            >
              <StyledTreeItem
                nodeId="12"
                labelText="Panoramica"
                labelIcon={DataUsageIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              />
            </span>
            <span
              ispanoramic="false"
              value="region"
              usagetype="water"
              onClick={(e) =>
                this.handleDashboardType(e, false, "region", "water")
              }
            >
              <StyledTreeItem
                nodeId="13"
                labelText="Acqua"
                labelIcon={WaterIcon}
                color="#e3742f"
                bgColor="#fcefe3"
              />
            </span>
            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "region", "electric")
              }
            >
              <StyledTreeItem
                nodeId="14"
                labelText="Energia elettrica"
                labelIcon={ElectricalServicesIcon}
                color="#a250f5"
                bgColor="#f3e8fd"
              />
            </span>
            <span
              onClick={(e) =>
                this.handleDashboardType(e, false, "region", "heat")
              }
            >
              <StyledTreeItem
                nodeId="15"
                labelText="Gas"
                labelIcon={LocalFireDepartmentIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
              />
            </span>
          </StyledTreeItem>
          <Divider />
          <Button
            className="dashboard-toolbar-button"
            variant="text"
            href="/contatti"
          >
            Contatti
          </Button>
          <Button
            className="dashboard-toolbar-button"
            variant="text"
            onClick={() => Userfront.logout()}
          >
            Log out
          </Button>
        </TreeView>
      </div>
    );

    const container = undefined;

    const handleOpenUserMenu = (event) => {
      this.setState({
        anchorElUser: event.currentTarget,
      });
    };

    const handleCloseUserMenu = () => {
      this.setState({
        anchorElUser: null,
      });
    };

    if (!Userfront.user.userUuid) {
      return <Navigate replace to="/login" />;
    } else {
      return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            className="navbar"
            position="fixed"
            sx={{
              width: "100%",
              ml: { sm: "100%" },
            }}
          >
            <Toolbar className="dashboard-app-bar">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 2, display: "flex" }}></Box>
              <Box sx={{ flexGrow: 0, display: "flex" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar>
                      {" "}
                      {Userfront.user.username.toUpperCase()[0]}{" "}
                    </Avatar>
                  </StyledBadge>
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={this.state.anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(this.state.anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <List>
                    {["Contatti", "Chi-siamo"].map((text, index) => (
                      <ListItem button key={text}>
                        <Link
                          underline="none"
                          className="navbar-button user-icon-menu-link"
                          href={`/${text}`}
                        >
                          {text.replace("-", " ")}
                        </Link>
                      </ListItem>
                    ))}
                    <ListItem button>
                      <Link
                        underline="none"
                        className="navbar-button user-icon-menu-link"
                        onClick={(e) =>
                          this.handleDashboardType(e, true, "self", "", true)
                        }
                        href="#"
                      >
                        Inserisci dati
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link
                        underline="none"
                        className="navbar-button user-icon-menu-link"
                        onClick={() => Userfront.logout()}
                        href="#"
                      >
                        Log out
                      </Link>
                    </ListItem>
                  </List>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: false,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            className="dashboard-view"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              height: "100vh",
            }}
          >
            {this.state.insertDataView ? (
              <InsertData />
            ) : this.state.isPanoramic ? (
              <PanoramicaComponent
                key={this.state.refresh}
                isCompany={false}
                isSelfCityRegion={this.state.isSelfCityRegion}
              />
            ) : (
              <UsageComponent
                key={this.state.refresh}
                isCompany={false}
                isSelfCityRegion={this.state.isSelfCityRegion}
                usageType={this.state.usageType}
              />
            )}
          </Box>
        </Box>
      );
    }
  }
}
