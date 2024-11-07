var web_pink = "#fa97c2";
var web_blue = "#2fa0d5";
var web_green = "#73c926";

document.querySelectorAll( '#products .card-body' ).forEach( ( card, idx ) => {
    const title = card.querySelector( 'h5.card-title' );
    const img = card.querySelector( 'img.card-img-top' );

    idx = idx + 1;
    img.src = "images/icon-" + idx + ".png";

    card.addEventListener( 'mouseover', () => {
        title.style.color = web_blue;
        img.src = "images/icon-" + idx + "-active.png";
    } );

    card.addEventListener( 'mouseout', () => {
        title.style.color = "black";
        img.src = "images/icon-" + idx + ".png";
    } );
} );