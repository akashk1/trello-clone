import React from "react";
import classes from "./Cards.module.css";
import Card from "../Card/Card";

const Cards = (props) => {
  return (
    <div className={classes.container}>
      {props.cards.map((card, index) => {
        return (
          <Card
            title={card.title}
            key={index}
            cardDescription={card.description}
            cardIndex={index}
            listIndex={props.listIndex}
            time={card.creationTime}
          />
        );
      })}
    </div>
  );
};

export default Cards;
