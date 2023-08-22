import "../css/Form.css"

function Form() {
  return (
    <form id="form">
      <label htmlFor="cardholder-name">Cardholder Name</label>
      <input id="cardholder-name" placeholder="e.g. Jane Appleseed" type="text" />
      <label htmlFor="card-number">Card Number</label>
      <input id="card-number" placeholder="e.g. 1234 5678 9123 0000" type="text" />
      <div id="form-bottom">
        <div className="flex-row">
            <label htmlFor="card-exp-mm">Exp mm/yy</label>
            <label htmlFor="card-cvc">CVC</label>
        </div>
        <div className="flex-row">
            <input id="card-exp-mm" placeholder="MM" type="text" />
            <input id="card-exp-yy" placeholder="YY" type="text" />
            <input id="card-cvc" placeholder="e.g. 123" type="text" />
        </div>
      </div>
      <input type="submit" value={"Confirm"} />
    </form>
  )
}

export default Form
