document.addEventListener("DOMContentLoaded", () => {
    const url = "https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("Login form not found");
        return;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        // console.log("Form submitted");

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = {
            login_id: username,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("HTTP error", response.status, response.statusText, errorText);
                return;
            }

            const data = await response.json();
            // console.log(data);

            if (data && data.access_token) {
                localStorage.setItem("token", data.access_token);
                window.location.href = "home.html";
            } else {
                console.log('App Error', data.error);
            }
        } catch (e) {
            console.log("Error ", e);
        }
    });
});



// const url = "https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
// const login = document.getElementById("login");

// async function getData(){
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
  
//   const user = {
//     login_id: username,
//     password: password,
//   };

//   const request = new Request(url, {
//     method: 'POST',
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });

//   try {
//     const response = await fetch(request);
//     console.log(response);
//     console.log("hi");
//     const data = await response.json();
    
//     console.log(data);
//     if (data && data.access_token) {
//       window.location.href = "home.html";
//       localStorage.setItem("authToken", data.access_token);
//     } else {
//       console.log('App Error', data.error);
//     }
//   } catch (e) {
//     console.log("Error ", e);
//   }
// }

// login.addEventListener('click', getData);


 

// // document.addEventListener('DOMContentLoaded', async function() {
// //     // Add event listener to handle form submission
// //     document.getElementById('loginForm').addEventListener('submit', async function(event) {
// //         event.preventDefault(); // Prevent the default form submission behavior

// //         // Authenticate the user and handle the response
// //         authenticateUser().then((token) => {
// //             if (token) {
// //                 // Store the token in localStorage
// //                 localStorage.setItem('authToken', token);
// //                 // Redirect to the home page
// //                 window.location.href = 'home.html';
// //             } else {
// //                 alert('Invalid credentials. Please try again.');
// //             }
// //         }).catch((error) => {
// //             console.error('Error during authentication:', error);
// //             alert('An error occurred during authentication. Please try again.');
// //         });
// //     });
// // });

// // // Function to authenticate the user by making a POST request to the API
// // async function  authenticateUser() {
// //     const username = document.getElementById('username').value;
// //     const password = document.getElementById('password').value;
// //     console.log(username);
// //     console.log(password);

// //     const loginData = {
// //         "login_id": username,
// //         "password": password
// //     };

// //     // Make a POST request to the authentication API
// //     return await fetch('https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(loginData) // Send the login data as JSON
// //     })
// //     .then(async response => {
// //         console.log('API Response:', response);
// //         if (!response.ok) {
// //             // Log the status if the response is not OK (e.g., 4xx or 5xx HTTP status)
// //             console.error('Error response from API:', response.status, response.statusText);
// //             return await response.json().then(errorData => {
// //                 console.error('Error Data:', errorData);
// //                 return null;
// //             });
// //         }
// //         return response.json();
// //     })
// //     .then(async data => {
// //         console.log('Response Data:', data);
// //         // Check if the response contains a token
// //         if (data && data.token) {
// //             return data.token; // Return the token
// //         } else {
// //             // Log the data if the token is not found
// //             console.error('No token in response:', data);
// //             return null; // Return null if no token is found
// //         }
// //     })
// //     .catch(error => {
// //         console.error('Error:', error);
// //         return null; // Return null in case of an error
// //     });
// // }
