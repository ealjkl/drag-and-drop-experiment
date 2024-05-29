import { useState } from "react";
import { PageModel } from "./pageTypes";

export function usePages() {
  const [pages, setPages] = useState([] as PageModel[]);
  return { pages, setPages };
}
