// -------------------------------------------
// -- Action Class/Methods
// class Action( -- )
function App()
{
    var me = this;

    // -------------------------
    // Variables

    me.var1 = '';

    me.btnLoginTag = $( '.btnLogin' );
    me.loginID = 'tester';
    me.loginPW = '1234';
    
    me.btnAddList = $('.addList_btn');
    me.btnSubmitList = $('.submit_btn');
    me.listContents = document.querySelectorAll('.list_content');

    me.view1 = document.querySelector('.wrapper_login');
    me.view2 = document.querySelector('.wrapper_list');
    me.view3 = document.querySelector('.wrapper_entry');


    // -------------------------
    // Methods

    me.run = function()
    {
        me.displayLastLoginTime();

        me.testJqueryP();

        me.setupEventsHandle();

        me.listItemClicksTry();
    };


    // ---------------------
    // Events handler

    me.setupEventsHandle = function()
    {
        me.btnLoginTag.click( function() 
        {
            // Process login here..
            var input_username_tag = $('.input_username');
            var input_password_tag = $('.input_password');
            
            if( input_username_tag.val() === me.loginID 
                && input_password_tag.val() === me.loginPW)
            {
                alert('login success');
                
                //me.loginSuccessRun();

                me.setLastLoginTime( new Date() );
    
                me.displayLastLoginTime();
    
                me.view1.classList.add('hide_view');
                me.view2.classList.remove('hide_view');
    
                me.clearList();        
                me.displayList( me.getInfo() );
    
            }
            else
            {
                alert('login failed');
            }
            
        });
    

        me.btnAddList.click(function()
        {
            me.view2.classList.add('hide_view');
            me.view3.classList.remove('hide_view');        
        });
    

        me.btnSubmitList.click(function()
        {
            me.setInfo( new Date() );
    
            me.addList();
    
            me.view2.classList.remove('hide_view');
            me.view3.classList.add('hide_view');
        });
    
    };


    // ---------------------
    // Other Class Methods

    me.listItemClicksTry = function()
    {
        var listItemTags = $( '.list_content').find( 'div.single_list_container' );

        listItemTags.each( function(itemTag) 
        {
            itemTag.click( function( e )
            {
                console.log('i want to see the detail info');
                alert( 'item info - div need to have unique attribute id' );
            });
        });        
    };



    // ----------------------------

    me.setLastLoginTime = function( lastLoginTime )
    {
        localStorage.setItem( "lastLoginTime", lastLoginTime.toString() );
    };

    me.displayLastLoginTime = function()
    {
        $('.spanLastLoginTime').text( localStorage.getItem('lastLoginTime') );
    };


    // -----------------------------

    me.getInfo = function()
    {
        return localStorage.getItem('list') ? JSON.parse( localStorage.getItem('list') ) : [];
    }

    me.setInfo = function( id )
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

        var list = me.getInfo();
        list.push( info );
    
        localStorage.setItem( 'list', JSON.stringify( list ) );
    };

    me.addList = function()
    {
        var list = me.getInfo();
        var info = list.pop();
        //console.log(info);
        
        var listContainerTag = $('.list_container');
        listContainerTag.append( me.generateItemTag( info ) );
    };


    me.clearList = function()
    {
        var listContainerTag = $('.list_container');
        listContainerTag.find( '.single_list_container' ).remove();
    };

    me.displayList = function( list )
    {
        var listContainerTag = $('.list_container');

        list.forEach( item => {
            listContainerTag.append( me.generateItemTag( item ) );
        });
    };

    me.generateItemTag = function( item )
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

    // ----------------------------
    me.testJqueryP = function()
    {
        console.log( 'p how many: ' + $("p").length );
        $("p").click( function() 
        { 
            $(this).hide(); 
        });    
    };

};
