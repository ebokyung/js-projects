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
    me.btnMenu = $('.menu_btn');
    me.btnClose = $('.close_btn');
    me.btnBack = $('.back_btn');

    me.view1 = document.querySelector('.wrapper_login');
    me.view2 = document.querySelector('.wrapper_list');
    me.view3 = document.querySelector('.wrapper_entry');

    me.sidebar = document.querySelector('.sidebar');

    // -------------------------
    // Methods

    me.run = function()
    {
        me.displayLastLoginTime();

        //me.testJqueryP();

        me.setupEventsHandle();


        // Start background service..

        

        //BKSerivce.addRunFunc( function() {
        //     me.updateTime_Display();
        //} );

        
        BKSerivce.addRunFunc( me.updateTime_Display );

        BKSerivce.start();

    };


    me.updateTime_Display = function()
    {
        var newTime = new Date();
        //console.log( newTime.toString() );

        var timeStr = newTime.toTimeString().substring( 0, 8);

        $( '.topNav_time' ).text( timeStr );
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
                me.displayList( me.getData_ItemList() );
    
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
            var item = me.createFormItem( new Date() );

            me.setData_Item( item );
            me.addToDisplayList( item );
    
            me.view2.classList.remove('hide_view');
            me.view3.classList.add('hide_view');
        });

        me.btnMenu.click(function()
        {
            me.sidebar.classList.add('show-sidebar');
        });

        me.btnClose.click(function()
        {
            me.sidebar.classList.remove('show-sidebar');
        });

        me.btnBack.click(function()
        {
            me.view3.classList.add('hide_view');
            me.view2.classList.remove('hide_view');
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

    me.getData_ItemList = function()
    {
        return localStorage.getItem('list') ? JSON.parse( localStorage.getItem('list') ) : [];
    };

    me.setData_ItemList = function( list )
    {
        localStorage.setItem( 'list', JSON.stringify( list ) );
    };

    me.setData_Item = function( item )
    {
        var list = me.getData_ItemList();
        list.push( item );
        me.setData_ItemList( list );
    };

    //  get item by index of list 
    me.getData_Item = function( i )
    {
        var list = me.getData_ItemList();
        return list[i];
    };

    // -----------------

    me.createFormItem = function( id )
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

        return info;
    };


    me.addToDisplayList = function( item )
    {        
        var listContainerTag = $('.list_container');
        listContainerTag.append( me.generateItemTag( item ) );
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
        var itemTag = $( ` <div class="single_list_container" item-id="${item.id}" >
            <div class="list_icon">
                <img src="images/user-tie.svg" alt=""/>
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


        itemTag.click( function( e ) {

            console.log( item );
            alert( JSON.stringify( item ) );
        });

        return itemTag;
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
