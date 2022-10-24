import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AccountMenu from "./AccountMenu";
const Header = ({ goToLogout, currentUser }) => {
  return (
    <>
      <div className="headerAppName">SweetLine Chat</div>
      <div className="headerUserPanel">
        <AccountMenu currentUser={currentUser} goToLogout={goToLogout} />
      </div>
    </>
  );
};

export default Header;
