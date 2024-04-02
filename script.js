const dateFrom = document.getElementById("dateForm");
const yearField = document.getElementById("yearField");
const yearErr = document.getElementById("yearErr");
const monthField = document.getElementById("monthField");
const monthErr = document.getElementById("monthErr");
const dayField = document.getElementById("dayField");
const dayErr = document.getElementById("dayErr");

// Date Validation
function checkDate(day, month, year) {
  /**
   * String Dictunary.
   * err = {
   *  day: "Error message"
   *  month: "..."
   *  year: "..."
   * }
   */
  var err = {};

  // Date Initalization and checking If the birthday date is valid.
  const today = new Date();
  var birthDay = new Date(`${year}/${month}/${day}`)
  var isValid = !isNaN(birthDay); //Cheking if the initialized date is in correct format.

  /**
   * In JS if we put "31 April" wihich is not a vaild date in "new Date()" fn then the date we will get is "1st of May".
   * Learn More about it https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
   * We are checking if the input date is same as the new "birthDate" variabl's date value to determine valid date.
   */
  if (isValid && day == birthDay.getDay()) { //Here checking if the newly initalized birthdate is same as the input.
    if (birthDay > today) {
      err.year = "Date Must be in Past";
    }
  } else {
    //Validating individaula input.
    //Year
    if (year == "") {
      err.year = "Can not be empty!";
    } else if (birthDay > today) {
      err.year = "Date Must be in Past";
    } else if (year < 1) {
      err.year = "Negative not Allowed!";
    }

    //Month
    if (month == "") {
      err.month = "Can not be Empty!";
    } else if (month < 1 || month > 12) {
      err.month = "Enter a Valid Month!";
    }
   
    //Day
    if (day == "") {
      err.day = "Can not be empty!";
    } else if ((day < 1 || day > 31) || !isValid || day != birthDay.getDate()) {
      err.day = "Enter a valid Date!";
    }
  }
  return err;
}

//Calculate age and set Output on the result field.
function setResult(day, month, year) {
  // Initalizing Dates
  const today = new Date().toLocaleDateString();
  const initalDate = new Date(`${year}/${month}/${day}`);
  const diff = new Date(today) - initalDate;
  
  // Days, Months, Years conversion.
  const totalDays = Math.round(diff / (1000 * 3600 * 24));
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  const days = totalDays - years * 365 - months * 30;
 
  // Setting Result Field Values.
  dayField.innerHTML = days.toString()
  monthField.innerHTML = months.toString() 
  yearField.innerHTML = years.toString()
}

// Resets the reslut field to the default state.
function resetResult(){
  dayField.innerHTML = "- -"
  monthField.innerHTML = "- -" 
  yearField.innerHTML = "- -"
}

/**
 * Sets error messages under input fields.
 * @param {String Dictionary} err - Error type with their message.
 * err = {
    "key": "value"
  }
 * @returns {void}
 */
function setError(err) {
  resetResult()
  if (err.day) {
    dayErr.classList.add("displayErr");
    dayField.classList.add("displayErr");
    dayErr.innerHTML = err.day;
  } else {
    dayErr.classList.remove("displayErr");
    dayField.classList.remove("displayErr");
  }

  if (err.month) {
    monthErr.classList.add("displayErr");
    monthField.classList.add("displayErr");
    monthErr.innerHTML = err.month;
  } else {
    monthErr.classList.remove("displayErr");
    monthField.classList.remove("displayErr");
  }
  
  if (err.year) {
    yearErr.classList.add("displayErr");
    yearField.classList.add("displayErr");
    yearErr.innerHTML = err.year;
  } else {
    yearErr.classList.remove("displayErr");
    yearField.classList.remove("displayErr");
  }
}

// User Input Submit Handler.
dateFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  // Getting User Input.
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  // Input Validation.
  var err = checkDate(day, month, year);
  
  // check is "err" object have any error. IE. keys. 
  var validDate = Object.keys(err).length == 0;
 
  // Sets Output based on error.
  if (validDate) {
    setError(err)
    setResult(day, month, year);
  } else {
    setError(err);
  }
});
