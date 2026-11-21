// GET THE HTML ELEMENTS
var checkIn = document.getElementById("checkIn");
var checkOut = document.getElementById("checkOut");
var roomType = document.getElementById("roomType");
var mealPlan = document.getElementById("mealPlan");

// SET TODAY AS THE EARLIEST CHECK-IN DATE
var today = new Date();
var todayText = today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

checkIn.min = todayText;
checkOut.min = todayText;

// THIS FUNCTION CALCULATES THE PRICE
function calculatePrice() {
    var startDate = new Date(checkIn.value);
    var endDate = new Date(checkOut.value);

    var nights = 0;

    // CHECK THAT BOTH DATES ARE SELECTED
    if (checkIn.value !== "" && checkOut.value !== "") {
        var difference = endDate - startDate;
        nights = difference / (1000 * 60 * 60 * 24);

        if (nights < 0) {
            nights = 0;
        }
    }

    // GET ROOM AND MEAL PRICES
    var roomPrice = Number(roomType.value);
    var mealPrice = Number(mealPlan.value);

    // CALCULATE TOTAL
    var roomTotal = nights * roomPrice;
    var mealTotal = nights * mealPrice;
    var total = roomTotal + mealTotal;

    // SHOW THE RESULT ON THE PAGE
    document.getElementById("nights").innerText = nights;
    document.getElementById("roomCharge").innerText = "₹" + roomTotal;
    document.getElementById("mealCharge").innerText = "₹" + mealTotal;
    document.getElementById("totalAmount").innerText = "₹" + total;
}

// UPDATE CHECK-OUT MINIMUM DATE WHEN CHECK-IN CHANGES
checkIn.addEventListener("change", function() {
    checkOut.min = checkIn.value;

    if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
    }

    calculatePrice();
});

// RECALCULATE WHEN ANY BOOKING OPTION CHANGES
checkOut.addEventListener("change", calculatePrice);
roomType.addEventListener("change", calculatePrice);
mealPlan.addEventListener("change", calculatePrice);

// HANDLE THE BOOKING FORM
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    calculatePrice();

    var name = document.getElementById("parentName").value;
    var roll = document.getElementById("rollNumber").value;
    var idProof = document.getElementById("idProof").value;

    var start = new Date(checkIn.value);
    var end = new Date(checkOut.value);
    var nights = (end - start) / (1000 * 60 * 60 * 24);

    // DO NOT ACCEPT INVALID DATES
    if (checkIn.value === "" || checkOut.value === "" || nights <= 0) {
        alert("Please select a valid check-in and check-out date.");
        return;
    }

    var roomName = roomType.options[roomType.selectedIndex].text;
    var mealName = mealPlan.options[mealPlan.selectedIndex].text;
    var total = document.getElementById("totalAmount").innerText;

    // DISPLAY A CONFIRMATION MESSAGE
    var message = document.getElementById("confirmation");
    message.style.display = "block";

    message.innerHTML =
        "<h3>Booking Submitted Successfully!</h3>" +
        "<p><strong>Guest Name:</strong> " + name + "</p>" +
        "<p><strong>Student Roll Number:</strong> " + roll + "</p>" +
        "<p><strong>ID Proof:</strong> " + idProof + "</p>" +
        "<p><strong>Room:</strong> " + roomName + "</p>" +
        "<p><strong>Check-in:</strong> " + checkIn.value + "</p>" +
        "<p><strong>Check-out:</strong> " + checkOut.value + "</p>" +
        "<p><strong>Meal Plan:</strong> " + mealName + "</p>" +
        "<p><strong>Total Amount:</strong> " + total + "</p>" +
        "<p>This is a frontend demo. No real booking has been saved.</p>";

    message.scrollIntoView({ behavior: "smooth" });
});
