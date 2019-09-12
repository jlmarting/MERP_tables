(function(){
    var merp = {};

    merp.characters = {};
    
    merp.characters.data = [];

    merp.characters.domId = 'characters';

    var character = function(name, LVL, race, CA, BOCC, BOPR, BD, PV, MM, DESCR){
        this.name = name;
        this.LVL = LVL;
        this.race = race;
        this.CA = CA;
        this.BOCC = BOCC;
        this.BOPR = BOPR;
        this.PV = PV;
        this.MM = MM;
        this.DESCR = DESCR;
    }

    var character1 = new character('Coerba', 4, 'CE', 78, 72, 35, 64, 15, 'Guerrero');
    var character2 = new character('Sunil', 4, 'C', 87, 55, 30, 57, 15, 'Guerrero');

    merp.characters.data.push(character1);
    merp.characters.data.push(character2);


    merp.characters.selector = function(id, mode){
        var s = document.createElement('select');
        s.id = id;
        merp.characters.data.forEach(element => {
            var option = document.createElement('option')
            option.value = element.name;
            option.text = element.name;
            s.appendChild(option);
        });

        s.addEventListener('click',function(){ 
                                    if(mode=='attack'){
                                       
                                    }else{
                                        
                                    }
                                    });
        return s;
    }



    if(typeof window.merp === 'undefined'){
        window.merp = merp;
    }
    else{        
        window.merp.characters = merp.characters;
        return merp;
    }



})();