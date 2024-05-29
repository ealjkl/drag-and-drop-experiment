import { PageModel } from "../features/pages/pageTypes";
import style from "./Page.module.css";

export function Page({ page }: { page: PageModel }) {
  return <div className={style["page"]}></div>;
}
