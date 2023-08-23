import cardImg from "../assets/bg-card-front.png"
import cardLogo from "../assets/card-logo.svg"
import "../css/CardFront.css"

function CardFront(props: {cardNum: string, cardName: string, cardDate: string}) {
  return (
    <aside className="card-front">
      <img className="card-img" src={cardImg} alt="card-front" />
      <img className="card-logo" src={cardLogo} alt="card-logo" />
      <span className="card-num">{props.cardNum}</span>
      <span className="card-name">{props.cardName}</span>
      <span className="card-date">{props.cardDate}</span>
    </aside>
  )
}

export default CardFront
