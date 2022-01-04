console.log( 'testing' );

// '$()' <-- Jquery statement..
$(document).ready( function () 
{
    console.log( 'jQuery document ready.. - ' );

    // '$("p")' <-- any p type dom click, hide itself..
    $("p").click(function () 
    {
        console.log( 'p clicked' );
        // '$(this)' <-- the p that has been clicked
        $(this).hide();
    });
});