import { ReactNode } from "react";
import style from "./Editor.module.css";
import { Page } from "./Page";
import { usePages } from "../features/pages/usePages";
import { nanoid } from "nanoid";
import { PageModel } from "../features/pages/pageTypes";

export function Editor() {
  const { pages, setPages } = usePages();
  const handleAddPage = () => {
    const newPage: PageModel = {
      id: nanoid(),
      elements: [],
    };
    setPages((pages) => [...pages, newPage]);
  };

  return (
    <div className={style["editor"]}>
      <Drawer>
        <button onClick={handleAddPage}>Add page</button>
        <DraggableDrawerSection />
      </Drawer>
      <Main>
        {pages.map((page) => (
          <Page key={page.id} page={page} setPages={setPages} />
        ))}
      </Main>
    </div>
  );
}

function DraggableDrawerSection() {
  const elementTypes = ["Text", "View"] as const;
  return (
    <>
      {elementTypes.map((type) => (
        <DraggableDrawerElement key={type} type={type}>
          {type}
        </DraggableDrawerElement>
      ))}
    </>
  );
}

function DraggableDrawerElement({
  type,
  children,
}: {
  type: string;
  children?: ReactNode;
}) {
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (ev) => {
    // Add the target element's id to the data transfer object
    console.log("is this working?");

    ev.dataTransfer.setData(
      "application/my-app",
      JSON.stringify({
        type,
      })
    );
    ev.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable="true"
      className={style["drawer-button"]}
      onDragStart={handleDragStart}
    >
      {children}
    </div>
  );
}

export function Main({ children }: { children?: ReactNode }) {
  return <main className={style["main"]}>{children}</main>;
}

export function Drawer({ children }: { children?: ReactNode }) {
  return <aside className={style["drawer"]}>{children}</aside>;
}
