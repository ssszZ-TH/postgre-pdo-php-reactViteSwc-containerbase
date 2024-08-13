import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import Randomlongtxt from './components/Randomlongtxt'
import DataTable from "./components/DataTable";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const focusOnProgram = () => {
    console.log("focus on entity 1");
  };

  const init = () => {

    axios({
      method: "OPTIONS",
      url: "http://localhost:3001/program",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer token_here",
      },
    })
      .then((response) => {
        console.log("Preflight Success:", response);
      })
      .catch((error) => {
        console.error("Preflight Error:", error);
      });

  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ResponsiveAppBar focusOnProgram={focusOnProgram} />
      <DataTable />
      {/* <Randomlongtxt /> */}
    </>
  );
}

export default App;
