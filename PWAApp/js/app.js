console.log( 'testing' );

// '$()' <-- Jquery statement..
$(document).ready( function () 
{
    var btnLoginTag = $( '.btnLogin' );
    var loginID = 'tester';
    var loginPW = '1234';
    
    var btnAddList = $('.addList_btn');
    var btnSubmitList = $('.submit_btn');
    var listContents = document.querySelectorAll('.list_content');

    var view1 = document.querySelector('.wrapper_login');
    var view2 = document.querySelector('.wrapper_list');
    var view3 = document.querySelector('.wrapper_entry');

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

            view1.classList.add('hide_view');
            view2.classList.remove('hide_view');

            clearList();        
            displayList( getInfo() );

        }
        else
        {
            alert('login failed');
        }
        
    });

    btnAddList.click(function()
    {
        view2.classList.add('hide_view');
        view3.classList.remove('hide_view');        
    });

    btnSubmitList.click(function()
    {
        setInfo( new Date() );

        addList();

        view2.classList.remove('hide_view');
        view3.classList.add('hide_view');
    });

    listContents.forEach(function(item){
        item.addEventListener('click',function()
        {
            console.log('i want to see the detail info');
        });
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


    // -----------------------------

    function getInfo()
    {
        return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
    }

    function setInfo( id )
    {
        var input_firstName = $('#firstname');
        var input_lastName = $('#lastname');
        var input_gender = $('#gender');
        var input_birth = $('#birth');
        var input_country = $('#country');
        var input_phoneNumber = $('#phoneNumber');
        
        var info = {
            id: id.toString(),
            firstname: input_firstName.val(),
            lastname: input_lastName.val(),
            gender: input_gender.val(),
            birth: input_birth.val(),
            country: input_country.val(),
            phoneNumber: input_phoneNumber.val(),
        }

        var list = getInfo();
        list.push(info);
    
        localStorage.setItem('list',JSON.stringify(list))
    }

    function addList()
    {
        var list = getInfo();
        var info = list.pop();
        //console.log(info);
        
        var listContainerTag = $('.list_container');
        listContainerTag.append( generateItemTag( info ) );
        /*
        var listContainer = document.querySelector('.list_container');
        listContainer.innerHTML += ` <div class="single_list_container">
                                        <div class="list_icon">
                                            <i class="fas fa-user-tie"></i>
                                        </div>
                                        <div class="list_content">
                                            <div class="list_date">
                                                ${info.id}
                                            </div>
                                            <div class="list_user">
                                                ${info.firstname} ${info.lastname}
                                            </div>
                                        </div>
                                    </div>`
        */
    }


    function clearList()
    {
        var listContainerTag = $('.list_container');
        listContainerTag.find( '.single_list_container' ).remove();
    };

    function displayList( list )
    {
        var listContainerTag = $('.list_container');

        list.forEach( item => {
            listContainerTag.append( generateItemTag( item ) );
        });
    };

    function generateItemTag( item )
    {
        return $( ` <div class="single_list_container">
        <div class="list_icon">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="list_content">
            <div class="list_date">
                ${item.id}
            </div>
            <div class="list_user">
                ${item.firstname} ${item.lastname}
            </div>
        </div>
    </div>` );

    };

});