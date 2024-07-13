/* eslint-disable react/prop-types */
import style from './Layout.module.css';
import Menu from './Menu';
import Navbar from './Navbar';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className={style.defaultLayout}>
        <div className={style.left}>
          <Menu />
        </div>
        <div className={style.right}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
