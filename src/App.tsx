import { useState } from 'react'
import './css/App.css'

import backgroundDesktop from "./assets/bg-main-desktop.png"
import backgroundMobile from "./assets/bg-main-mobile.png"

import CardFront from './components/CardFront'
import CardBack from './components/CardBack';
import Form from './components/Form'

function App() {
  const [cardNum, setCardNum] = useState("0000 0000 0000 0000");
  const [cardName, setCardName] = useState("JANE APPLESEED");
  const [cardDate, setCardDate] = useState("00/00");
  const [cardCvc, setCardCvc] = useState("000")

  return (
    <>
      {/* <img className='bg-mobile' src={backgroundMobile} alt="bg-mobile" />
      <img className='bg-desktop' src={backgroundDesktop} alt="bg-desktop" />
      <CardFront cardNum={cardNum} cardName={cardName} cardDate={cardDate}/>
      <CardBack cardCvc={cardCvc} /> */}
      <Form />
    </>
  )
}

export default App
