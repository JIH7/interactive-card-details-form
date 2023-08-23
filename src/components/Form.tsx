import { useState } from "react";

import "../css/Form.css"

function Form(props: {
  setCardNum: Function,
  setCardName: Function,
  setCardDate: Function,
  setCardCvc: Function,
  setFormComplete: Function
}) {
  const [cardNameErr, setCardNameErr] = useState("");
  const [cardNumErr, setCardNumErr] = useState("");
  const [cardExpErr, setCardExpErr] = useState("");
  const [cardCvcErr, setCardCvcErr] = useState("");

  const validateName = (name: string): boolean => {
    if(name === "") {
        setCardNameErr("Name may not be empty");
        return false;
    }

    const valid = /^[A-Za-z\s]*$/.test(name);
    if(!valid)
        setCardNameErr("Wrong format, letters and spaces only")

    return valid;
  }

  const isNum = (val: string) => {
    return /^\d+$/.test(val)
  }

  const luhnCheck = (cardNum: string): boolean => {
    if(cardNum === '') {
      setCardNumErr("Card number cannot be empty")
      return false;
    }
    if(!isNum(cardNum)) {
        setCardNumErr("Wrong format, numbers only")
        return false;
    }

    const arr = cardNum
      .split('')
      .reverse()
      .map((i) => parseInt(i));

    const lastDigit = arr.shift();
    let sum = arr.reduce(
      (acc: number, val: number, i: number) => 
      (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? (val
        .toString()
        .split('')
        .map(Number)
        .reduce(function (a, b) {
            return a + b;
        }, val)) : val))
    );
    sum += lastDigit ? lastDigit : 0;
    return sum % 10 === 0;
  }

  const addSpaces = (cardNum: string): string => { //Adds spaces to card number format
    let spaces = [4, 8, 12] //Split for 16 digit card

    if(cardNum.length === 15) { //Split for 15 digit (amex) card
      spaces = [4, 11]
    }

    spaces.forEach((space: number, i:number) => {
      const oldNum = cardNum;
      console.log("Old number = " + oldNum)
      cardNum = oldNum.slice(0, space + i) + " " + oldNum.slice(space + i);
      console.log(cardNum)
      console.log(space)
    })

    return cardNum;
  }

  const dateCheck = (mm: string, yy:string): boolean => { //Returns true if card date is not in the past
    if (mm === "") {
        setCardExpErr("Month may not be empty");
        return false;
    }
    if (!(isNum(mm) && isNum(yy))) {
        setCardExpErr("Wrong format, numbers only")
        return false;
    }
    const mmInt = parseInt(mm);
    if (mmInt > 12 || mmInt < 1) {
        setCardExpErr("Month must be between 01 and 12");
        return false;
    }
    if (yy === "") {
        setCardExpErr("Year may not be empty");
        return false;
    }
    if (!(mm.length === 2 && yy.length === 2)) {
        setCardExpErr("Expiry must be in MM/YY format")
        return false;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const cardYear = 2000 + parseInt(yy);
    
    if(cardYear > currentYear) {
      setCardExpErr("");
      return true;
    } else if (cardYear === currentYear) {
      const currentMonth = now.getMonth() + 1;
      if(parseInt(mm) >= currentMonth) {
        setCardExpErr("");
        return true;
      }
    }
    setCardExpErr("Date invalid.")
    return false;
  }

  const cvcCheck = (cvc: string): boolean => {
    if(!isNum(cvc)) {
      setCardCvcErr("Wrong format, numbers only")
      return false;
    } else if(cvc.length !== 3) {
      setCardCvcErr("CVC must be exactly 3 numbers.")
      return false;
    }
    return true;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      cardholderName: { value: string},
      cardNumber: {value: string},

      cardExpMm: {value: string},
      cardExpYy: {value: string},
      cardCvc: {value: string}
    }
    const cardName = target.cardholderName.value;
    const cardNumber = target.cardNumber.value;

    const cardExpMm = target.cardExpMm.value;
    const cardExpYy = target.cardExpYy.value;
    const cardCvc = target.cardCvc.value;

    let infoIsGood: boolean = validateName(cardName);
    if(!luhnCheck(cardNumber))
        infoIsGood = false;
    if(!dateCheck(cardExpMm, cardExpYy))
        infoIsGood = false;
    if(!cvcCheck(cardCvc.toString()))
        infoIsGood = false;

    if(infoIsGood) {
      setCardNameErr("");
      props.setCardName(cardName);
      setCardNumErr("");
      props.setCardNum(addSpaces(cardNumber));
      setCardExpErr("");
      props.setCardDate(`${cardExpMm}/${cardExpYy}`);
      setCardCvcErr("");
      props.setCardCvc(cardCvc);

      props.setFormComplete(true);
    }
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <label htmlFor="cardholder-name">Cardholder Name</label>
      <input id="cardholder-name" name="cardholderName" placeholder="e.g. Jane Appleseed" type="text" />
      <span className="err-text name">{cardNameErr}</span>
      <label htmlFor="card-number">Card Number</label>
      <input id="card-number" name="cardNumber" placeholder="e.g. 1234 5678 9123 0000" type="text" />
      <span className="err-text number">{cardNumErr}</span>
      <div id="form-bottom">
        <div className="flex-row">
            <label htmlFor="card-exp-mm">Exp mm/yy</label>
            <label htmlFor="card-cvc">CVC</label>
        </div>
        <div className="flex-row">
            <input id="card-exp-mm" name="cardExpMm" placeholder="MM" type="text" />
            <input id="card-exp-yy" name="cardExpYy" placeholder="YY" type="text" />
            <input id="card-cvc" name="cardCvc" placeholder="e.g. 123" type="text" />
        </div>
        <div className="flex-row">
        <span className="err-text date">{cardExpErr}</span>
        <span className="err-text cvc">{cardCvcErr}</span>
        </div>
      </div>
      <input type="submit" value={"Confirm"} />
    </form>
  )
}

export default Form
