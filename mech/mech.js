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
    this.ps = ps;   //the power source
    console.log( ps+'?!! sheet has hit the fan!' );

    this.init = function() {
        var opts = { id : "mechPS", name : "Power Source"   };
        opts = bsTemps.form.init( "select", opts );
        $('form').prepend( opts );
        this.wire();
    };
    
    this.wire = function(){
        var _this = this;
        $('select').change( function(){
            _this.ps = $(this).val();
            console.log( $(this).attr('id') +' : '+ _this.ps );
        });  
    };
    
    this.error = function ( err ){
        err = "<div>Error: "+err+"</div>";
    };

};