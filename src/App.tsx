import { useState } from 'react'
import './css/App.css'
import CardFront from './components/CardFront'
import CardBack from './components/CardBack';

function App() {
  const [cardNum, setCardNum] = useState("0000 0000 0000 0000");
  const [cardName, setCardName] = useState("JANE APPLESEED");
  const [cardDate, setCardDate] = useState("00/00");
  const [cardCvc, setCardCvc] = useState("000")

  return (
    <>
      {/* <CardFront cardNum={cardNum} cardName={cardName} cardDate={cardDate}/> */}
      <CardBack cardCvc={cardCvc} />
    </>
  )
}

export default App
