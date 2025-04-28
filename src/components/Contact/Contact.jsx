import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";

export default function Contact({ id, name, number, onDelete }) {
  return (
    <div className={css.contactCard}>
      <div className={css.infogroup}>
        <div className={css.info}>
          <FaUser className={css.icon} />
          <p>{name}</p>
        </div>
        <div className={css.info}>
          <FaPhone className={css.icon} />
          <p>{number}</p>
        </div>
      </div>

      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
