import DispararMsg from "./DispararMsgs"
import Home from "./Home"

function Render ({page}) {
  if(page === '0') {
    return (
      <Home />
    )
  }
  if(page === '1') {
    return (
      <DispararMsg />
    )
  }

}


export default Render