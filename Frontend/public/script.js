const input = document.querySelector("#in");
const output = document.querySelector("#out");
const runForm = document.querySelector("#run-form")
const runbtn = document.querySelector("#run-btn")

// CHECK FORM
const persuasive = document.querySelector("#persuasive");
const professional = document.querySelector("#professional");
const academic = document.querySelector("#academic")


runForm.addEventListener("submit", async (event)=>{
    event.preventDefault();

    const data = {
        input: input.value,
        persuasive: persuasive.checked,
        professional: professional.checked,
        academic: academic.checked
    }
    
    try{
        const result = await fetch("/api",{
            method: "POST",
            headers: {
            "Content-Type": "application/json"   
        }, 
        body: JSON.stringify(data)})

        const response =  await result.json();
    
        
        if(response.success) {
            output.value = response.output;
        }else{
            output.value = response.error;
        }
    
    } catch (error) {
                console.log(error)
            }
        
})
