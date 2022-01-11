// -------------------------------------------
// -- StatsUtil Class/Methods

function BKSerivce() {};

BKSerivce.INTV_FREQUENCY = 1000;  // 1 sec
BKSerivce.runFuncArr = [];
BKSerivce.intvObj;

/* ============================================== */
/* === START UP/SETUP METHODS ================= */

BKSerivce.start = function()
{
    BKSerivce.intvObj = setInterval( function() {
        
        //BKSerivce.runFuncArr.forEach( function( runFunc ) {
        BKSerivce.runFuncArr.forEach( ( runFunc ) => {
            runFunc();
        });

    }, BKSerivce.INTV_FREQUENCY );
};

BKSerivce.end = function()
{
    clearInterval( BKSerivce.intvObj );
};

// ---------------------------------

BKSerivce.addRunFunc = function( runFunc )
{
    BKSerivce.runFuncArr.push( runFunc );
};


BKSerivce.addService = function( runFunc )
{
    BKSerivce.addRunFunc( runFunc );
};

