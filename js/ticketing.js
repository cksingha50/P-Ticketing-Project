let selectedButtons = [];
let ticketsLeft = 12;
let totalPrice = 0;
let discountAmount = 0;
let couponApplied = false; 

function changeColor(buttonId, seatName, seatInfo, pricePerSeat) {
  const button = document.getElementById(buttonId);

  if (selectedButtons.find(seat => seat.id === buttonId)) {
    // Deselect the button
    button.style.backgroundColor = '';
    selectedButtons = selectedButtons.filter(seat => seat.id !== buttonId);
    ticketsLeft++;
    totalPrice -= pricePerSeat;
  } else {
    // Select the button
    if (selectedButtons.length < 4 && ticketsLeft > 0) {
      button.style.backgroundColor = '#1DD100';
      selectedButtons.push({ id: buttonId, name: seatName, info: seatInfo, price: pricePerSeat });
      ticketsLeft--;
      totalPrice += pricePerSeat;
    }
  }
  
 
    // Update the tickets left count
    document.getElementById('tickets-left').innerText = ticketsLeft;

    // Update the number of selected seats
    document.getElementById('selected-seats').innerText = selectedButtons.length;

     // Update the total price
     document.getElementById('total-price').innerText = totalPrice.toFixed(2);

     updateGrandTotal();
     displaySelectedSeatsDetails();

     updateNextButton();
  
}

function applyCoupon() {
  var couponCodeInput = document.getElementById('coupon-code');
  var couponCode = couponCodeInput.value;
  
  // Check if the coupon is not applied yet
  if (!couponApplied && couponCode === 'NEW15') {
    // Apply the 15% discount
    discountAmount = totalPrice * 0.15;
    // Update the total price
    document.getElementById('discount-amount').innerText = discountAmount.toFixed(2);
    updateGrandTotal();
    
    // Set the flag to true to indicate that coupon is applied
    couponApplied = true;
    
    // Hide the coupon input and button
    couponCodeInput.style.display = 'none';
    document.querySelector('button[onclick="applyCoupon()"]').style.display = 'none';

    updateNextButton();
  } else if (!couponApplied && couponCode === 'Couple 20') {
    // Apply the 20% discount
    discountAmount = totalPrice * 0.20;
    // Update the total price
    document.getElementById('discount-amount').innerText = discountAmount.toFixed(2);
    updateGrandTotal();
    
    // Set the flag to true to indicate that coupon is applied
    couponApplied = true;
    
    // Hide the coupon input and button
    couponCodeInput.style.display = 'none';
    document.querySelector('button[onclick="applyCoupon()"]').style.display = 'none';

    updateNextButton();
  } else {
    alert('Invalid coupon code or coupon already applied. Please try again.');
  }
}

function updateGrandTotal() {
  const grandTotal = totalPrice - discountAmount;
  // Update the grand total
  document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
}

function displaySelectedSeatsDetails() {
  const selectedSeatsDetailsContainer = document.getElementById('seats-details');
  selectedSeatsDetailsContainer.innerHTML = '';

  selectedButtons.forEach(seat => {
    const seatDetails = document.createElement('p');
    seatDetails.textContent = `${seat.name} - ${seat.info} - $${seat.price}`;
    selectedSeatsDetailsContainer.appendChild(seatDetails);
  });
}


function updateNextButton() {
  const nextButton = document.getElementById('next-button');
  nextButton.disabled = selectedButtons.length === 0;
}

function closeModal() {

  document.getElementById('my_modal_5');
 
  
  // Refresh the page
  location.reload();
}

document.getElementById('scroll-button').addEventListener('click', function() {
  document.getElementById('ticket-booking').scrollIntoView({ behavior: 'smooth' });
});

