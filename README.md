# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw) using React, TypeScript, Vite and SCSS. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![MainScreenshot](./public/Screenshots/MainScreenshot.JPG)
![ErrorScreenshot](./public/Screenshots/ErrorScreenshot.JPG)
![SuccessScreenshot](./public/Screenshots/SuccessScreenshot.JPG)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- [SCSS](https://sass-lang.com/) - CSS extension
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

### What I learned

This was my very first time using TypeScript. Largely, it didn't feel too different from plain JavaScript, but there were areas where it's error messages made me be more thoughtful and deliberate in my code. There were also areas where the enforcement of types caused me to type more verbose code, but also helped me see and understand more moving parts under the hood. When implementing this form, having to type the values of the input field caused me to read more into React and learn a little bit about events. React is quite the rabbithole to go down and Typescript has forced me to pull some threads I otherwise would not have.

```js
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

    // More code irrelevant to this example
  }
```

With help from an online article (linked below in [Useful resources](#useful-resources)), I implemented the best version of the Luhn Algorithm I've ever done.

```js
const luhnCheck = (cardNum: string): boolean => {
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
```

This was my first time really getting familiar with `array.reduce()` which is a great tool to put on my belt going forwards. The algorithm did need some work to fit my needs. The second ternary operator initially did not return the correct value. The original code was:

```js
 let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),
    0
  );
```

Which doesn't make a whole lot of sense. If the doubled value is greater than 9, you're supposed to add the digits together and return it, not subtract 9. This may have been a variation of the algorithm for a different purpose but regardless it was very easy to fix for my own needs:

```js
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
```

If anyone knows a better way to do this, I'd love to know!

I also had the realization that per-component CSS files was the way to go in React. For the longest time, I've been a massive fan of React + Tailwind. It's certainly a nice way to work as it forces the coupling of components with their styles, but just taking a little care to handle that coupling yourself without bloating your markup with hundreds of utility classes keeps things very readable. My last projects used SCSS as well, but read from one massive document imported into the App component. Things got unwieldy and I was unsure if it was the right thing for me. I'm glad I stuck with it and now I believe I'll keep using SCSS for all of my projects for some time before picking up Tailwind again.

### Continued development

I would like to continue to iron out the CSS until this feels accurate to the Figma design. Right now it doesn't look exact at any screen size. My CSS would likely require some refactoring so that I don't need to extensively change values per size, a lot of value are hard coded when it would be better if they weren't. Also some kind of animation for the "Thank you!" menu would make the app feel a little more lively.

### Useful resources

- [30 Seconds of Code Luhn Check](https://www.30secondsofcode.org/js/s/luhn-check/) - This implementation of the Luhn algorithm is much more concise and effecient than ones I've come up with on my own, however it didn't work as is and needed some tweaks. The ternary expression to check for and sum up 2 digit numbers does not work as they've implemented it.

## Author

- Website - [Jeremy Helsel](https://jeremyhelsel.com/)
- Frontend Mentor - [@JIH7](https://www.frontendmentor.io/profile/JIH7)
