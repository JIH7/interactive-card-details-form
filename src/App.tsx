import { useState } from 'react'
import './css/App.css'

import backgroundDesktop from "./assets/bg-main-desktop.png"
import backgroundMobile from "./assets/bg-main-mobile.png"

import CardFront from './components/CardFront'
import CardBack from './components/CardBack';
import Form from './components/Form'
import ThanksMenu from './components/ThanksMenu'

function App() {
  const [cardNum, setCardNum] = useState("0000 0000 0000 0000");
  const [cardName, setCardName] = useState("JANE APPLESEED");
  const [cardDate, setCardDate] = useState("00/00");
  const [cardCvc, setCardCvc] = useState("000")

  const [formComplete, setFormComplete] = useState(false);

  const clearCard = () => {
    setCardNum("0000 0000 0000 0000");
    setCardName("JANE APPLESEED");
    setCardDate("00/00");
    setCardCvc("000");

    setFormComplete(false);
  }

  return (
    <>
      <img className='bg-mobile' src={backgroundMobile} alt="bg-mobile" />
      <img className='bg-desktop' src={backgroundDesktop} alt="bg-desktop" />
      <CardFront cardNum={cardNum} cardName={cardName} cardDate={cardDate}/>
      <CardBack cardCvc={cardCvc} />
      {
      !formComplete ?
      <Form setCardNum={setCardNum} setCardName={setCardName} setCardDate={setCardDate} setCardCvc={setCardCvc} setFormComplete={setFormComplete}/> :
      <ThanksMenu clearCard={clearCard} />
      }
    </>
  )
}

export default App
