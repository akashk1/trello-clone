import React, { useState, useEffect } from "react";
import classes from "./List.module.css";
import Cards from "../Cards/Cards";
import CloseIcon from "../../assest/Icon/circularclose.svg";
import AddIcon from "../../assest/Icon/plus.svg";
import { useDrop } from "react-dnd";
import Modal from "../Modal/Modal";
import TaskForm from "../Form/Task";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import DeletePromt from "../Form/DeletePromt";
import { cloneDeep } from "lodash";
const List = (props) => {
  useEffect(() => {}, [props.lists]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "card",
    canDrop: (item, monitor) => {
      if (item.listIndex === props.index) return false;
      return true;
    },
    drop: (item, monitor) => {
      return { card: item.cardIndex, to: props.index, from: item.listIndex };
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [open, setOpen] = useState(false);
  const [deletModal, setDeleteModal] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const deleteList = () => {
    let newList = cloneDeep(props.lists);
    newList = newList.filter((_, index) => index != props.index);
    localStorage.setItem("lists", JSON.stringify(newList));
    props.setLists(newList);
    setDeleteModal(false);
  };
  const DeleteListConfirmation = () => {
    if (props.lists[props.index].cards.length === 0) deleteList();
    else setDeleteModal(true);
  };
  return (
    <div className={classes.container} ref={drop}>
      <Modal open={open}>
        <TaskForm
          mode="create"
          handleClose={closeModal}
          listIndex={props.index}
        />
      </Modal>
      <Modal open={deletModal}>
        <DeletePromt
          handleClose={() => setDeleteModal(false)}
          onDelete={deleteList}
        />
      </Modal>
      <div className={classes.header}>
        <div className={classes.header_title}>{props.title}</div>
        <div className={classes.delete_list}>
          <img
            src={CloseIcon}
            className={classes.close}
            onClick={DeleteListConfirmation}
            alt="X"
          />
        </div>
      </div>
      <div className={classes.list}>
        <Cards cards={props.cards} listIndex={props.index} />
      </div>
      <div className={classes.footer}>
        <img
          src={AddIcon}
          className={classes.add}
          onClick={openModal}
          alt="add"
        />
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

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(List));
