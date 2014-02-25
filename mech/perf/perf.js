/*JSHint global vars*/
/*global $:false, console:false */

/*http://jsperf.com/initiating-steps-using-arrays/2*/
/*http://jsbin.com/hiruseve/1/edit*/

var obj = {};

obj.steps = [ "step0", "step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8", "step9" ];

obj.steps2a = [ "step0", "step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8", "step9" ];

obj.steps2b = {};

obj.oa_arr = {}; obj.op_arr = {}; obj.aop_arr = {};

for( var i=0; i<obj.steps2a.length; i++ ) {
    var x = obj.steps2a[i];
    console.log(x);
    obj.steps2b[ x ] = obj.steps2a[i][''];
    if( i === 0 || 3 || 6 || 9 ){ obj.oa_arr[x] = ''; }
    else if( i == 1 || 5 || 7 ){ obj.op_arr[x] = ''; }
    else if( i == 2 || 4 || 8 ){ obj.aop_arr[x] = ''; }
}

obj.step = 0;

//obj.oa_arr = { "step0", "step3", "step6", "step9" };

//obj.op_arr = { "step1", "step5", "step7" };

//obj.aop_arr = { "step2", "step4", "step8" };

obj.oP = function(){ console.log( "oP" ); };

obj.aoP = function(){ console.log( "aoP" ); };

obj.oA = function(){ console.log( "oA" ); };

/*Test1*/
if( obj.steps[ obj.step ] ){ filtr( obj.steps[ obj.step ] ); }
else { console.log( 'test1 error' ); }

function filtr( step ){
    if( obj.oa_arr[ ""+step+"" ] ){ obj.oA(); }
    else if( obj.op_arr[ ""+step+"" ] ){ obj.oP(); }
    else if( obj.aop_arr[ ""+step+"" ] ){ obj.aoP(); }
}

obj.step++;

/* Test 2 */

//for( var i=0; i<obj.steps.length(); i++ ) {
var xyz = 0;
    if( xyz === 0 || 3 || 6 || 9 ){ obj.oA(); }
    else if( xyz == 1 || 5 || 7 ){ obj.oP(); }
    else if( xyz == 2 || 4 || 8 ){ obj.aoP(); }
i++;
//}

/* Test 3 */