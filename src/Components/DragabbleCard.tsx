import React from "react";
import {Draggable} from "react-beautiful-dnd";
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

interface IDragabbleCardProps{
    toDoId: number;
    toDoText: string;
    index: number;
}

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "tomato" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 25px rgba(0,0,0,0.05)" : "none"};
`;

function DragabbleCard({toDoId, toDoText, index}:IDragabbleCardProps) {
    return (<Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
          {toDoText}
          </Card>}
      </Draggable>);
}

export default React.memo(DragabbleCard);
 