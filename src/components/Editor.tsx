import { ElementRef, Fragment, ReactNode } from "react";
import style from "./Editor.module.css";
import { Page } from "./Page";
import { usePages } from "../features/pages/usePages";
import { nanoid } from "nanoid";
import { PageModel } from "../features/pages/pageTypes";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

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
        <DragAndDropDrawerSection />
      </Drawer>
      <Main>
        {pages.map((page) => (
          <Page page={page} />
        ))}
      </Main>
    </div>
  );
}

function DragAndDropDrawerSection() {
  const elementTypes = ["Text", "View"];
  const [parentRef, values] = useDragAndDrop<ElementRef<"ul">, string>(
    elementTypes
  );
  return (
    <ul ref={parentRef}>
      {values.map((type) => (
        <div key={type} className={style["drawer-button"]}>{type}</div>
      ))}
    </ul>
  );
}

export function Main({ children }: { children?: ReactNode }) {
  return <main className={style["main"]}>{children}</main>;
}

export function Drawer({ children }: { children?: ReactNode }) {
  return <aside className={style["drawer"]}>{children}</aside>;
}
