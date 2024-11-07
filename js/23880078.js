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

(
    async function () {
        await loadData( "products?page=1", "products" );
        await loadData( "news?page=1", "news" );

        document.querySelectorAll( '#products .card-body' ).forEach( ( card, idx ) => {
            const title = card.querySelector( 'h5.card-title' );
            const img = card.querySelector( 'img.card-img-top' );

            idx = idx + 1;

            card.addEventListener( 'mouseover', () => {
                title.style.color = web_blue;
                img.src = "images/icon-" + idx + "-active.png";
            } );

            card.addEventListener( 'mouseout', () => {
                title.style.color = "black";
                img.src = "images/icon-" + idx + ".png";
            } );
        } );

    }
)();
