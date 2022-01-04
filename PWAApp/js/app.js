console.log( 'testing' );

// '$()' <-- Jquery statement..
$(document).ready( function () 
{
    var btnLoginTag = $( '.btnLogin' );

    console.log( 'jQuery document ready.. - ' );

    // '$("p")' <-- any p type dom click, hide itself..

    console.log( 'p how many: ' + $("p").length );

    $("p").click(function () 
    {
        console.log( 'p clicked' );
        // '$(this)' <-- the p that has been clicked
        $(this).hide();
    });

    btnLoginTag.click( function() {
        alert( 'login button clicked' );
        // Process login here..
    });
});