# 🛒 Dynamic Shopping Cart 

## 📌 Overview
This project implements a dynamic shopping cart using vanilla JavaScript to practice DOM manipulation, event handling, and dynamic UI updates.

Users can:

- Add products with name, price, and quantity
- View items dynamically added to the cart
- Update quantities directly from the cart
- Remove items partially or completely
- See the total price update as actions are performed

The main goal of the lab was to strengthen DOM manipulation skills.

## 🎨 Styling & UI Choices

Although the lab didn’t require advanced styling, I decided to use:

- Tailwind CSS
- DaisyUI (for the modal)

This was my first time using Tailwind.
I usually work with Bootstrap, where I’m much more comfortable and faster because I already know the class equivalents.

With Tailwind:

- I had to battle a bit with finding equivalents
- I relied heavily on the documentation
- Using Tailwind via CLI instead of CDN added extra setup
- DaisyUI made the modal easier, but still required learning new patterns

Even though it took longer than Bootstrap would have, it was a good first step toward transitioning to Tailwind.

## 🧠 DOM Manipulation — What I Practiced
This lab was heavily focused on DOM manipulation, and I practiced several important concepts:

### ✔ Dynamic element creation
Each cart item is built entirely through JavaScript:

```html
<li>

<span>

<input> <!-- for quantity updates -->

<button> <!-- “Add” and “Remove” buttons -->
```

### ✔ Event delegation
Before this lab, I wasn’t fully confident in how to think about delegation.
Copilot helped me understand the mental model:
- Does the element exist at page load?
- If not, attach the listener to a parent that does exist.
- Filter using event.target.
- This made handling dynamic buttons and inputs much easier.

### ✔ Input sanitization
I used regular expressions to ensure:
- Only numbers in price fields
- Only integers in quantity fields
- No invalid characters

### ✔ Total price updates
Thanks to previous experience in other languages, the logic wasn’t difficult.
I just had to adapt to JavaScript’s quirks with strings and numbers.

### ✔ Update and remove logic
The most challenging part was extracting data from the <span> using split(), but I managed to make it work reliably.

## 🧩 What I Would Improve Next Time
If I revisit this project later, I would:
- Create a reusable template for cart items instead of building each element manually
- Add real‑time updates (no buttons needed)
- Improve the modal styling with DaisyUI animations
- But for this lab, the current implementation is more than enough.

## 📝 Reflection (Lab Requirements)
1. How did you dynamically create and append new elements?
I used document.createElement() to build each part of the cart item and appendChild() to assemble the structure.
Event delegation allowed me to handle interactions on elements created after page load.

2. How did you ensure accurate total price updates?
I used a dedicated function (updateTotalPrice) that adjusts the total whenever items are added, updated, or removed.
I also rounded values to two decimals to avoid floating‑point issues.

3. How did you handle invalid input?
I sanitized inputs using regular expressions and prevented adding products with empty names or invalid prices.
I also checked for duplicate product names before adding new items.

4. What challenges did you face when implementing remove/update?
Main challenges:
- Extracting values from formatted text
- Ensuring totals updated correctly when quantities changed
- Managing dynamic inputs inside the cart
- Event delegation was essential to solving these issues.

## 🏁 Final Thoughts
This lab took me longer than expected (two days), but it was worth it.
I learned:
- Tailwind basics
- DaisyUI modal usage
- Event delegation
- Practiced Regex sanitization
- More advanced DOM manipulation patterns