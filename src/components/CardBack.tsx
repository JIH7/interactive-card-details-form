import cardBack from "../assets/bg-card-back.png"
import "../css/CardBack.css"

function CardBack(props: {cardCvc: string}) {
  return (
    <aside className="card-back">
        <img className="card-img-back" src={cardBack} alt="card-back" />
        <span className="card-cvc">{props.cardCvc}</span>
    </aside>
  )
}

export default CardBack
