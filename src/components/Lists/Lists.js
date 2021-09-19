import React, { useEffect } from "react";
import classes from "./Lists.module.css";
import List from "../List/List";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
const Lists = (props) => {
  useEffect(() => {}, [props.lists]);

  return (
    <div className={classes.container}>
      {props.lists.map((list, index) => (
        <List title={list.title} cards={list.cards} key={index} index={index} />
      ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
