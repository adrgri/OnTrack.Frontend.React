import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/logos/Logo.svg";
import { useTheme } from "@mui/material/styles";
import ExitIcon from "../../assets/icons/NavbarIcons/ExitIcon.svg";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const navigationItems = [
  {
    text: "Moje zadania",
    to: "/",
  },
  {
    text: "Projekty",
    to: "/projects",
  },
  {
    text: "Ustawienia",
    to: "/settings",
  },
  {
    icon: <img src={ExitIcon} alt="Wyjście" />,
    text: "Wyjście",
    to: "/login",
  },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const theme = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "";

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: theme.palette.secondary.main, height: "64px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "64px" }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" height={"30px"} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: theme.palette.primary.main }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navigationItems.map((item) => (
                <MenuItem
                  key={item.text}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color:
                      item.text === "Wyjście"
                        ? "#5E5F7D"
                        : theme.palette.primary.main,
                    ...(item.text === "Wyjście" && {
                      mt: 2,
                    }),
                  }}
                >
                  <Link
                    to={item.to}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    onClick={item.text === "Wyjście" ? handleLogout : undefined}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {item.icon}
                      <Typography marginLeft={1} textAlign="center">
                        {item.text}
                      </Typography>
                    </div>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" height={"30px"} />
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              paddingRight: 4,
            }}
          >
            {navigationItems.map((item) => (
              <MenuItem
                key={item.text}
                onClick={handleCloseNavMenu}
                sx={{ marginLeft: item.text === "Wyjście" ? "50px" : 0 }}
              >
                <NavLink
                  to={item.to}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color:
                      item.text === "Wyjście"
                        ? "#5E5F7D"
                        : theme.palette.primary.main,
                    borderBottom: isActive
                      ? `2px solid ${theme.palette.primary.main}`
                      : "none",
                  })}
                  onClick={item.text === "Wyjście" ? handleLogout : undefined}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.icon}
                    {item.icon ? (
                      <Typography marginLeft={1}>{item.text}</Typography>
                    ) : (
                      <Typography>{item.text}</Typography>
                    )}
                  </div>
                </NavLink>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <Avatar alt={firstLetter} src={user?.avatar ?? ""}>
                {firstLetter}
              </Avatar>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
