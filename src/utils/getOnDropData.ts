export function getOnDropData<TData, TElement extends HTMLElement>(
  ev: React.DragEvent<TElement>
) {
  const dataString = ev.dataTransfer.getData("application/my-app");
  const data = JSON.parse(dataString) as TData;
  return data;
}
