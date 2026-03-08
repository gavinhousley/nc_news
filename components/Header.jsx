import LoginInfo from "./LoginInfo";
import logo from "../src/assets/north-news-logo.png";
function Header() {
  return (
    <header>
      <img className="logo" src={logo} alt="Northcoders News Logo" />
      <h1>Northcoders News</h1>
      <LoginInfo />
    </header>
  );
}

export default Header;
