(function(){

    var merp = {};

    merp.tables = {};
    
    merp.tables.data = [];
          
    var table = function(id,descr,header,rows,mods){        
        this.id = id;
        this.descr = descr;
        this.header = header;
        this.rows = rows;
        this.mods = mods;
        var self = this;

        this.add = function(row){
            self.rows.push(row);
        }

        this.remove = function(){

        }

        this.inRange = function(dice, range){
            var limits = range.split('/');          
            if(limits.length > 2 ){
                return false
            }
            if((parseInt(dice)>=parseInt(limits[0]))&&(parseInt(dice)<=parseInt(limits[1]))){
                console.log(dice +  ', ' + range + ': ' + limits[0] + ' - ' + limits[1]);
                return true;
            }
            else{
                return false;
            } 
        }

        this.get = function(dices,column){
            //TODO: check column
            for(var i=0;i<self.rows.length;i++){
                if(self.inRange(dices,self.rows[i][0])){
                    return self.rows[i][self.header.indexOf(column)];
                }
            }
            return "000";
        }
    }

    var at1 = new table("AT-1","TABLA DE ATAQUE CON ARMAS DE FILO", headerATx, rows_at_1, modsATx);
    var at2 = new table("AT-2","TABLA DE ATAQUE CON ARMAS CONTUNDENTES", headerATx, rows_at_2, modsATx);
    var at3 = new table("AT-3","TABLA DE ATAQUE CON ARMAS A 2 MANOS", headerATx, rows_at_3, modsATx);
    var at4 = new table("AT-4","TABLA DE ATAQUE CON PROYECTILES", headerATx, rows_at_4, modsATx);
    var at5 = new table("AT-5","ATAQUES DE GARRAS Y DIENTES", headerATx, rows_at_5, modsATx);
    var at6 = new table("AT-6","ATAQUES DE AGARRAR y DESEQUILIBRAR", headerATx, rows_at_6, modsATx);
    var at7 = new table("AT-7","ATAQUES DE ATAQUES DE SORTILEGIOS DE RAYO", headerATx, rows_at_7, modsAT7);
    var at8 = new table("AT-8","ATAQUES DE ATAQUES DE SORTILEGIOS DE BOLA", headerATx, rows_at_8, modsATx);
    var at9 = new table("AT-9","ATAQUES DE ATAQUES DE SORTILEGIOS BÁSICOS", headerATx, rows_at_9, modsATx);
    var ttr = new table("TTR","TABLA DE TIRADAS DE RESISTENCIA", [], rows_ttr);

    merp.tables.data.push(at1);
    merp.tables.data.push(at2);
    merp.tables.data.push(at3);
    merp.tables.data.push(at4);
    merp.tables.data.push(at5);
    merp.tables.data.push(at6);
    merp.tables.data.push(at7);
    merp.tables.data.push(at8);
    merp.tables.data.push(at9);
    merp.tables.data.push(ttr);


    // fin carga tabla

    merp.tables.getTable = function(id){
        for(var i=0;i<merp.tables.data.length;i++){
            if(merp.tables.data[i].id == id){
                return merp.tables.data[i];
            }
        }
        return [];
    }

    merp.tables.domId = 'tables';

    //Controles para obtención de datos de ataque
    merp.tables.drawDiceNModsAT = function(id,tableId){
        var html = document.getElementById(merp.tables.domId).innerHTML;
        html += '<ul id="modsat">';
        html += '<li><label for="'+ id +'">BO atacante:</label>'+'<input type="text" id="'+id+'BO" value="0"/></li>';    
        html += '<li><label for="'+ id +'">BD defensor:</label>'+'<input type="text" id="'+id+'BD" value="0"/></li>';
        html += '<li><label for="'+ id +'">Misc.:</label>'+'<input type="text" id="'+id+'Misc" value="0"/></li>';
        html += '<li><label for="'+ id +'">Tirada:</label>'+'<input type="text" id="'+id+'" value="0"/></li>';        
        html += '<li><label for="'+ id +'Arm">Armadura objetivo</label>'+'<select id="'+id+'Arm" value="0"/></li>';
 

        var t = merp.tables.getTable(tableId);
        t.header.forEach(e => {
            html += '<option value="'+ e +'">'+ e +'</option>';
        });
        html += '</select></li>';
        
        html += '<li><button id="'+'b'+id+'">Calcular</button></li>';
        html += '<li><label for="'+ id +'Res">Resultado 1</label>'+'<input type="text" id="'+id+'Res1"></li>';
        html += '</ul>';
        
        document.getElementById(merp.tables.domId).innerHTML =  html;
        document.getElementById('b'+id).addEventListener('click', function(){                                                                        
                                                                        calculate(id,t);                                                                                                                           
                                                            });
        html += '<button id="'+'b'+id+'">Calcular</button>';
        //html += '<label for="'+ id +'Res">Resultado 2</label>'+'<input type="text" id="'+id+'Res2">';
    };

    function calculate(id,t){    
            switch(t.mods.id){
                case 'modsATx': 
                t.mods.bonus_flanco.uds = (document.getElementById('bonus_flanco').checked)?1:0;
                t.mods.bonus_aturdido.uds = (document.getElementById('bonus_aturdido').checked)?1:0;
                t.mods.bonus_espalda.uds = (document.getElementById('bonus_espalda').checked)?1:0;
                t.mods.bonus_sorpresa.uds = (document.getElementById('bonus_sorpresa').checked)?1:0;
                t.mods.malus_manipular.uds = (document.getElementById('malus_manipular').checked)?1:0;            
                t.mods.malus_PV.uds = (document.getElementById('malus_PV').checked)?1:0;
                t.mods.malus_movimiento.uds = document.getElementById('malus_movimiento').value;
                t.mods.malus_BO.uds = document.getElementById('malus_BO').value;
                break;

                case 'modsAT7': 
                t.mods.malus_escudo.uds = (document.getElementById('malus_escudo').checked)?1:0;
                t.mods.malus_agilidad.uds = document.getElementById('malus_agilidad').value;
                t.mods.malus_a_cubierto.uds = document.getElementById('malus_a_cubierto').value;
                break;
                default:    break;
            }
            



            var mtotal = t.mods.total();
            console.log('mods: ' + mtotal);

            var v = parseInt(document.getElementById(id).value);
            v += parseInt(document.getElementById(id+'BO').value);
            v -= parseInt(document.getElementById(id+'BD').value);
            v += parseInt(document.getElementById(id+'Misc').value);
            var arm = document.getElementById(id+'Arm').value;
            console.log('sin mods: ' + v);
            
            var r0 = mtotal + v;
            var r = t.get(r0,arm);   
            document.getElementById(id+'Res1').value = r;                                                                                                                                             

    }
    

    merp.tables.drawTable = function(id){        
        var t = merp.tables.getTable(id);
        var html = '<br/>';
        var i = 0;
        html += '<b>'+ t.id + ' - '+ t.descr+ "</b>";
        html += '<button class"btn" data-toggle="collapse" href="#table'+id+'">+</button>';
        html += '<table class="table-dark collapse show" id="table'+id+'">';
        html += '<tr>';
        t.header.forEach(element =>{
            html += '<td><input type="text" tabindex="'+ i+ '" value="'+element+'"/></td>';
            i++;
        });    
        html += '</tr>';

        t.rows.forEach(element =>{
            html += '<tr>';
            element.forEach(e =>{
                html += '<td><input tabindex="'+i+'" type="text" value="'+ e +'"/></td>';
                i++
            });
            html += '</tr>';
        });
        html += '</table>'; 
        
        html += '<form><div class="form-group">';
        switch(t.mods.id){
            case 'modsATx': 
            html += '<label for="bonus_flanco">'+t.mods.bonus_flanco.descr + ' ' + t.mods.bonus_flanco.valor +'</label>'
                    +'<input type="checkbox" id="bonus_flanco" value="'+t.mods.bonus_flanco.valor+'"/>'+ '<br/>';
            html += '<label for="bonus_espalda">'+t.mods.bonus_espalda.descr + ' ' + t.mods.bonus_espalda.valor +'</label>'
                    +'<input type="checkbox" id="bonus_espalda" value="'+t.mods.bonus_espalda.valor+'"/>' +'<br/>';
            html += '<label for="bonus_sorpresa">'+t.mods.bonus_sorpresa.descr + ' ' + t.mods.bonus_sorpresa.valor +'</label>'
                    +'<input type="checkbox" id="bonus_sorpresa" value="'+t.mods.bonus_sorpresa.valor+'"/>'+'<br/>';                
            html += '<label for="bonus_aturdido">'+t.mods.bonus_aturdido.descr + ' ' + t.mods.bonus_aturdido.valor +'</label>'
                    +'<input type="checkbox" id="bonus_aturdido" value="'+t.mods.bonus_aturdido.valor+'"/>'+'<br/>';                
            html += '<label for="malus_manipular">'+t.mods.malus_manipular.descr + ' ' + t.mods.malus_manipular.valor +'</label>'
                    +'<input type="checkbox" id="malus_manipular" value="'+t.mods.malus_manipular.valor+'"/>'+'<br/>';                
            html += '<label for="malus_movimiento">'+t.mods.malus_movimiento.descr + ' ' + t.mods.malus_movimiento.valor +'</label>'
                    +'<input type="text" id="malus_movimiento" value="'+t.mods.malus_movimiento.uds+'"/>'+'<br/>';                
            html += '<label for="malus_PV">'+t.mods.malus_PV.descr + ' ' + t.mods.malus_PV.valor +'</label>'
                    +'<input type="checkbox" id="malus_PV" value="'+t.mods.malus_PV.valor+'"/>'+ '<br/>';                
            html += '<label for="malus_movimiento">'+t.mods.malus_BO.descr + ' ' + t.mods.malus_BO.valor +'</label>'
                    +'<input type="text" id="malus_BO" value="'+t.mods.malus_BO.uds+'"/>'+'<br/>';               
            break;       
            case 'modsAT7':
            html += '<input type="text" id="malus_agilidad" value="'+t.mods.malus_agilidad.uds+'">'+ t.mods.malus_agilidad.descr + ' ' + t.mods.malus_agilidad.valor+'</input><br/>';                
            html += '<input type="checkbox" id="malus_escudo" value="'+t.mods.malus_escudo.uds+'">'+ t.mods.malus_escudo.descr + ' ' + t.mods.malus_escudo.valor+'</input><br/>';                
            html += '<input type="text" id="malus_a_cubierto" value="'+t.mods.malus_a_cubierto.uds+'">'+ t.mods.malus_a_cubierto.descr + ' ' + t.mods.malus_a_cubierto.valor+'</input><br/>';   
            break;
            default: break;
        }
        
        html += '</div></form>';
                     
        document.getElementById(merp.tables.domId).innerHTML = html;     
    }

    merp.tables.getFormRow = function(id)  {
        var t = document.getElementsByTagName('table')[0];
        var rows = [];
        for(var i=0;i<t.rows.length;i++){
            var r = [];
            for(var j=0;j<t.rows[i].cells.length;j++){
                r.push(t.rows[i].cells[j].getElementsByTagName('input')[0].value);
            }
            rows.push(r);    
        }        
        return rows;
    }

    merp.tables.selectTable = function(id){
        var s = document.createElement('select');
        s.id = id;
        merp.tables.data.forEach(element => {
            var option = document.createElement('option')
            option.value = element.id;
            option.text = element.descr;
            s.appendChild(option);
        });

        s.addEventListener('click',function(){ 
                                    document.getElementById(merp.tables.domId).innerHTML = "";                                                                    
                                    merp.tables.drawTable(s.value);                                    
                                    merp.tables.drawDiceNModsAT('dices',s.value);
                                    });
        return s;
    }



    if(typeof window.merp === 'undefined'){
        window.merp = merp;
    }
    else{        
        window.merp.tables = merp.tables;
        return merp;
    }
})();