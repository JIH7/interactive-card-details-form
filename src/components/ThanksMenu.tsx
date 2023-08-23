import checkMark from "../assets/icon-complete.svg"
import "../css/ThanksMenu.css"

function ThanksMenu(props: {clearCard: Function}) {
  return (
    <section>
      <img src={checkMark} alt="check-mark" />
      <h1>Thank you!</h1>
      <p>We've added your card details</p>
      <button onClick={() => props.clearCard()}>Continue</button>
    </section>
  )
}

export default ThanksMenu
