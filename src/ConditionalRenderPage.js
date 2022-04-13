import DispararMsg from "./DispararMsgs"
import Home from "./Home"

function Render ({page}) {
  return page === '0' ? <Home /> : <DispararMsg />
}


export default Render