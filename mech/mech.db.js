/**
{
    "steam" : 0,
    "man"   : 0,
    "clock" : 0,
    "animat": 0,
    "undead": 0
};

// [ 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00 ]

[
    3,      //0
    5,      //1
    10,     //2
    16,     //3
    32,     //4
    64,     //5
    128,    //6
    256,    //7
    512,    //8
    1028,   //9
    2056,   //10
    4112,   //11
    8224,   //12
    16448   //13
]
**/

var tgdMech = {};

tgdMech.mechPS = {      // power source : step 1
    "steam" : "Steam-powered",
    "man"   : "Man-powered",
    "clock" : "Clockwork",
    "animat": "Animated",
    "undead": "Undead"
};

tgdMech.mechSize = {    // mech size : step 2
    "lrg" : "Large"       , //0
    "hug" : "Huge"        , //1
    "ggt" : "Gargantuan"  , //2
    "cl1" : "Colossal"    , //3
    "cl2" : "Colossal II" , //4
    "cl3" : "Colossal III", //5
    "cl4" : "Colossal IV" , //6
    "cl5" : "Colossal V"  , //7
    "cm1" : "City-mech A" , //8
    "cm2" : "City-mech B" , //9
    "cm3" : "City-mech C" , //10
    "cm4" : "City-mech D" , //11
    "cm5" : "City-mech E" , //12
    "cm6" : "City-mech F"   //13
};

tgdMech.mechHD = [      // determine hd : step 3
    { "lrg" : [   6, 0, 6, 4, 5 ] },
    { "hug" : [   12, 10, 12, 8, 10 ] },
    { "ggt" : [   24, 20, 24, 16, 20 ] },
    { "cl1" : [   48, 40, 48, 32, 40 ] },
    { "cl2" : [   96, 80, 96, 64, 80 ] },
    { "cl3" : [   144, 120, 144, 96, 120 ] },
    { "cl4" : [   192, 160, 192, 128, 160 ] },
    { "cl5" : [   240, 200, 240, 160, 200 ] },
    { "cm1" : [   336, 280, 336, 224, 280 ] },
    { "cm2" : [   432, 340, 432, 288, 340 ] },
    { "cm3" : [   528, 420, 528, 352, 420 ] },
    { "cm4" : [   624, 500, 624, 416, 500 ] },
    { "cm5" : [   718, 580, 718, 580, 580 ] },
    { "cm6" : [   814, 660, 814, 644, 660 ] }
];

tgdMech.mechSpeed = [   // determine speed : step 4 [ ft, mph ]
    [ 30, 3 ],    //1
    [ 40, 5 ],    //2
    [ 50, 6 ],    //3
    [ 60, 7 ],    //4
    [ 70, 8 ],    //5
    [ 80, 9 ],    //6
    [ 100, 11 ],  //7
    [ 120, 14 ],  //8
    [ 140, 16 ],  //9
    [ 160, 18 ],  //10
    [ 180, 20 ],  //11
    [ 200, 23 ],  //12
    [ 220, 25 ],  //13
    
];
    
tgdMech.mechManeuver = [    // step 5 : determine maneuverability
    "good",     //0
    "good",     //1
    "average",  //2
    "average",  //3
    "average",  //4
    "poor",     //5
    "poor",     //6
    "poor",     //7
    "clumsy",   //8
    "clumsy",   //9
    "clumsy",   //10
    "clumsy",   //11
    "clumsy",   //12
    "clumsy",   //13
    
];

// step 6 : determine mech AC
// AC = 10 + Mech size mod ("table 8" Mech AC by size)
// + pilot's DEX mod if he has feat: mech dancer

// step 7 : determine hardness (TH = Total Hardness)
// TH = 'material hardness' + 'hardness by size'

tgdMech.thMat = {    // 7.1 Material Hardness
    "flesh" : 1,    //undead only
    "clay"  : 3,
    "wood"  : 5,
    "bone"  : 6,
    "stone" : 8,
    "iron"  : 10,
    "steel" : 12,
    "mithral": 15,
    "adamantine": 20
};

tgdMech.thSize = [    // 7.2 Hardness by size
    0,    //0
    0,    //1
    0,    //2
    1,    //3
    2,    //4
    4,    //5
    6,    //6
    8,    //7
    10,   //8
    12,   //9
    14,   //10
    16,   //11
    18,   //12
    20,   //13
    
];

// step 8 : determine crit treshold
tgdMech.critTresh = {   // green, yellow, orange, red
    "steam" : [ 0, 50, 25, 10 ],
    "man"   : [ 0, 60, 35, 20 ],
    "clock" : [ 0, 50, 25, 10 ],
    "animat": [ 0, 0, 0, 0 ],
    "undead": [ 0, 0, 0, 0 ]
};

// step 9 : determine attacks
// melee : Mech STR mod + size mod + gunner DEX mod + gunr mech Atk. Bon.
// ranged: Mech DEX mod + gunr DEX mod + gunr Mech AB

// step 10 : space and reach
// may vary <= 10%
// mech face = floor( 1/2 height )
// mech reach = floor( 1/2 height )
tgdMech.hgtSize = [ // ft.
    10,    //0
    15,    //1
    25,    //2
    35,    //3
    50,    //4
    75,    //5
    110,    //6
    165,    //7
    240,   //8
    360,   //9
    540,   //10
    810,   //11
    1200,  //12
    1800   //13
];
    
// step 11 : saving throws
// fort and ref only
// do not include ability scores
tgdMech.fortSave = {
    "steam" : [ 2, 2, 2, 0, 0, 0, 0, 0, -2, -2, -2, -2, -2, -2 ],
    "man"   : [ 0, 0, 0, -2, -2, -2, -2, -2, -4, -4, -4, -4, -4, -4 ],
    "clock" : [ -2, -2, -2, -4, -4, -4, -4, -4, -8, -8, -8, -8, -8, -8 ],
    "animat": [ 0, 0, 0, -2, -2, -2, -2, -2, -4, -4, -4, -4, -4, -4 ],
    "undead": [ 2, 2, 2, 0, 0, 0, 0, 0, -2, -2, -2, -2, -2, -2 ]
};

tgdMech.refSave = {
    "steam" : [ -2, -2, -2, -4, -4, -4, -4, -4, -8, -8, -8, -8, -8, -8 ],
    "man"   : [ -2, -2, -2, -4, -4, -4, -4, -4, -8, -8, -8, -8, -8, -8 ],
    "clock" : [ 2, 2, 2, 0, 0, 0, 0, 0, -2, -2, -2, -2, -2, -2 ],
    "animat": [ 2, 2, 2, 0, 0, 0, 0, 0, -2, -2, -2, -2, -2, -2 ],
    "undead": [ 0, 0, 0, -2, -2, -2, -2, -2, -4, -4, -4, -4, -4, -4 ]
};

// step 12 : ability scores
//
// str
// good array : [ 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70 ]
// mode array : [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66 ]
// bad array  : [ 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62 ]

tgdMech.strScore = {
    "steam" : [ 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70 ],
    "man"   : [ 0, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62 ],
    "clock" : [ 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70 ],
    "animat": [ 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62 ],
    "undead": [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66 ]
};

// dex
// good array : [ 18, 18, 16, 16, 14, 14, 12, 12, 10, 10, 8, 8, 6, 6 ]
// mode array : [ 14, 14, 12, 12, 10, 10, 8,  8,  6,  6,  4, 4, 2, 2 ]
// bad array  : [ 10, 10, 8,  8,  6,  6,  4,  4,  2,  2,  0, 0, 0, 0 ]

tgdMech.strScore = {
    "steam" : [ 10, 10, 8,  8,  6,  6,  4,  4,  2,  2,  0, 0, 0, 0 ],
    "man"   : [ 14, 14, 12, 12, 10, 10, 8,  8,  6,  6,  4, 4, 2, 2 ],
    "clock" : [ 18, 18, 16, 16, 14, 14, 12, 12, 10, 10, 8, 8, 6, 6 ],
    "animat": [ 18, 18, 16, 16, 14, 14, 12, 12, 10, 10, 8, 8, 6, 6 ],
    "undead": [ 14, 14, 12, 12, 10, 10, 8,  8,  6,  6,  4, 4, 2, 2 ]
};

// step 13 : base payload units
// creature PU cost
// med = 1 PU, lrg = 2, hug = 4, ... double each increment after

tgdMech.pU = [  // by size
    3,      //0
    5,      //1
    10,     //2
    16,     //3
    32,     //4
    64,     //5
    128,    //6
    256,    //7
    512,    //8
    1028,   //9
    2056,   //10
    4112,   //11
    8224,   //12
    16448   //13
];

// step 14 : determine # of crew
// % of PU

tgdMech.numCrew = { // %
    "steam" : 25,
    "man"   : 50,
    "clock" : 10,
    "animat": 10,
    "undead": 0 //only one crewman, the controlling necromancer
}

// step 15 : determine PU w/ firing ports
// %% of PU crew with access to ports
tgdMech.firPorts = [ // Firing ports by size
    100,      //0
    100,      //1
    100,     //2
    80,     //3
    65,     //4
    55,     //5
    40,    //6
    30,    //7
    20,    //8
    18,   //9
    16,   //10
    14,   //11
    12,   //12
    10   //13
];

// step 16 : determine 'planning time' (designer only)
tgdMech.craftDC = { // days = (DC * 2) - designer's mechcraft ranks
    "steam" : [ 30, 33, 36, 39, 42, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
    "man"   : [ 24, 28, 32, 36, 41, 46, 51, 56, 61, 66, 73, 81, 89, 99 ],
    "clock" : [ 40, 44, 48, 52, 54, 56, 60, 64, 68, 72, 76, 80, 82, 86 ],
    "animat": [ 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78 ],
    "undead": [ 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78 ]
};

//step 17 : determine labor cost
//
// based on gp : 1/10 gp = 1 silver
tgdMech.laborContribution = {   // daily wage, daily man-hours, qualifications
    "average"       : [ .10, 8, "Any able-bodied laborer" ],
    "above-average" : [ 1, 10, "5+ ranks in Prof(engineer) -or- similar skill"],
    "skilled"       : [ 2, 12, "10+ ranks" ],
    "expert"        : [ 3, 14, "15+ ranks"],
    "zombie/skeleton":[ 0, 12, "Any mindless undead" ], // half productivity but actually work 24h/day
    "construct"     : [ 0, 30, "Any mindless construct" ], // no more than 25% of mech bldg tasks can be filled by constructs
    "overseer"      : [ .30, 8, "Special Leadership score 3+"]
};

// high cost: [ 960, 1920, 3840, 7680, 15360, 30720, 61440, 122880, 245760, 491520, 983040, 1966080, 3932160, 7864320 ]
// med cost : [ 480, 960,  1920, 3840, 7680,  15360, 30720, 61440,  122880, 245760, 491520, 983040,  1966080, 3932160 ]
// low cost : [ 240, 480,  960,  1920, 3840,  7680,  15360, 30720,  61440,  122880, 245760, 491520,  983040,  1966080 ]
tgdMech.laborCost = {   //man hours
    "steam" : [ 480, 960,  1920, 3840, 7680,  15360, 30720, 61440,  122880, 245760, 491520, 983040,  1966080, 3932160 ],
    "man"   : [ 240, 480,  960,  1920, 3840,  7680,  15360, 30720,  61440,  122880, 245760, 491520,  983040,  1966080 ],
    "clock" : [ 960, 1920, 3840, 7680, 15360, 30720, 61440, 122880, 245760, 491520, 983040, 1966080, 3932160, 7864320 ],
    "animat": [ 480, 960,  1920, 3840, 7680,  15360, 30720, 61440,  122880, 245760, 491520, 983040,  1966080, 3932160 ],
    "undead": [ 240, 480,  960,  1920, 3840,  7680,  15360, 30720,  61440,  122880, 245760, 491520,  983040,  1966080 ]
};

// step 18 : determine material cost in gp
// med cost : [ 300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 76800, 153600, 307200, 614400, 1228800, 2457600 ]
tgdMech.matCost = {
    "steam" : [ 300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 76800, 153600, 307200, 614400, 1228800, 2457600 ],
    "man"   : [ 150, 300, 600,  1200, 2400, 4800, 9600,  19200, 38400, 76800,  153600, 307200, 614400,  1228800 ],
    "clock" : [ 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600, 819200, 1638400, 3276800, 6553600 ],
    "animat": [ 300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 76800, 153600, 307200, 614400, 1228800, 2457600 ],
    "undead": [ 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768 ]
};

// step 19 : determine armor cost
tgdMech.armorCost = {
    "flesh"     : [ 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00 ],    //undead only
    "clay"      : [ 5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960 ],
    "wood"      : [ 10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960, 81920 ],
    "bone"      : [ 5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960 ],
    "stone"     : [ 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960, 81920, 163840 ],
    "iron"      : [ 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960, 81920, 163840, 327680 ],
    "steel"     : [ 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600 ],
    "mithral"   : [ 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000, 1024000, 2048000, 4096000, 8192000 ],
    "adamantine": [ 2500, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1280000, 2560000, 5120000, 10240000, 20480000 ]
};

// step 20 : determine base cost
// labor cost + material cost + armor cost

// step 21 : add weapons

// step 22 : special traits and payloads
// additions here modify previous values

// step 23 : add steam powers
// steams powers are base:medium
// applying to mechs tends to scale thme up
tgdMech.steamPwrResize = {
    "small"  : [  ],
    "medium" : [  ],
    "large"  : [  ],
};

// step 24 : incremental improvements ( customize mech stats )

// step 25 : create pilot and gunner

// step 26 : determine init (pilot-based)
// Mech init = mech dex mod + pilot dex mod + pilot feats

// [ 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00 ]