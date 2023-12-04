import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import AbcIcon from "@mui/icons-material/Abc";
import DigitalSalesIcon from "@mui/icons-material/ShoppingCart";
import SEOIcon from "@mui/icons-material/Search";
import SMOIcon from "@mui/icons-material/Share";
import AdCampaignIcon from "@mui/icons-material/Campaign";
import ServicingIcon from "@mui/icons-material/Build";
import ERPAppsIcon from "@mui/icons-material/Apps";
import AgentsIcon from "@mui/icons-material/SupervisorAccount";
import AddAgentIcon from "@mui/icons-material/PersonAdd";
import HistoryIcon from "@mui/icons-material/History";
import ActiveIcon from "@mui/icons-material/CheckCircle";
import ArchivedIcon from "@mui/icons-material/Archive";
import LiveCallIcon from "@mui/icons-material/PhoneInTalk";
import SupportIcon from "@mui/icons-material/Help";
import ChatIcon from "@mui/icons-material/Chat";
import CallIcon from "@mui/icons-material/Phone";
import ChatbotIcon from "@mui/icons-material/Chat";
import ConfigureChatbotIcon from "@mui/icons-material/Settings";
import ChatbotHistoryIcon from "@mui/icons-material/History";
import ActiveChatbotIcon from "@mui/icons-material/CheckCircle";
import ArchivedChatbotIcon from "@mui/icons-material/Archive";
import DefaultIcon from "@mui/icons-material/StarBorder";
import { GET_TABS_API } from "../Const";
import RenderPage from "./renderPages";

const iconMapping = {
  "Digital Sales": DigitalSalesIcon,
  SEO: SEOIcon,
  SMO: SMOIcon,
  "Ad Campaign": AdCampaignIcon,
  Servicing: ServicingIcon,
  "ERP Apps": ERPAppsIcon,
  Agents: AgentsIcon,
  "Add Agent": AddAgentIcon,
  History: HistoryIcon,
  Active: ActiveIcon,
  Archived: ArchivedIcon,
  "Live Call": LiveCallIcon,
  Support: SupportIcon,
  "Chat with us": ChatIcon,
  "Call Us": CallIcon,
  Chatbot: ChatbotIcon,
  "Configure Chatbot": ConfigureChatbotIcon,
  "Chatbot History": ChatbotHistoryIcon,
  "Active Chatbot": ActiveChatbotIcon,
  "Archived Chatbot": ArchivedChatbotIcon,
};

const selectIcon = (tabName) => {
  return iconMapping[tabName] || DefaultIcon;
};
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const organizeTabs = (tabsData) => {
  const mainTabs = tabsData
    .filter((tab) => tab.parentId === "0" && tab.isActive && tab.isView)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const subTabs = tabsData
    .filter((tab) => tab.parentId !== "0" && tab.isActive && tab.isView)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return mainTabs.map((tab) => ({
    ...tab,
    subItems: subTabs.filter(
      (subTab) => subTab.parentId === tab.encryptedTabId
    ),
  }));
};

export default function Dashboard() {
  const theme = useTheme();
  const token = useSelector((state) => state.login.token);
  const [open, setOpen] = React.useState(false);
  const [openSubMenus, setOpenSubMenus] = React.useState({});
  const [tabs, setTabs] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState("Dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(GET_TABS_API, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (data.success && data.status === 200) {
            setTabs(organizeTabs(data.tabs));
          }
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleSubMenu = (item) => {
    setOpenSubMenus((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const renderListItems = (items, level = 0) => {
    return items.map((item, index) => (
      <React.Fragment key={item.encryptedTabId}>
        {console.log(items)}
        <ListItem disablePadding sx={{ display: "block" }}>
          <Tooltip
            title={item.displayName}
            placement="right"
            disableHoverListener={open}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                pl: level * 4 + 2.5,
              }}
              onClick={() =>
                item.webPage
                  ? setCurrentPage(item.webPage)
                  : toggleSubMenu(item.encryptedTabId)
              }
            >
              <ListItemIcon>
                {React.createElement(selectIcon(item.displayName))}
              </ListItemIcon>
              <ListItemText
                primary={item.displayName}
                sx={{ opacity: open ? 1 : 0 }}
              />
              {open && item.subItems && <ExpandMoreIcon />}
            </ListItemButton>
          </Tooltip>
        </ListItem>
        {item.subItems && item.subItems.length > 0 && (
          <Collapse
            in={openSubMenus[item.encryptedTabId]}
            timeout="auto"
            unmountOnExit
          >
            {renderListItems(item.subItems, level + 1)}
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            365 AITECH SERVICE PANEL
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <AbcIcon sx={{ fontSize: 50 }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderListItems(tabs)}</List>
      </Drawer>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Typography variant="h2" component="h2">
          <RenderPage currentPage={currentPage} />
        </Typography>
      </Box>
    </Box>
  );
}
