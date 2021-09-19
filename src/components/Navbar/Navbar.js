import React, { useState } from "react";
import classes from "./Navbar.module.css";
import Modal from "../Modal/Modal";
import NewList from "../Form/NewList";
const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <div className={classes.navbar}>
      <Modal open={open}>
        <NewList handleClose={closeModal} />
      </Modal>
      <div className={classes.add_list}>
        <button className={classes.btn} onClick={openModal}>
          Add List
        </button>
      </div>
    </div>
  );
};

export default Navbar;
