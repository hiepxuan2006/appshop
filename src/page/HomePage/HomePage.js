import style from "./HomePage.module.scss";
import classNames from "classnames/bind";
import Slider from "~/app/slider";
const cx = classNames.bind(style);

const HomePage = () => {
  return (
    <div className={cx("wrapper")}>
      <Slider />
    </div>
  );
};

export default HomePage;
