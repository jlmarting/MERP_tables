//Cabecera común para tablas de ataque
var headerATx = ['tirada','CO','CM','CE','C','SA'];

var modsATx = {
  id: 'modsATx',
  bonus_flanco    : {descr: 'ataque por el flanco', valor: 15, uds: 0},
  bonus_espalda   : {descr: 'ataque por la espalda', valor : 20, uds: 0},
  bonus_sorpresa  : {descr: 'defensor sorprendido', valor :  15, uds: 0},
  bonus_aturdido  : {descr: 'defensor caído o aturdido', valor : 20, uds: 0},
  malus_movimiento: {descr: 'movimiento 3 metros del atacante', valor : -10, uds: 0},
  malus_manipular : {descr: 'atacante desenvaina espada / embraza escudo', valor: -30, uds: 0},
  malus_PV        : {descr: 'atacante con la mitad de puntos de vida', valor:-20, uds:0},
  malus_BO        : {descr: 'reserva de BO para parar', valor : -1, uds: 0},  
  total           : function(){ var a = (modsATx.bonus_flanco.valor*modsATx.bonus_flanco.uds) + 
                                        (modsATx.bonus_espalda.valor*modsATx.bonus_espalda.uds) + 
                                        (modsATx.bonus_sorpresa.valor*modsATx.bonus_sorpresa.uds) + 
                                        (modsATx.bonus_aturdido.valor*modsATx.bonus_aturdido.uds);
                                var b = (modsATx.malus_movimiento.valor*modsATx.malus_movimiento.uds) + 
                                        (modsATx.malus_manipular.valor*modsATx.malus_manipular.uds) + 
                                        (modsATx.malus_PV.valor*modsATx.malus_PV.uds) + 
                                        (modsATx.malus_BO.valor*modsATx.malus_BO.uds);
                                return a+b;
                              }
};

var modsAT7 = { 
  id: 'modsAT7',
  malus_agilidad  : {descr: 'menos la bonificación por agilidad', valor : -1, uds: 0},
  malus_a_cubierto: {descr: '-10 a -60 si se pone al cubierto', valor: -1, uds: 0},  
  malus_escudo    : {descr: 'si el blanco tiene un escudo que se encara al ataque', valor : -20, uds: 0},
  total           : function(){
                                var r = (modsAT7.malus_agilidad.valor*modsAT7.malus_agilidad.uds) +
                                        (modsAT7.malus_a_cubierto.valor*modsAT7.malus_a_cubierto.uds) +
                                        (modsAT7.malus_escudo.valor*modsAT7.malus_escudo.uds);
                                        return r;
                              }
};

var rows_at_1 = [
  ["01/08", "pifia", "pifia", "pifia", "pifia", "pifia"],
  ["09/35", "0", "0", "0", "0", "0"],
  ["36/40", "0", "0", "0", "0", "0"],
  ["41/45", "0", "0", "0", "0", "0"],
  ["46/50", "1", "0", "0", "0", "0"],
  ["51/55", "1", "1", "0", "0", "0"],
  ["56/60", "2", "1", "0", "0", "0"],
  ["61/65", "2", "2", "0", "0", "0"],
  ["66/70", "3", "3", "2", "3", "0"],
  ["71/75", "3", "4", "3", "5", "0"],
  ["76/80", "4", "5", "5", "7a", "7"],
  ["81/85", "5", "6", "6", "9a", "9a"],
  ["86/90", "5", "7", "7a", "10b", "10a"],
  ["91/95", "6", "8", "9a", "12b", "11b"],
  ["96/100", "6", "9", "10b", "13b", "13c"],
  ["101/105", "7", "10a", "11b", "14c", "15c"],
  ["106/110", "8", "11a", "12b", "15c", "17d"],
  ["111/115", "8a", "12b", "13c", "17c", "19d"],
  ["116/120", "9a", "13b", "15c", "18d", "20d"],
  ["121/125", "9a", "13c", "16c", "19d", "21e"],
  ["126/130", "10b", "14c", "17d", "20d", "23e"],
  ["131/135", "11b", "15c", "18d", "22d", "25e"],
  ["136/140", "11c", "16d", "20d", "23e", "27e"],
  ["141/145", "12d", "17d", "21e", "24e", "28e"],
  ["146/150", "12e", "18e", "22e", "25e", "30e"]
];
var rows_at_2 = [
  ["01/08", "pifia", "pifia", "pifia", "pifia", "pifia"],
  ["09/35", "0", "0", "0", "0", "0"],
  ["36/40", "1", "0", "0", "0", "0"],
  ["41/45", "1", "1", "0", "0", "0"],
  ["46/50", "2", "2", "0", "0", "0"],
  ["51/55", "3", "3", "0", "0", "0"],
  ["56/60", "3", "4", "0", "0", "0"],
  ["61/65", "4", "5", "0", "0", "0"],
  ["66/70", "5", "6", "2", "3", "0"],
  ["71/75", "5", "7", "3", "5", "0"],
  ["76/80", "6", "8", "4", "6", "0"],
  ["81/85", "7", "9", "6", "7a", "6"],
  ["86/90", "8", "10", "7a", "8a", "8"],
  ["91/95", "8", "11", "8a", "9a", "9a"],
  ["96/100", "9", "12a", "9b", "10b", "10b"],
  ["101/105", "10", "13a", "10b", "11b", "12c"],
  ["106/110", "10a", "14b", "11b", "12b", "13c"],
  ["111/115", "11a", "15b", "12c", "13c", "14d"],
  ["116/120", "12b", "16c", "13c", "14c", "15d"],
  ["121/125", "13b", "17c", "15c", "15c", "17d"],
  ["126/130", "13c", "18c", "16c", "16d", "18e"],
  ["131/135", "14c", "19d", "17d", "17d", "19e"],
  ["136/140", "15d", "20d", "18d", "18e", "21e"],
  ["141/145", "16d", "21e", "19e", "19e", "22e"],
  ["146/150", "16e", "22e", "20e", "20e", "23e"]
];
var rows_at_3 = [
  ["01/08", "pifia", "pifia", "pifia", "pifia", "pifia"],
  ["09/55", "0", "0", "0", "0", "0"],
  ["56/60", "2", "0", "0", "0", "0"],
  ["61/65", "3", "0", "0", "0", "0"],
  ["66/70", "4", "3", "0", "0", "0"],
  ["71/75", "5", "5", "2", "8a", "0"],
  ["76/80", "6", "7", "4a", "10a", "0"],
  ["81/85", "7", "9", "7a", "13b", "10a"],
  ["86/90", "8", "11", "9b", "15b", "13b"],
  ["91/95", "9", "12a", "12b", "17c", "16c"],
  ["96/100", "11", "14a", "14c", "20c", "19d"],
  ["101/105", "12a", "16b", "17c", "22c", "22d"],
  ["106/110", "13a", "18b", "19c", "24c", "25d"],
  ["111/115", "14b", "20c", "22c", "27d", "28e"],
  ["116/120", "15b", "22c", "24d", "29d", "31e"],
  ["121/125", "16c", "24c", "27d", "31d", "33e"],
  ["126/130", "17c", "26d", "29d", "33e", "36e"],
  ["131/135", "19d", "28d", "32e", "36e", "39e"],
  ["136/140", "20d", "29e", "34e", "38e", "42e"],
  ["141/145", "21e", "31e", "37e", "40e", "45e"],
  ["146/150", "22e", "33e", "40e", "43e", "48e"]
];
var rows_at_4 = [
  ["01/08", "pifia", "pifia", "pifia", "pifia", "pifia"],
  ["09/55", "0", "0", "0", "0", "0"],
  ["56/60", "0", "0", "0", "0", "0"],
  ["61/65", "0", "0", "0", "0", "0"],
  ["66/70", "0", "0", "0", "0", "0"],
  ["71/75", "1", "0", "0", "0", "0"],
  ["76/80", "2", "2", "0", "4", "0"],
  ["81/85", "3", "4", "3", "6", "0"],
  ["86/90", "4", "6", "5", "8a", "0"],
  ["91/95", "5", "7", "7a", "10a", "8a"],
  ["96/100", "6", "8a", "9a", "12b", "10b"],
  ["101/105", "7", "10a", "10b", "13b", "11c"],
  ["106/110", "8a", "13b", "12b", "14b", "13c"],
  ["111/115", "9a", "14b", "13b", "16c", "15c"],
  ["116/120", "10a", "16b", "15c", "17c", "16c"],
  ["121/125", "11b", "17c", "17c", "19d", "18d"],
  ["126/130", "11b", "19c", "19d", "20d", "20d"],
  ["131/135", "12c", "20d", "21d", "22d", "22e"],
  ["136/140", "13c", "22d", "23d", "23e", "23e"],
  ["141/145", "14d", "26e", "25e", "25e", "25e"],
  ["146/150", "15e", "25e", "26e", "26e", "27e"]
];
var rows_at_5 = [
  ["01/02", "fallo", "fallo", "fallo", "fallo", "fallo"],
  ["03/45", "0", "0", "0", "0", "0"],
  ["46/50", "0", "0", "0", "0", "1"],
  ["51/55", "0", "0", "0", "0", "2"],
  ["56/60", "1", "0", "0", "1", "4"],
  ["61/65", "1", "1", "1", "2", "5t"],
  ["66/70", "2", "2", "2", "4", "6t"],
  ["71/75", "2", "2", "2", "5", "8t"],
  ["76/80", "4", "4", "5", "7t", "9a"],
  ["81/85", "5", "5", "7t", "9t", "10a"],
  ["86/90", "6", "6t", "8t", "10a", "12a"],
  ["91/95", "6t", "7t", "9a", "11a", "13b"],
  ["96/100", "7t", "8a", "10a", "12a", "14b"],
  ["101/105", "7a", "9a", "11a", "13b", "15b"],
  ["106/110", "8a", "10a", "12b", "15b", "17c"],
  ["111/115", "9a", "11b", "13b", "16c", "19c"],
  ["116/120", "10b", "11b", "14c", "17c", "20d"],
  ["121/125", "14b", "15b", "18c", "20c", "26d"],
  ["126/130", "16b", "18c", "20c", "23d", "28e"],
  ["131/135", "18c", "20c", "22d", "25d", "30e"],
  ["136/140", "20c", "23d", "26d", "30e", "36e"],
  ["141/145", "22d", "25d", "29e", "33e", "38e"],
  ["146/150", "24e", "27e", "32e", "36e", "40e"]
];
var rows_at_6 = [
  ["01/02", "fallo", "fallo", "fallo", "fallo", "fallo"],
  ["03/45", "0", "0", "0", "0", "0"],
  ["46/50", "0", "0", "0", "0", "0"],
  ["51/55", "0", "0", "0", "0", "0"],
  ["56/60", "1", "0", "0", "0", "0"],
  ["61/65", "1", "0", "0", "0", "1"],
  ["66/70", "2t", "1", "0", "1", "1"],
  ["71/75", "2a", "2t", "1", "3", "2"],
  ["76/80", "3a", "3t", "2", "4t", "4"],
  ["81/85", "3a", "4a", "4t", "6t", "5"],
  ["86/90", "4a", "4a", "5t", "7t", "7t"],
  ["91/95", "4a", "5a", "6t", "8a", "8t"],
  ["96/100", "5b", "6a", "7a", "9a", "10t"],
  ["101/105", "5b", "7a", "8a", "10a", "11a"],
  ["106/110", "6c", "8b", "10a", "12b", "14a"],
  ["111/115", "7c", "9c", "11b", "13b", "15a"],
  ["116/120", "8c", "10c", "12b", "14c", "16b"],
  ["121/125", "10d", "11c", "14b", "16c", "18b"],
  ["126/130", "11d", "13d", "16c", "18c", "20b"],
  ["131/135", "12d", "15d", "18c", "20d", "22c"],
  ["136/140", "14e", "19d", "22c", "26d", "28c"],
  ["141/145", "16e", "21e", "25d", "28d", "30c"],
  ["146/150", "18e", "23e", "27e", "30e", "33d"]
];
var rows_at_7 = 
// [
//   ["01/02", "F", "F", "F", "F", "F"],
//   ["03/10", "F", "F", "F", "F", "F"],
//   ["11/20", "F", "0", "0", "0", "0"],
//   ["21/35", "0", "0", "0", "0", "0"],
//   ["36/40", "1", "0", "0", "0", "0"],
//   ["41/45", "2", "0", "0", "0", "0"],
//   ["46/50", "3", "0", "0", "0", "0"],
//   ["51/55", "4", "1", "0", "0", "0"],
//   ["56/60", "5", "1", "0", "0", "0"],
//   ["61/65", "6", "2", "0", "0", "0"],
//   ["66/70", "7a", "3", "2", "3", "0"],
//   ["71/75", "7a", "4", "3", "5", "0"],
//   ["76/80", "8a", "5", "5", "7a", "7"],
//   ["81/85", "8a", "6", "6", "9a", "9a"],
//   ["86/90", "9a", "7", "7a", "10b", "10a"],
//   ["91/95", "9a", "8", "9a", "12b", "11b"],
//   ["96/100", "10a", "9", "10b", "13b", "13c"],
//   ["101/105", "10b", "10a", "11b", "14c", "15c"],
//   ["106/110", "11b", "11a", "12b", "15c", "17d"],
//   ["111/115", "12b", "12b", "13c", "17c", "19d"],
//   ["116/120", "12c", "13b", "15c", "18d", "20d"],
//   ["121/125", "13c", "13c", "16c", "19d", "21e"],
//   ["126/130", "14c", "14c", "17d", "20d", "23e"],
//   ["131/135", "15c", "15c", "18d", "22d", "25e"],
//   ["136/140", "16d", "16d", "20d", "23e", "27e"],
//   ["141/145", "17d", "17d", "21e", "24e", "28e"],
//   ["146/150", "18e", "18e", "22e", "25e", "30e"]
// ];

[
  [
    "01/02",
    "F",
    "F",
    "F",
    "F",
    "F"
  ],
  [
    "03/10",
    "F",
    "F",
    "F",
    "F",
    "F"
  ],
  [
    "11/20",
    "F",
    "F",
    "0",
    "0",
    "0"
  ],
  [
    "21/35",
    "0",
    "0",
    "0",
    "0",
    "0"
  ],
  [
    "36/40",
    "1",
    "0",
    "0",
    "0",
    "0"
  ],
  [
    "41/45",
    "2",
    "1",
    "0",
    "0",
    "0"
  ],
  [
    "46/50",
    "3",
    "1",
    "0",
    "1",
    "0"
  ],
  [
    "51/55",
    "4",
    "2",
    "1",
    "1",
    "0"
  ],
  [
    "56/60",
    "5",
    "2",
    "2",
    "2",
    "0"
  ],
  [
    "61/65",
    "6",
    "3",
    "4",
    "3",
    "8a"
  ],
  [
    "66/70",
    "7a",
    "4",
    "5",
    "4a",
    "10a"
  ],
  [
    "71/75",
    "7a",
    "5a",
    "6",
    "5a",
    "11b"
  ],
  [
    "76/80",
    "8a",
    "6a",
    "7a",
    "6b",
    "12b"
  ],
  [
    "81/85",
    "8a",
    "7a",
    "8a",
    "7b",
    "13b"
  ],
  [
    "86/90",
    "9a",
    "8a",
    "9b",
    "8b",
    "14b"
  ],
  [
    "91/95",
    "9a",
    "9b",
    "10b",
    "10b",
    "15c"
  ],
  [
    "96/100",
    "10a",
    "10b",
    "11b",
    "12c",
    "16c"
  ],
  [
    "101/105",
    "10b",
    "11b",
    "12c",
    "14c",
    "18c"
  ],
  [
    "106/110",
    "11b",
    "12c",
    "13c",
    "16c",
    "20c"
  ],
  [
    "111/115",
    "12b",
    "13c",
    "14c",
    "18c",
    "22d"
  ],
  [
    "116/120",
    "12c",
    "14c",
    "15c",
    "20d",
    "24d"
  ],
  [
    "121/125",
    "13c",
    "15c",
    "16d",
    "22d",
    "26e"
  ],
  [
    "126/130",
    "14c",
    "16d",
    "17d",
    "24e",
    "28e"
  ],
  [
    "131/135",
    "15c",
    "17d",
    "18e",
    "26e",
    "30e"
  ],
  [
    "136/140",
    "16d",
    "18d",
    "19e",
    "28e",
    "32e"
  ],
  [
    "141/145",
    "17d",
    "20e",
    "20e",
    "30e",
    "34e"
  ],
  [
    "146/150",
    "18e",
    "22e",
    "22e",
    "31e",
    "36e"
  ]
];



var rows_at_8 = 
[
   [
    "01/04",
    "F",
    "F",
    "F",
    "F",
    "F"
  ],
  [
    "05/08",
    "F",
    "F",
    "F",
    "F",
    "F"
  ],
  [
    "09/12",
    "F",
    "F",
    "0",
    "0",
    "1"
  ],
  [
    "13/16",
    "0",
    "0",
    "0",
    "0",
    "2"
  ],
  [
    "17/20",
    "1",
    "0",
    "0",
    "0",
    "0"
  ],
  [
    "21/24",
    "2",
    "1",
    "0",
    "0",
    "4"
  ],
  [
    "25/28",
    "3",
    "2",
    "1",
    "0",
    "5a"
  ],
  [
    "29/32",
    "4",
    "3",
    "2",
    "0",
    "6a"
  ],
  [
    "33/36",
    "5a",
    "4",
    "3",
    "1",
    "7a"
  ],
  [
    "37/40",
    "6a",
    "5a",
    "4",
    "2",
    "8a"
  ],
  [
    "41/44",
    "7a",
    "6a",
    "5a",
    "3",
    "9a"
  ],
  [
    "45/48",
    "8a",
    "7a",
    "6a",
    "4",
    "10b"
  ],
  [
    "49/52",
    "9a",
    "8a",
    "7a",
    "5",
    "11b"
  ],
  [
    "53/56",
    "10b",
    "9a",
    "8a",
    "6a",
    "12b"
  ],
  [
    "57/60",
    "11b",
    "10b",
    "9a",
    "7a",
    "13b"
  ],
  [
    "61/64",
    "12b",
    "11b",
    "10b",
    "8a",
    "14b"
  ],
  [
    "65/68",
    "12b",
    "11b",
    "10b",
    "9a",
    "15c"
  ],
  [
    "69/72",
    "13b",
    "12b",
    "11b",
    "10a",
    "16c"
  ],
  [
    "73/76",
    "13c",
    "12b",
    "11b",
    "10a",
    "17c"
  ],
  [
    "77/80",
    "14c",
    "13c",
    "12b",
    "11b",
    "18c"
  ],
  [
    "81/84",
    "14c",
    "13c",
    "12c",
    "11b",
    "19c"
  ],
  [
    "85/88",
    "15c",
    "14c",
    "13c",
    "12b",
    "21c"
  ],
  [
    "89/92",
    "15c",
    "14c",
    "13c",
    "12b",
    "21c"
  ],
  [
    "93/96",
    "16c",
    "15c",
    "14c",
    "13c",
    "22c"
  ],
  [
    "97/99",
    "19d",
    "18d",
    "17d",
    "16d",
    "28d"
  ],
  [
    "100",
    "22e",
    "21e",
    "20e",
    "19e",
    "34e"
  ]
];

var rows_at_9 =
[
  [
    "01/04",
    "F",
    "F",
    "F",
    "F",
    "F"
  ],
  [
    "05/08",
    "F",
    "F",
    "F",
    "F",
    "F"
  ],
  [
    "09/12",
    "F",
    "F",
    "F",
    "F",
    "+70"
  ],
  [
    "13/16",
    "F",
    "F",
    "+45",
    "+45",
    "+60"
  ],
  [
    "17/20",
    "+45",
    "+45",
    "+40",
    "+40",
    "+50"
  ],
  [
    "21/24",
    "+40",
    "+40",
    "+35",
    "+35",
    "+45"
  ],
  [
    "25/28",
    "+35",
    "+35",
    "+30",
    "+30",
    "+35"
  ],
  [
    "29/32",
    "+30",
    "+30",
    "+25",
    "+25",
    "+60"
  ],
  [
    "33/36",
    "+25",
    "+25",
    "+20",
    "+20",
    "+20"
  ],
  [
    "37/40",
    "+20",
    "+20",
    "+15",
    "+15",
    "+15"
  ],
  [
    "41/44",
    "+15",
    "+15",
    "+10",
    "+10",
    "+5"
  ],
  [
    "45/48",
    "+10",
    "+10",
    "+5",
    "+5",
    "0"
  ],
  [
    "49/52",
    "+5",
    "+5",
    "0",
    "0",
    "0"
  ],
  [
    "53/56",
    "0",
    "0",
    "0",
    "0",
    "-5"
  ],
  [
    "57/60",
    "0",
    "0",
    "-5",
    "-5",
    "-10"
  ],
  [
    "61/64",
    "-5",
    "-5",
    "-5",
    "-5",
    "-15"
  ],
  [
    "65/68",
    "-5",
    "-5",
    "-10",
    "-10",
    "-20"
  ],
  [
    "69/72",
    "-10",
    "-10",
    "-15",
    "-15",
    "-25"
  ],
  [
    "73/76",
    "-25",
    "-25",
    "-20",
    "-20",
    "-30"
  ],
  [
    "77/80",
    "-30",
    "-30",
    "-25",
    "-25",
    "-35"
  ],
  [
    "81/84",
    "-35",
    "-35",
    "-30",
    "-30",
    "-40"
  ],
  [
    "85/88",
    "-40",
    "-40",
    "-35",
    "-35",
    "-45"
  ],
  [
    "89/92",
    "-45",
    "-45",
    "-40",
    "-40",
    "-50"
  ],
  [
    "93/96",
    "-50",
    "-50",
    "-45",
    "-45",
    "-55"
  ],
  [
    "97/99",
    "-65",
    "-65",
    "-65",
    "-65",
    "-65"
  ],
  [
    "100",
    "-90",
    "-90",
    "-90",
    "-90",
    "-90"
  ]
];

var rows_ttr = [
  ['','Nivel del atacante'],
  ['Nivel del blanco',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  [1,50,55,60,65,70,73,76,79,82,85,87,89,91,93,95],
  [1,50,55,60,65,70,73,76,79,82,85,87,89,91,93,95],
  [1,50,55,60,65,70,73,76,79,82,85,87,89,91,93,95],
  [1,50,55,60,65,70,73,76,79,82,85,87,89,91,93,95]
];
