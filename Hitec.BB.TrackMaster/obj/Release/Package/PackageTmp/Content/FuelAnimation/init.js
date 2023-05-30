////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////
/*!
* 
* DOCUMENT READY
* 
*/
$(function () {
    //main wine animation
    $('#wineHolder').wineAnimation({
      //  image: '../../Content/FuelAnimation/img4.png',
        wineColour: '#6F0000',
        wineColourTop: '#AB0000',
        wineStartY: 480,
        wineHeight: 372,
        wineLevel: 70,
        maskPath: [{ x: 110, y: 481 }, { x: 132, y: 476 }, { x: 131, y: 461 }, { x: 131, y: 321 }, { x: 132, y: 185 }, { x: 126, y: 165 }, { x: 109, y: 153 }, { x: 95, y: 144 }, { x: 97, y: 108 }, { x: 77, y: 109 }, { x: 55, y: 109 }, { x: 54, y: 144 }, { x: 41, y: 154 }, { x: 24, y: 163 }, { x: 22, y: 180 }, { x: 21, y: 364 }, { x: 22, y: 462 }, { x: 22, y: 483 }, { x: 42, y: 482 }, ],
        swirlLoop: true
    });

    //main glasses animation
    $('#glassesHolder').wineAnimation({
        //image: '../../Content/FuelAnimation/Glassy.png',
        wineColour: '#6F0000',
        wineColourTop: '#AB0000',
        wineStartY: 662,
        wineHeight: 633,
        wineWidth: 650,
        wineLevel: 35,
        maskPath: [{ x: 550, y: 550 }, { x: 550, y: 358 }, { x: 550, y: 334 }, { x: 550, y: 315 }, { x: 550, y: 288 }, { x: 550, y: 255 }, { x: 550, y: 225 }, { x: 550, y: 225 }, { x: 550, y: 227 }, { x: 550, y: 260 }, { x: 550, y: 290 }, { x: 550, y: 312 }, { x: 30, y: 330 }, { x: 38, y: 347 }, { x: 57, y: 358 }, ],
        //swirlLoop: true
    });

    //sub wine and glasses animation
    $('#subWineHolder1').wineAnimation({
        image: 'assets/bottle3_highlight.png',
        backgroundImage: 'assets/bottle3.png',
        wineColour: '#E98607',
        wineColourTop: '#E9AF57',
        wineStartY: 232,
        wineHeight: 156,
        wineWidth: 100,
        wineLevel: 70,
        maskPath: [{ x: 84, y: 209 }, { x: 87, y: 182 }, { x: 92, y: 145 }, { x: 97, y: 123 }, { x: 84, y: 111 }, { x: 67, y: 101 }, { x: 65, y: 77 }, { x: 51, y: 79 }, { x: 39, y: 77 }, { x: 31, y: 99 }, { x: 17, y: 107 }, { x: 6, y: 121 }, { x: 10, y: 143 }, { x: 14, y: 180 }, { x: 16, y: 207 }, { x: 13, y: 234 }, { x: 23, y: 232 }, { x: 53, y: 234 }, { x: 74, y: 231 }, { x: 87, y: 233 }, { x: 85, y: 211 }, ]
    });

    $('#subGlassesHolder1').wineAnimation({
        image: 'assets/glasses3_highlight.png',
        backgroundImage: 'assets/glasses3.png',
        wineColour: '#E98607',
        wineColourTop: '#E9AF57',
        wineStartY: 229,
        wineHeight: 56,
        wineWidth: 54,
        wineLevel: 70,
        maskPath: [{ x: 76, y: 227 }, { x: 74, y: 202 }, { x: 75, y: 174 }, { x: 51, y: 175 }, { x: 27, y: 174 }, { x: 26, y: 205 }, { x: 25, y: 226 }],
        swirlLoop: true,
        swirlSpeed: 700
    });

    $('#subWineHolder2').wineAnimation({
        image: 'assets/bottle2_highlight.png',
        backgroundImage: 'assets/bottle2.png',
        wineColour: '#e8f2f7',
        wineColourTop: '#FFFFFF',
        wineStartY: 232,
        wineHeight: 156,
        wineWidth: 100,
        wineLevel: 70,
        maskPath: [{ x: 88, y: 199 }, { x: 87, y: 170 }, { x: 86, y: 128 }, { x: 91, y: 110 }, { x: 79, y: 97 }, { x: 63, y: 89 }, { x: 65, y: 65 }, { x: 51, y: 61 }, { x: 40, y: 64 }, { x: 39, y: 88 }, { x: 24, y: 99 }, { x: 16, y: 110 }, { x: 18, y: 129 }, { x: 14, y: 180 }, { x: 16, y: 207 }, { x: 13, y: 234 }, { x: 23, y: 232 }, { x: 53, y: 234 }, { x: 74, y: 231 }, { x: 87, y: 233 }, { x: 87, y: 214 }, ]
    });

    $('#subGlassesHolder2').wineAnimation({
        image: 'assets/glasses2_highlight.png',
        backgroundImage: 'assets/glasses2.png',
        wineColour: '#e8f2f7',
        wineColourTop: '#FFFFFF',
        wineStartY: 181,
        wineHeight: 64,
        wineWidth: 57,
        wineLevel: 70,
        maskPath: [{ x: 81, y: 156 }, { x: 88, y: 137 }, { x: 74, y: 113 }, { x: 50, y: 114 }, { x: 29, y: 112 }, { x: 19, y: 131 }, { x: 20, y: 153 }, { x: 28, y: 182 }, { x: 52, y: 180 }, { x: 76, y: 181 }, { x: 82, y: 155 }, ],
        swirlLoop: true,
        swirlSpeed: 800
    });

    $('#subWineHolder3').wineAnimation({
        image: 'assets/bottle1_highlight.png',
        backgroundImage: 'assets/bottle1.png',
        wineColour: '#D6D2AB',
        wineColourTop: '#F5EEC3',
        wineStartY: 232,
        wineHeight: 156,
        wineWidth: 100,
        wineLevel: 70,
        maskPath: [{ x: 82, y: 193 }, { x: 81, y: 165 }, { x: 80, y: 101 }, { x: 83, y: 89 }, { x: 73, y: 74 }, { x: 61, y: 68 }, { x: 63, y: 48 }, { x: 51, y: 51 }, { x: 42, y: 50 }, { x: 43, y: 69 }, { x: 32, y: 72 }, { x: 20, y: 85 }, { x: 24, y: 97 }, { x: 24, y: 156 }, { x: 24, y: 218 }, { x: 23, y: 233 }, { x: 38, y: 231 }, { x: 51, y: 232 }, { x: 70, y: 231 }, { x: 83, y: 227 }, { x: 82, y: 218 }, ]
    });

    $('#subGlassesHolder3').wineAnimation({
        image: 'assets/glasses1_highlight.png',
        backgroundImage: 'assets/glasses1.png',
        wineColour: '#D6D2AB',
        wineColourTop: '#F5EEC3',
        wineStartY: 181,
        wineHeight: 64,
        wineWidth: 57,
        wineLevel: 70,
        maskPath: [{ x: 76, y: 147 }, { x: 80, y: 127 }, { x: 69, y: 100 }, { x: 52, y: 101 }, { x: 34, y: 100 }, { x: 23, y: 112 }, { x: 25, y: 142 }, { x: 29, y: 169 }, { x: 51, y: 175 }, { x: 72, y: 167 }, { x: 74, y: 152 }, ],
        swirlLoop: true,
        swirlSpeed: 900
    });

    //edit marking shape
    $('#editWineHolder').wineAnimation({
        image: 'assets/wine_bottle.png',
        wineColour: '#330606',
        wineStartY: 480,
        wineHeight: 372,
        wineLevel: 70,
        maskPath: [{ x: 110, y: 481 }, { x: 132, y: 476 }, { x: 131, y: 461 }, { x: 131, y: 321 }, { x: 132, y: 185 }, { x: 126, y: 165 }, { x: 109, y: 153 }, { x: 95, y: 144 }, { x: 97, y: 108 }, { x: 77, y: 109 }, { x: 55, y: 109 }, { x: 54, y: 144 }, { x: 41, y: 154 }, { x: 24, y: 163 }, { x: 22, y: 180 }, { x: 21, y: 364 }, { x: 22, y: 462 }, { x: 22, y: 483 }, { x: 42, y: 482 }, ],
        edit: true
    });

    //buttons
    var wineLevel = 70;
    $('#fillMore').click(function () {
        wineLevel += 5;
        wineLevel = wineLevel > 100 ? 10 : wineLevel;
        $('#wineHolder').wineAnimation('update', 'wineLevel', wineLevel);
        $('#glassesHolder').wineAnimation('update', 'wineLevel', wineLevel);
    });

    $('#empty').click(function () {
        wineLevel = 0;
        $('#wineHolder').wineAnimation('update', 'wineLevel', wineLevel);
        $('#glassesHolder').wineAnimation('update', 'wineLevel', wineLevel);
    });

    $('#full').click(function () {
        wineLevel = 100;
        $('#wineHolder').wineAnimation('update', 'wineLevel', wineLevel);
        $('#glassesHolder').wineAnimation('update', 'wineLevel', wineLevel);
    });

    var swirlCon = true;
    $('#swirl').click(function () {
        if (swirlCon) {
            swirlCon = false;
            $('#glassesHolder').wineAnimation('update', 'swirlLoop', false);
        } else {
            swirlCon = true;
            $('#glassesHolder').wineAnimation('update', 'swirlLoop', true);
        }
    });

    $('#refill').click(function () {
        $('#subWineHolder1').wineAnimation('update', 'wineLevelStatic', 0);
        $('#subGlassesHolder1').wineAnimation('update', 'wineLevelStatic', 0);
        $('#subWineHolder2').wineAnimation('update', 'wineLevelStatic', 0);
        $('#subGlassesHolder2').wineAnimation('update', 'wineLevelStatic', 0);
        $('#subWineHolder3').wineAnimation('update', 'wineLevelStatic', 0);
        $('#subGlassesHolder3').wineAnimation('update', 'wineLevelStatic', 0);

        $('#subWineHolder1').wineAnimation('update', 'wineLevel', 60);
        $('#subGlassesHolder1').wineAnimation('update', 'wineLevel', 80);
        $('#subWineHolder2').wineAnimation('update', 'wineLevel', 50);
        $('#subGlassesHolder2').wineAnimation('update', 'wineLevel', 70);
        $('#subWineHolder3').wineAnimation('update', 'wineLevel', 90);
        $('#subGlassesHolder3').wineAnimation('update', 'wineLevel', 100);
    });

    $('#addPoint').click(function () {
        $('#editWineHolder').wineAnimation('addPoint');
    });

    $('#removePoint').click(function () {
        $('#editWineHolder').wineAnimation('removePoint');
    });

    $('#outputPoint').click(function () {
        $('#editWineHolder').wineAnimation('outputPoint');
    });
});