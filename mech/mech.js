/*JSHint global vars*/
/*global $:false, console:false, tgdMech:false */

//mechSheet constructor object
if(!tgdMech){ console.log('no DB'); }
var bsTemps = {};
bsTemps = { //html templates
    'form' : {
        'head' : '<div class="form-group">\n',
        'label1' : '<label class="col-sm-2 control-label" for="',
//        'label2' : '">Power Source:</label>',
        'label2' : '</label>',
        'div'   : '<div class="col-sm-10">',
        'select1' : '<select class="form-control" id="',
//                    <option>Power Source</option>
        'select2' : '</select>\n</div>\n</div>',    //closes both divs (head and 'div')
        
        'pop' : function( db ) {
            var ret = '<option value="">Choose</option>';
            $.each( tgdMech[db], function( i,v ){
                 ret += '\n<option value="'+i+'">'+v+'</option>';
            });
            return ret;
        },

        'init' : function( t, opts ){ //type of form element
            var bs = bsTemps.form;
            var ret = bs.head + bs.label1 + opts.id + '">' + opts.name + bs.label2 + bs.div;
            if( t == "select" ){ 
                ret += bs.select1 + opts.id + '">\n';
                ret += bs.pop( opts.id );
                console.log( opts.id );
                ret += bs.select2; 
            }
            console.log( "ret: "+ret );
            return ret;
        }
    }
};

var mechSheet = function( ps ) {
//    this.steps = [ "mechPS", "mechSize", "mechHD", "mechSpeed", "mechManeuver",/* "AC", */ "thMat", "thSize" ];
    this.step = 0;  //which step you're on
    console.log( ps+'?!! sheet has hit the fan!' );

    this.init = function() {
        var tS = tgdMech.steps, s = this.step;
        var opts = { id : tS[s][0], name : tS[s][1]   };
        opts = bsTemps.form.init( "select", opts );
        $('form').prepend( opts );
        this.wire();
        this.step++;
    };
    
    this.wire = function(){
        var _this = this, v = 10, i = 11;
//        var v, i;
        $('select').change( function(){
//            _this.ps = $(this).val();
            v = $(this).val();
            i = $(this).attr('id');
            if( v  !== '' ){
                _this.set( i, v );
            }
            console.log( i +' : '+ _this.ps );
        });  
    };
    
    this.set = function( i, v ){    //id, value
        var _this = this;
        if( _this[i] ){
            _this[i] = v;
            console.log( 'existing prop : '+_this[i] );
        } else {
            _this[i] = v;
            _this.init();
            console.log( 'new prop : '+_this[i] );
        }
    };
   
    this.error = function ( err ){
        err = "<div>Error: "+err+"</div>";
    };

};