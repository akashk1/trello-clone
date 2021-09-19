import React from "react";
import classes from "./form.module.css";
const DeletePromt = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>Delete List</div>

      <div
        className={classes.row}
        style={{
          height: 80,
          padding: 14,
          boxSizing: "border-box",
          fontSize: 15,
        }}
      >
        Are you sure you want to delete this item? This Process can not be
        undone.
      </div>
      <div className={classes.row}>
        <div className={classes.footer}>
          <div className={classes.btn_container}>
            <button
              className={[classes.btn, classes.delete].join(" ")}
              onClick={props.onDelete}
            >
              Delete
            </button>
            <button
              className={[classes.btn, classes.cancel].join(" ")}
              onClick={props.handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePromt;
