## 封装react-beautiful-dnd组件

```js
import React, { ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

// 用自己的children替换props的children
type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};

```

## 在代码中使用
```ts
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

export const DragScreen = () => {
   return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Drop
        type={"COLUMN"}
        direction={"horizontal"}
        droppableId={"kanban"}
      >
        <DropChild style={{ display: "flex" }}>
          {kanbans?.map((kanban, index) => (
            <Drag
              key={kanban.id}
              draggableId={"kanban" + kanban.id}
              index={index}
            >
              <KanbanColumn kanban={kanban} key={kanban.id} />
            </Drag>
          ))}
        </DropChild>
      </Drop>
    </DragDropContext>
   )
}
```
