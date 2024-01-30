import NavBar from "./NavBar/NavBar";
import Planner from "./Body/Planner";

function HomeDashBoard() {
  return (
    <>
      <div className="flex flex-col">
        <NavBar />
        <Planner />
      </div>
    </>
  );
}
export default HomeDashBoard;
