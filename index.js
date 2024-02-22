
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gets user inputted credentials from form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var conf_password = document.getElementById('confirm_password').value;
    var fname = document.getElementById('fname').value;
    
    // Checks if username feild is blank
    if(username === "")
    {
        document.getElementById("output").innerHTML = "Input Username";
    }
    
    else if(fname === "")
    {
        document.getElementById("output").innerHTML = "Input Your Name";
    }

    //Check if password feilds are blank
    else if(password === "" || conf_password === "")
    {
        document.getElementById("output").innerHTML = "Input Password(s)";
        //Checks of both passwords match
        if(password != conf_password)
            error = "Passwords Don't Match";
            document.getElementById("output").innerHTML = error;
    }
    
    //If checks are cleared request is sent to add account to database
    else{
        fetch('https://stock-tracker-l64w.onrender.com/signup_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password, fname:fname })
        })
        .then(response => response.json())
        .then(data => {
            //If the username already exists then user is promted to choose another one.
            if(data.message === 'exists')
                document.getElementById("output").innerHTML = "Username Exists";
            else if(data.message === 'success')
                //If account creation is successful, user is redirected to login page.
                window.location.href="https://stock-tracker-login.expense-tracker-demo.site"
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display elements from the server
    cookieCheck(); 

});

function cookieCheck()
{
    cookie_name = "stock_tracker_cookie_container"
    if(document.cookie.split(';').some((item) => item.trim().startsWith(`${cookie_name}=`)))
    {
        console.log("true")
        window.location.href = "https://stock-tracker-dashboard.expense-tracker-demo.site";
    }
}