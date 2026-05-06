import AppRouter from "./routes/AppRouter";

import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App(){

  return(
    <>

      {/* all routing */}
      <AppRouter/>

      {/* toast container */}
      <ToastContainer position="top-right"/>

    </>
  )
}

export default App;