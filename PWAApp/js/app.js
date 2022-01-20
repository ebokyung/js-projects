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
    
    me.btnAddItem = $('.addItem_btn');
    me.btnSubmit = $('.submit_btn');
    me.btnMenu = $('.menu_btn');
    me.btnClose = $('.close_btn');
    me.btnBack = $('.back_btn');

    me.log = document.querySelector('.wrapper_login');
    me.main = document.querySelector('.wrapper_list');
    me.entry = document.querySelector('.wrapper_entry');
    me.about = document.querySelector('.wrapper_about');
    me.setting = document.querySelector('.wrapper_setting');
    me.detail = document.querySelector('.wrapper_detail');
    me.detailPage = $( '.wrapper_detail' );

    me.sidebar = document.querySelector('.sidebar');
    me.links = document.querySelectorAll('.sidebar_link');

    // -------------------------
    // Methods

    me.run = function()
    {
        me.displayLastLoginTime();

        //me.testJqueryP();

        me.setupEventsHandle();


        // Start background service..
        
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

        var input_usernameTag = $( '.input_username' );

        input_usernameTag.focus( function() 
        {
            console.log( 'input_usernameTag focused' );
            SWManager.checkSWUpdate();
        });
    
    
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

                DataManager.setLastLoginTime( new Date() );
    
                me.displayLastLoginTime();
    
                me.log.classList.add('hide_view');
                me.main.classList.remove('hide_view');
    
                me.clearList();        
                //me.displayList( DataManager.getData_ItemList() );
    

                // fetch( 'http://localhost:4321/http://localhost:5000/api/getAllItems' ).then( res => {
                //     return res.json();
                // }).then( data => {
                //     console.log(data)
                //     console.log(typeof data)
                //     //me.displayList( data ) 
                // });

                fetch( `http://localhost:4321/http://localhost:5000/api/mdb` ,{
                    method: 'POST',
                    body: JSON.stringify( {
                        mongoDB:{
                            find:{}
                        }
                    } ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( res => {
                        return res.json();
                    }).then( data => {
                        // console.log(data)
                        // console.log(typeof data.)
                        me.displayList( data.itemList ) 
                    });

            }
            else
            {
                alert('login failed');
            }
            
            input_username_tag.val('');
            input_password_tag.val('');

        });
    

        me.btnAddItem.click(function()
        {
            me.main.classList.add('hide_view');
            me.entry.classList.remove('hide_view');        
        });
    

        me.btnSubmit.click(function()
        {
            var item = me.createFormItem();
            
            //DataManager.setData_Item( item );
            //me.addToDisplayList( item );
            //fetch( 'http://localhost:4321/http://localhost:5000/api/addItem',{
            //     method: 'POST',
            //     body: JSON.stringify( item ),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // } ).then( res => {
            //         return res.json();
            //     }).then( data => {
            //         me.addToDisplayList( data ) 
            //     });
            fetch( 'http://localhost:4321/http://localhost:5000/api/mdb',{
                method: 'POST',
                body: JSON.stringify( {
                    mongoDB:{
                        insert: item
                    }
                } ),
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( res => {
                    return res.json();
                }).then( data => {
                    //console.log( data.result.ops[0] )
                    me.addToDisplayList( data.result.ops[0] ) 
                });
            
            me.main.classList.remove('hide_view');
            me.entry.classList.add('hide_view');
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
            me.entry.classList.add('hide_view');
            me.about.classList.add('hide_view');
            me.setting.classList.add('hide_view');
            me.detail.classList.add('hide_view'); //??

            me.main.classList.remove('hide_view');
        });


    };

    // ----------------------------

    me.displayLastLoginTime = function()
    {
        $('.spanLastLoginTime').text( DataManager.getLastLoginTime() );
    };
   
    me.createFormItem = function()
    {
        var input_firstName = $('#firstname');
        var input_lastName = $('#lastname');
        var input_gender = $('#gender');
        var input_birth = $('#birth');
        var input_country = $('#country');
        var input_phoneNumber = $('#phoneNumber');
        
        var dateNow = new Date();
        var idStr = dateNow.getTime().toString();

        var info = {
            id: idStr,
            date: dateNow.toString(),
            firstname: input_firstName.val(),
            lastname: input_lastName.val(),
            gender: input_gender.val(),
            birth: input_birth.val(),
            country: input_country.val(),
            phoneNumber: input_phoneNumber.val(),
        }

        input_firstName.val('');
        input_lastName.val('');
        input_gender.val('');
        input_birth.val('');
        input_country.val('');
        input_phoneNumber.val('');

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
                    ${item.date}
                </div>
                <div class="list_user">
                    ${item.firstname} ${item.lastname}
                </div>
            </div>
        </div>` );


        itemTag.click( function( e ) {

            //console.log( item );
            //alert( JSON.stringify( item ) );

            // View Switch..
            me.detail.classList.remove('hide_view');
            me.main.classList.add('hide_view');
            // me.switchView( me.detail );  $( 'mainLvlView' ).hide();  .remove( '' )  //  inputView.add( -- );

            var clickedItemId = $( this ).attr( 'item-id' );
            console.log( 'itemId: ' + clickedItemId );

            //var clickedItem = DataManager.getData_Item( clickedItemId );
            //fetch( `http://localhost:4321/http://localhost:5000/api/getItem/${clickedItemId}` ).then( res => {
            //     return res.json();
            // }).then( data => {
            //     var itemDetailContentTag = me.detailPage.find( 'div.detail_container' );

            //     me.resetItemDetailDisplay( itemDetailContentTag );
            //     me.setItemDetailDisplay( data, itemDetailContentTag );
            // } );
            fetch( `http://localhost:4321/http://localhost:5000/api/mdb` ,{
                method: 'POST',
                body: JSON.stringify( {
                    mongoDB:{
                        find:{
                            id:clickedItemId
                        }
                    }
                } ),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then( res => {
                    return res.json();
                }).then( data => {
                    //console.log(data.itemList)
                    var itemDetailContentTag = me.detailPage.find( 'div.detail_container' );

                    me.resetItemDetailDisplay( itemDetailContentTag );
                    me.setItemDetailDisplay( data.itemList[0], itemDetailContentTag );
                } );
        });

        return itemTag;
    };

    me.resetItemDetailDisplay = function( detailContentTag )
    {
        detailContentTag.html( '' );        
    };

    me.setItemDetailDisplay = function( item, detailContentTag )
    {
        detailContentTag.append( JSON.stringify( item ) )
        //alert( JSON.stringify( item ) );
        detailContentTag.html( `<div class="detail_content_top" style="margin-top:5px;">
                                    <div class="list_icon">
                                        <img src="images/logo.svg" style="width:40px; height:40px;">
                                    </div>
                                    <div class="divContent">
                                        <div>
                                            ${item.date}
                                        </div>
                                        <div>
                                            ${item.firstname} ${item.lastname}
                                        </div>
                                    </div>
                                </div>
                                <div class="detail_content" style="margin-top: 20px;">
                                    <label >First Name</label>
                                    <div class="dataValue">${item.firstname}</div>
                                    <br>
                                    <label >Last Name</label>
                                    <div class="dataValue">${item.lastname}</div>
                                    <br>
                                    <label >Gender</label>
                                    <div class="dataValue">${item.gender}</div>
                                    <br>
                                    <label >Birth</label>
                                    <div class="dataValue">${item.birth}</div>
                                    <br>
                                    <label >Phone Number</label>
                                    <div class="dataValue">${item.phoneNumber}</div>
                                </div>`);
        

    };

    // ----------------------------

    me.links.forEach(function( link )
    {
        link.addEventListener('click',function(e)
        {
            var clickedLink = e.currentTarget.getAttribute('id');
            //me.clickedLink.classList.remove('hide_view');
            if(clickedLink === 'log')
            {
                var result = confirm('log out');
                if(result)
                {
                    me.log.classList.remove('hide_view');
                    me.sidebar.classList.remove('show-sidebar');
                    me.main.classList.add('hide_view');
                };
            }
            if(clickedLink === 'entry')
            {
                me.entry.classList.remove('hide_view');
                me.sidebar.classList.remove('show-sidebar');
                me.main.classList.add('hide_view');
            }
            if(clickedLink === 'about')
            {
                me.about.classList.remove('hide_view');
                me.sidebar.classList.remove('show-sidebar');
                me.main.classList.add('hide_view');
            }
            if(clickedLink === 'setting')
            {
                me.setting.classList.remove('hide_view');
                me.sidebar.classList.remove('show-sidebar');
                me.main.classList.add('hide_view');
            }
            
        })
    });

    
    

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
