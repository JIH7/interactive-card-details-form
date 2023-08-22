import cardBack from "../assets/bg-card-back.png"
import "../css/CardBack.css"

function CardBack(props: {cardCvc: string}) {
  return (
    <div className="card-back">
        <img className="card-img-back" src={cardBack} alt="card-back" />
        <span className="card-cvc">{props.cardCvc}</span>
    </div>
  )
}

export default CardBack
