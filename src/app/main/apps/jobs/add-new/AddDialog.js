import { Fragment, useState } from "react";
import { ButtonGroup } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import FlagIcon from '@material-ui/icons/Flag';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getDepartments } from "../store/worksSlice";
import { useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import { Controller, useForm } from "react-hook-form";
import {addWork} from '../store/workSlice'

const useStyles = makeStyles((theme) => ({
    
  paper: { padding: "3rem", maxWidth: "990px", minWidth: "400px" },
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

const AddDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [assignToUserDialog, setAssignToUserDialog] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [assignmentNote, setAssignmentNote] = useState("");
  const [userId, setUserId] = useState(0);
  //   const jobDialog = useSelector(({ jobsApp }) => worksApp.works);
  const [departmentId, setDepartmentId] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')



  useEffect(() => {
    getDepartments().then((response) => {
      console.log("departements response in approve: ", response);
      setDepartments(response);
    });
  }, []);


 
 
  const handleDialogClose = () => setDialogOpen(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };


  const handleNameChange =(e) =>{
    setName(e.target.value)
  }
  const handleDescriptionChange =(e) =>{
    setDescription(e.target.value)
  }
   const addJobHandleClick = () => {
    enqueueSnackbar(
      "Job added successfully",
      { variant: "success" },
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
      { TransitionComponent: Slide }
    );
  };
 
 

 

  return (
    <>
      <ButtonGroup size="medium">
       
        <Button
          onClick={(ev) => {
            handleClickOpen();
          }}
          className="whitespace-nowrap"
          variant="contained"
          color="secondary"
          
        >
          Add new Job
        </Button>
       
      </ButtonGroup>


      {/* assign to user dialog */}

      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth="sm"
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "10rem", marginBottom: '2rem', color: "#212529" }}>
          Add Job
        </DialogTitle>
        <div
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 10,
            padding: "2rem",
            paddingLeft: "2rem",
            marginLeft: 10,
          }}
        >
          <DialogContentText style={{ fontWeight: 600 }}>
            {" "}
            <FlagIcon
              style={{ fontSize: 40, color: "#aacc00", paddingRight: "1rem" }}
            />
            You must fill in all fields
            
          </DialogContentText>
          <DialogContentText>in addition to that you must add the job to a Department
          </DialogContentText>
        </div>

        <DialogContent style={{ marginTop: "6rem" }}>
        <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
        
                <TextField
                  value={name} 
                  onChange={handleNameChange}
                  className="mb-24"
                  label="Name"
                  id="name"
                  variant="outlined"
                  required
                  fullWidth
                  color= 'primary'
                />
              
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">description</Icon>
            </div>
           
                <TextField
                  value={description}
                  onChange={handleDescriptionChange}
                  className="mb-5"
                  label="description"
                  id="description"
                  variant="outlined"
                  fullWidth
                  color= 'primary'
                />
             
          </div>

          <DialogTitle sx={{ fontSize: '3rem'}}>Assign a Job to department</DialogTitle>
  
          <Autocomplete
              id="combo-box-demo"
              onChange={(event, value) => {
                console.log("value vvv:", value);
                console.log("value.id: ", value.id);
                setDepartmentId(value.id);
              }} // prints the selected value
              // value={users || ""}
              options={departments || []}
              getOptionLabel={(option) => option.title || ""}
              sx={{ width: 900 }}
              defaultValue={departments?.find((v) => v.title[0])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search Department"
                  fullWidth
                  InputProps={{ ...params.InputProps, style: { fontSize: 15  } }}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                />
              )}
            />
  
        </DialogContent>

    
       
        <DialogActions>
          <div style={{ paddingRight: "1rem" }}>
            <Button
              onClick={handleDialogClose}
              style={{ color: "#dc3c24", fontWeight: 500 }}
              autoFocus
            >
              Cancel
            </Button>

            <Button

                onClick={(ev) => {
                    ev.stopPropagation();
                    addJobHandleClick(ev);
                    dispatch(addWork({ name, description, departmentId }));
                  }}
           
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialog;
