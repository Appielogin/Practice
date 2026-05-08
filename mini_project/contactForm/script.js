const form = document.getElementById("contactForm");
const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameError");
const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameError");
const feedback = document.getElementById("feedback");
const feedbackError = document.getElementById("feedbackError");
const genderRadios = document.querySelectorAll('input[name="gender"]');
const genderError = document.getElementById("genderError");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");
const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");
const requiredFeilds = Array.from(document.querySelectorAll("[required]"));


//touched state
let touched = {
    firstName: false,
    lastName: false,
    feedback: false
}

//reusable function
    
    //for input
    function validateRequired(input){
        let isValid = true;
        
        //text, email, password, textarea....
        if (input.type === "text" ||
            input.type === "email" ||
            input.type === "password") {
                if (input.value.trim() === ""){
                    isValid = false;
                }
            }

        //checkbox
        else if (input.type === "checkbox"){
            if (!input.checked){
                isValid = false;
            }
        }

        //radio(group validation)
        else if (input.type === "radio"){
            const group = document.getElementsByName(input.name);
            const isChecked = Array.from(group).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
            }
        }

        //select
        else if (input.type === "select-one"){
            if (input.value === "") {
                isValid = false;
            }
        }


        //apply classes
        if (!isValid){
            input.classList.add("inValid");
            input.classList.remove("valid");
            
        } else{
            input.classList.remove("inValid");
            input.classList.add("valid");
        }

        return isValid;

    }

    //for special case(feedback)
    function validateFeedback() {
        if (feedback.value.trim().length < 10){
            feedbackError.textContent = "Feedback must be atleast 10 characters.";
            feedback.classList.add("inValid");
            feedback.classList.remove("valid");
            return false;
        }else{
            feedbackError.textContent = "";
            feedback.classList.remove("inValid");
            feedback.classList.add("valid");
            return true;
        }
    }

    //for special case(gender)
    function validateGender(){
        let selected = false;

        genderRadios.forEach(function(radio){
            if (radio.checked){
                selected = true;
            }
        });

        if (!selected) {
            genderError.textContent = "Please select your gender.";
            return false;
        } else {
            genderError.textContent = "";
            return true;
        }
    }



//first name real time validation
    firstName.addEventListener("blur", function(){ 
        touched.firstName = true;
       // firstNameError.textContent = "First Name is Required.";
        validateRequired(firstName);
       // checkFormValidaty();
    });

//last name real time validation
    lastName.addEventListener("blur", function(){
        touched.lastName = true;
      //  lastNameError.textContent = "Last Name is Required.";
        validateRequired(lastName);
       // checkFormValidaty();
    });

//gender real time validation
    genderRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            validateGender();
          //  checkFormValidaty();
        });
    });

//feedback real time validation
    feedback.addEventListener("blur", function(){
        touched.feedback = true;
        validateFeedback();
       // checkFormValidaty();
    });

//submit validation
    form.addEventListener("submit", function(event){
        console.log("Submit event triggered.")
        event.preventDefault();  //prevent actual reload
        const isFeildsValid = requiredFeilds.every(field => validateRequired(field));

        //Gender
        const isGenderValid = validateGender();

        //Feedback
        const isFeedbackValid = validateFeedback();
        
        //after submittion
        if (isFeildsValid && isGenderValid && isFeedbackValid){
            //event.preventDefault();
            
            form.reset();

            //remove borders
            form.querySelectorAll(".valid").forEach(el => el.classList.remove("valid"));
            form.querySelectorAll(".inValid").forEach(el => el.classList.remove("InValid"));
            
            //clear errors
            form.querySelectorAll(".error").forEach(error => error.textContent = "");

            //modal success message
            modal.classList.add("show");

            closeModal.addEventListener("click", function(){
                modal.classList.remove("show");
            });

           } else {
            form.classList.add("shake");

            setTimeout(() => {
                form.classList.remove("shake");
            }, 300);
            return;
           }
            
});


//modal disappear when click outside
modal.addEventListener("click", function(e){
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

//modal disappear when press Escape [esc] key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        modal.classList.remove("show");
    }
});

