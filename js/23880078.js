var web_pink = "#fa97c2";
var web_blue = "#2fa0d5";
var web_green = "#73c926";

const API = "https://web1-api.vercel.app/api/";

async function loadData( request_api, type ) {
    const request = await fetch( API + request_api );
    const data = await request.json();

    var source = document.getElementById( type + "-template" ).innerHTML;
    var template = Handlebars.compile( source );
    var context = { data: data };
    console.log( template( context ) );

    document.getElementById( type ).innerHTML = template( context );
}

