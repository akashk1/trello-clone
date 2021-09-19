import React, { useState, useEffect } from "react";
import classes from "./form.module.css";
import cloneDeep from "lodash/cloneDeep";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
const Task = (props) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });

  useEffect(() => {
    if (props.mode === "edit") {
      const oldData = props.lists[props.listIndex].cards[props.cardIndex];
      setInput({ title: oldData.title, description: oldData.description });
    }
  }, []);
  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTouched((state) => {
      return {
        ...state,
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

  const addTask = () => {
    if (input.title === "" || input.description === "") {
      setTouched({ title: true, description: true });
      return;
    }
    const date = new Date();
    const newCard = {
      title: input.title,
      description: input.description,
      creationTime: `${date.toDateString()} ${date.toTimeString()}`,
    };
    let newLists = cloneDeep(props.lists);
    if (props.mode === "create") newLists[props.listIndex].cards.push(newCard);
    else {
      newLists[props.listIndex].cards[props.cardIndex] = newCard;
    }
    newLists[props.listIndex].cards.sort(
      (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
    );

    props.setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
    props.handleClose();
  };
  return (
    <div className={classes.container}>
      <div className={[classes.row, classes.header].join(" ")}>Task form</div>

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
              required
            />
            {input.title === "" && touched.title && (
              <div className={classes.error}>This is required field.</div>
            )}
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.label}>Description</div>
          <div className={classes.input_container}>
            <textarea
              type="textarea"
              name="description"
              required
              style={{ resize: "vertical", outline: "none" }}
              value={input.description}
              className={[classes.input, classes.description].join(" ")}
              onChange={inputHandler}
            />
            {input.description === "" && touched.description && (
              <div className={classes.error}>This is required field.</div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.btn_container}>
          <button
            type="submit"
            className={[classes.btn, classes.add].join(" ")}
            onClick={addTask}
          >
            {props.mode === "create" ? "Add" : "Save"}
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

export default connect(mapStateToProps, mapDispatchToProps)(Task);
