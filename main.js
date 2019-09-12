(function(v){

    var f = {};
   
    f.id = "jsdata v.0.1";

    f.test = function(){console.log('lib: ' + id)};    

    f.save = function(key,value){
        if(value !== undefined){
            localStorage.setItem(key,value)
        }        
    };

    f.get = function(key){
        return localStorage.getItem(key);
    }

    f.setField = function(id,role){
        switch(role){
            case 'key'  :   f.keyId = document.getElementById(id); break;
            case 'value':   f.valueId = document.getElementById(id); break;            
            default     :   console.log('setField: Unknown role: ' + role);
        }        
    }

    f.setControl = function(id,role){
        switch(role){
            case 'save' :   f.saveId = document.getElementById(id);
                            f.saveId.addEventListener('click', function(){
                                f.save(f.keyId.value, f.valueId.value);
                            });
                            break;
            default     :  break;                            
        }

    }

    if(typeof window.jsdata === 'undefined'){
        window.jsdata = f;
    } else{
        return f;
    }

})();

