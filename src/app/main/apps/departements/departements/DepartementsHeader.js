import { React, useState } from "react";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { setOrdersSearchText } from "../store/departementsSlice";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: { padding: "3rem", maxWidth: "990px", minWidth: "300px" },
  textStyle: {
    paddingLeft: "2rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  font: {
    fontSize: "5rem",
  },
}));

function DepartementsHeader(props) {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchText = useSelector(
    ({ departementsApp }) => departementsApp.departements.searchText
  );
  const mainTheme = useSelector(selectMainTheme);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          account_tree
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-16 md:text-24 mx-12 font-semibold"
        >
          Departements
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Search"
              className="flex flex-1 mx-8"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                "aria-label": "Search",
              }}
              onChange={(ev) => dispatch(setOrdersSearchText(ev))}
            />
          </Paper>
        </ThemeProvider>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        <Button
          component={Link}
          to="/apps/departements-section/departements/new-departement"
          className="whitespace-nowrap"
          variant="contained"
          color="secondary"
          onClick={(ev) => {
            handleAssignToUserDialogOpen();
          }}
        >
          <span className="hidden sm:flex">Add New Departement</span>
          <span className="flex sm:hidden">New</span>
        </Button>
      </motion.div>
    </div>
  );
}

export default DepartementsHeader;