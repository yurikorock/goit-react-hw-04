import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, innerRef }) {
  return (
    <button onClick={onClick} ref={innerRef} className={css.btn}>
      Load more
    </button>
  );
}
