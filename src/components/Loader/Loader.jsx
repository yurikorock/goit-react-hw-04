import { FadeLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <FadeLoader color="#1695f1" height={15} radius={2} width={5} />
    </div>
  );
};
export default Loader;
