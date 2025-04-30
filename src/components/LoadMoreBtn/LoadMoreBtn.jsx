import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, ref }) {
  return (
    <button onClick={onClick} ref={ref}>
      Load more
    </button>
  );
}
