import React, { useState } from "react";
import classes from "./form.module.css";
import cloneDeep from "lodash/cloneDeep";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
const NewList = (props) => {
  const [input, setInput] = useState({
    title: "",
  });
  const [touched, setTouched] = useState({
    title: false,
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTouched((input) => {
      return {
        ...input,
        [name]: true,
      };
    });
    setInput((input) => {
      return {
        ...input,
        [name]: value,
      };
    });
  };

  const addList = () => {
    if (input.title === "") {
      setTouched({ title: true });
      return;
    }
    const newList = {
      title: input.title,
      cards: [],
    };
    let newLists = cloneDeep(props.lists);
    newLists.push(newList);
    props.setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
    props.handleClose();
  };
  return (
    <div className={classes.container}>
      <div className={[classes.row, classes.header].join(" ")}>NewList</div>
      <div className={classes.form}>
        <div className={classes.row}>
          <div className={classes.label}>Title</div>
          <div className={classes.input_container}>
            <input
              type="text"
              name="title"
              value={input.title}
              className={[classes.input, classes.title].join(" ")}
              onChange={inputHandler}
            />
            {input.title === "" && touched.title && (
              <div className={classes.error}>This is required field.</div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.btn_container}>
          <button
            className={[classes.btn, classes.add].join(" ")}
            onClick={addList}
          >
            Add
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
  );
};

const mapStateToProps = (state) => {
  return {
    lists: state.trello.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLists: (lists) => dispatch(actions.setList(lists)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewList);
