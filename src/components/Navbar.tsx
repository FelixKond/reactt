import { useState } from "react";
import { Link } from "react-router-dom";
import { Oleg_ROUTE, Sonia_ROUTE, Maxim_ROUTE, TABLE } from "../app/routes/config";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginButtonText = isLoggedIn ? "Выйти" : "Войти";

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <Link to={Oleg_ROUTE} className="routeLink">
              Oleg
            </Link>
            <Link to={Sonia_ROUTE} className="routeLink">
              Sonia
            </Link>
            <Link to={Maxim_ROUTE} className="routeLink">
              Maxim
            </Link>
            <Link to={TABLE} className="routeLink">
              Таблица
            </Link>
          </div>
          <div>
            <div>
              <button onClick={handleLoginToggle}>{loginButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
