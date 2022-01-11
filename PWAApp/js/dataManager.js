// -------------------------------------------
// -- DataManager Class/Methods

function DataManager() {};

DataManager.NAME_lastLoginTime = 'lastLoginTime';
DataManager.NAME_list = 'list';

/* ============================================== */

DataManager.setLastLoginTime = function( lastLoginTime )
{
    localStorage.setItem( DataManager.NAME_lastLoginTime, lastLoginTime.toString() );
};

DataManager.getLastLoginTime = function()
{
    return localStorage.getItem( DataManager.NAME_lastLoginTime );
};

// -----------------------------

DataManager.getData_ItemList = function()
{
    return localStorage.getItem( DataManager.NAME_list ) ? JSON.parse( localStorage.getItem( DataManager.NAME_list ) ) : [];
};

DataManager.setData_ItemList = function( list )
{
    localStorage.setItem( DataManager.NAME_list, JSON.stringify( list ) );
};

DataManager.setData_Item = function( item )
{
    var list = DataManager.getData_ItemList();
    list.push( item );
    DataManager.setData_ItemList( list );
};


//  get item by index of list 
DataManager.getData_Item_byIndex = function( i )
{
    var list = DataManager.getData_ItemList();
    return list[i];
};
                    
DataManager.getData_Item = function( id )
{
    var item;
    var list = DataManager.getData_ItemList();

    for( var i = 0; i < list.length; i++ )
    {
        var itemTemp = list[i];
        if ( itemTemp.id === id )
        {
            item = itemTemp;
            break;
        }
    }

    return item;
};

// -----------------