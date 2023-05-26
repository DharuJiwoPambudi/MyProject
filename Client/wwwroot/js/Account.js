

//function IsLoggedIn() {
//    const sessionId = localStorage.getItem('sessionId');
//    return !!sessionId; // Return true if session ID exists, false otherwise
//}
function Logout() {
    
    // Clear the session variable
    //sessionStorage.removeItem("user");
    // Redirect to login page
    localStorage.removeItem('sessionId');
    //sessionStorage.removeItem('userToken')
    sessionStorage.removeItem('userToken');
    window.location.href = "/login/index";
    console.log("Token: " + sessionStorage.getItem('userToken'))
    debugger;
}

async function login() {
    //sessionStorage.removeItem('userToken');
    const url = "https://localhost:8001/api/Tokens";
    const data = {
        email: $('#UserName').val(),
        password: $('#Password').val()
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    };
    try {
        const response = await fetch(url, option);
        const json = await response.json();
        sessionStorage.setItem('userToken', json.data)
        console.log("Token : " + sessionStorage.getItem("userToken"))      
        if (response.ok) {
            $.post("/Login/LoginPrimer")
                .done(function () {
                    //sessionStorage.setItem('userToken', json.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Greats...',
                        text: 'You are sign in :D',
                        showConfirmButton: false,
                        timer: 1000,
                        didClose: () => {
                            //$('#TB_Department').DataTable().destroy();
                            //sessionStorage.setItem("Account", JSON.stringify(response));
                            //const sessionId = generateSessionId(); // You can create your own function to generate a unique session ID
                            //localStorage.setItem('sessionId', sessionId);
                            //window.location.href = "/departments/index"; // reload the page
                            location.replace("/departments/index");
                        }
                    })
                })
        } else {
            //throw new Error(json.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                //didClose: () => {
                //    //$('#TB_Department').DataTable().destroy();
                //    table.ajax.reload(); // reload the page
                //}
            })
        }
    } catch (error) {
        //console.error(error);
        //throw error;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong',
            //didClose: () => {
            //    //$('#TB_Department').DataTable().destroy();
            //    table.ajax.reload(); // reload the page
            //}
        })
    }
}