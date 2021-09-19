import React, { useEffect, useState } from "react";
import classes from "./Card.module.css";
import { useDrag } from "react-dnd";
import CloseIcon from "../../assest/Icon/blackclose.svg";
import EditIcon from "../../assest/Icon/edit.svg";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Modal from "../Modal/Modal";
import TaskForm from "../Form/Task";
import { cloneDeep } from "lodash";
const Card = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: {
      type: "card",
      cardIndex: props.cardIndex,
      listIndex: props.listIndex,
    },
    canDrag: (monitor) => {
      return props.cardIndex < props.lists[props.listIndex].cards.length;
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        props.moveCard(dropResult.from, dropResult.to, dropResult.card);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const onDelete = () => {
    const newList = cloneDeep(props.lists);
    newList[props.listIndex].cards = newList[props.listIndex].cards.filter(
      (_, index) => index != props.cardIndex
    );
    localStorage.setItem("lists", JSON.stringify(newList));
    props.setLists(newList);
  };
  const time = props.time.split(" ");
  return (
    <div className={classes.container} ref={drag}>
      <Modal open={open}>
        <TaskForm
          mode="edit"
          handleClose={closeModal}
          listIndex={props.listIndex}
          cardIndex={props.cardIndex}
        />
      </Modal>
      <div className={classes.header}>
        <div className={classes.header_title}>{props.title}</div>
        <div className={classes.delete_card}>
          <img
            src={EditIcon}
            className={classes.edit}
            onClick={openModal}
            alt="edit"
          />
          <img
            src={CloseIcon}
            className={classes.close}
            onClick={onDelete}
            alt="X"
          />
        </div>
      </div>
      <div className={classes.body}>{props.cardDescription}</div>
      <div
        className={classes.footer}
      >{`${time[1]} ${time[2]} ${time[3]} ${time[4]} `}</div>
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
    moveCard: (from, to, card) => dispatch(actions.moveCard(from, to, card)),
    setLists: (lists) => dispatch(actions.setList(lists)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
