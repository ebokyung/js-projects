console.log( 'testing' );

// '$()' <-- Jquery statement..
$(document).ready( function () 
{
    var btnLoginTag = $( '.btnLogin' );
    var loginID = 'tester';
    var loginPW = '1234';

    console.log( 'jQuery document ready.. - ' );

    // '$("p")' <-- any p type dom click, hide itself..
    
    displayLastLoginTime();

    testJqueryP();

    btnLoginTag.click( function() 
    {
        // Process login here..
        var input_username_tag = $('.input_username');
        var input_password_tag = $('.input_password');
        
        if(input_username_tag.val() === loginID 
            && input_password_tag.val() === loginPW)
        {
            alert('login success');

            setLastLoginTime( new Date() );

            displayLastLoginTime();
        }
        else
        {
            alert('login failed');
        }
        
    });

    // ----------------------------
    function testJqueryP()
    {
        console.log( 'p how many: ' + $("p").length );
        $("p").click( function() 
        { 
            $(this).hide(); 
        });    
    };

    // ----------------------------

    function setLastLoginTime( lastLoginTime )
    {
        localStorage.setItem( "lastLoginTime", lastLoginTime.toString() );
    };

    function displayLastLoginTime()
    {
        $('.spanLastLoginTime').text( localStorage.getItem('lastLoginTime') );
    };

});