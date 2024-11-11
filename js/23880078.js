var web_pink = "#fa97c2";
var web_blue = "#2fa0d5";
var web_green = "#73c926";

const API = "https://web1-api.vercel.app/api/";
const AUTHENTICATE_API = "https://web1-api.vercel.app/users/";

async function loadData( request_api, type ) {
    const request = await fetch( API + request_api );
    const data = await request.json();

    if ( request_api.includes( "?page=" ) ) {
        var currentPage = request_api.split( '?page=' )[ 1 ];
        data.currentPage = currentPage;
    }

    var source = document.getElementById( type + "-template" ).innerHTML;
    var template = Handlebars.compile( source );
    var context = { data: data };

    document.getElementById( type ).innerHTML = template( context );
}

async function getAuthenticateToken( username, password ) {
    try {
        let response = await fetch( AUTHENTICATE_API + 'authenticate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify( { username, password } )
        } );

        if ( response.ok ) {
            let result = await response.json();
            return result.token;
        } else {
            let error = await response.json();
            throw new Error( error.message || 'Authentication failed' );
        }
    } catch ( err ) {
        console.error( 'Error:', err );
        throw err;
    }
}

async function login( event ) {
    event.preventDefault();

    let username = document.getElementById( "username" ).value;
    let password = document.getElementById( "password" ).value;
    document.getElementById( "errorMessage" ).innerHTML = '';

    try {
        let token = await getAuthenticateToken( username, password );
        if ( token ) {
            localStorage.setItem( "token", token );
            document.getElementsByClassName( 'btn-close' )[ 0 ].click();
            displayControls();
        }
    } catch ( error ) {
        document.getElementById( "errorMessage" ).innerHTML = error;
        displayControls( false );
    }
}

function displayControls( isLogin = true ) {
    let linkLogin = document.getElementsByClassName( 'login' );
    let linkLogout = document.getElementsByClassName( 'logout' );

    let displayLogin = 'none';
    let displayLogout = 'block';
    if ( !isLogin ) {
        displayLogin = 'block';
        displayLogout = 'none';
    }

    for ( let i = 0; i < 2; i++ ) {
        linkLogin[ i ].style.display = displayLogin;
        linkLogout[ i ].style.display = displayLogout;
    }
}

async function checkLogin() {
    let token = localStorage.getItem( 'token' );
    if ( token ) {
        let response = await fetch( AUTHENTICATE_API + "verify", {
            method: "POST",
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        } );
        if ( response.status == 200 ) {
            displayControls();
            return;
        } else {
            displayControls( false );
            return;
        }
    }
    displayControls( false );
    return;
}

function logout() {
    localStorage.removeItem( 'token' );
    displayControls( false );
}
