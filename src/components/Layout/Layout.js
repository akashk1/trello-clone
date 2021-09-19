import React, { useEffect, useCallback } from "react";
import Lists from "../Lists/Lists";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import data from "../../data";
import classes from "./Layout.module.css";
function Layout(props) {
  useEffect(() => {
    let lists = JSON.parse(localStorage.getItem("lists"));
    if (!lists) {
      lists = data;
    }
    lists = lists.map((list) => {
      list.cards.sort(
        (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
      );
      return list;
    });
    localStorage.setItem("lists", JSON.stringify(lists));
    props.setList(lists);
  }, []);
  useEffect(() => {}, [props.lists]);

  return (
    <div className={classes.container}>
      <Lists />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lists: state.trello.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setList: (lists) => dispatch(actions.setList(lists)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
