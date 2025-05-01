import css from "./ImageCard.module.css";

export default function ImageCard({ image, onImageClick }) {
  return (
    <div className={css.card} onClick={() => onImageClick(image.urls.regular)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
      />
    </div>
  );
}
