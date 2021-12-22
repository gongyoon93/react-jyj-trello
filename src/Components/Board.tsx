import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";


const Wrapper = styled.div`
  padding: 10px 0px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-flow: column;
`;

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
};

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? 
    "#dfe6e9" : props.isDraggingFromThis ?
     "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background- color 0.3s ease-in-out; 
    padding: 20px;
`;

interface IForm {
    toDo: string; 
}

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

function Board({toDos, boardId}:IBoardProps){
    const setToDos = useSetRecoilState(toDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
          id: Date.now(),
          text: toDo,
        };
        setToDos((allBoards) => {
          return {
            ...allBoards,
            [boardId]: [newToDo, ...allBoards[boardId]],
          };
        });
        setValue("toDo", "");
      };
    return ( 
    <Wrapper> 
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`} />
        </Form>
        <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
        <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => <DragabbleCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text } index={index} />)}
            {magic.placeholder}
        </Area>
        )}
        </Droppable>
    </Wrapper>
  );
}

export default Board;