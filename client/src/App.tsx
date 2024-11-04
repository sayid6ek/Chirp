import { Outlet } from "react-router-dom";
import CreatePost from "./components/modals/CreatePost";

const App = () => {
  return (
    <div>
      <Outlet />
      <CreatePost />
    </div>
  );
};

export default App;
