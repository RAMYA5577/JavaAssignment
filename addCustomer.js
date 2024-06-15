const token = localStorage.getItem('token');
if(!token){
    window.location.href = "login.html";
}
const submit = document.getElementById('submit');





submit.addEventListener('click', async (event) =>{
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const state = document.getElementById('state').value;

    const customer = {
        firstName : firstName,
        lastName : lastName,
        street : street,
        address : address,
        city : city,
        state : state,
        email : email,
        phone : phone
    }
    const url = "http://localhost:8080/customer/addCustomer"
    try{
    const response = await fetch(url,{
        method:'POST',
        
        headers: {
            'Content-Type': 'application/json',
        },
        body :JSON.stringify({
            firstName : firstName,
            lastName : lastName,
            street : street,
            address : address,
            city : city,
            state : state,
            email : email,
            phone : phone
        }),
        credentials:"include"
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response);
    }
    // console.log("Hello", response);
    let p = document.createElement('p');
    let form = document.getElementById('form');
    p.innerText = `Customer with name ${firstName} ${lastName} added Successfully`;
    form.appendChild(p);
    // const data = await response.json();
    // console.log("Hello",data);
   
}
catch(e){
    console.log("Error with data",e);
}
});