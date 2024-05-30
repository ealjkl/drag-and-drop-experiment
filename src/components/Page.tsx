import { Dispatch, SetStateAction, useRef } from "react";
import { PageElementModel, PageModel } from "../features/pages/pageTypes";
import style from "./Page.module.css";
import { getOnDropData } from "../utils/getOnDropData";
import { nanoid } from "nanoid";

type DistanceData = {
  element: HTMLElement;
  distance: number;
};

export function Page({
  page,
  setPages,
}: {
  page: PageModel;
  setPages: Dispatch<SetStateAction<PageModel[]>>;
}) {
  const pageId = page.id;
  const lastElement = useRef<{ distanceData: DistanceData }>(null);

  type PageCallback = (page: PageModel) => PageModel;
  const setPage = (pageCallback: PageCallback) => {
    setPages((pages) =>
      pages.map((p) => {
        if (p.id == pageId) {
          return pageCallback(p);
        }
        return p;
      })
    );
  };

  const handleOnDrop: React.DragEventHandler<HTMLDivElement> = (ev) => {
    console.log("wuut x2");
    ev.preventDefault();
    console.log("wuut");
    const elementData = getOnDropData<
      {
        elmentType: string;
      },
      HTMLDivElement
    >(ev);
    console.log("ev target", ev.target);

    const newElement: PageElementModel = {
      id: nanoid(),
      ...elementData,
      elements: [],
    };

    setPage((prevPage) => {
      return {
        ...prevPage,
        elements: [...prevPage.elements, newElement],
      };
    });
  };

  return (
    <div
      className={style["page"]}
      onDrop={handleOnDrop}
      onDragOver={(ev) => {
        ev.preventDefault();
        console.log("dragging over");
        const elementsInDom = [
          ...document.querySelectorAll("[data-element-id]"),
        ];
        if (elementsInDom.length == 0) return;
        const currY = ev.clientY;
        const elementsDistanceData: DistanceData[] = elementsInDom.map(
          (el) => ({
            distance: Math.abs(el.getBoundingClientRect().y - currY),
            element: el as HTMLElement,
          })
        );
        const closestData = elementsDistanceData.reduce((acc, data) => {
          if (data.distance < acc.distance) {
            return data;
          }
          return acc;
        });

        if (closestData) {
          closestData.element.style.backgroundColor = "blue";
        }
      }}
      onDragEnter={(ev) => {
        ev.preventDefault();
      }}
    >
      {page.elements.map((element) => {
        return <PageElementView key={element.id} element={element} />;
      })}
    </div>
  );
}

function PageElementView({ element }: { element: PageElementModel }) {
  return (
    <div
      data-element-id={element.id}
      style={{
        border: "1px solid black",
        margin: "1em 0",
      }}
    >
      {element.id}
    </div>
  );
}
