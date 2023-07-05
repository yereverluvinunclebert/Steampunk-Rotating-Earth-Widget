//===========================================================================
// Globe widget globe.js
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================

/*global mainWindow, mainWindowwidthDefault:true, mainWindowheightDefault:true, globe,
	globehoffsetDefault:true, globevoffsetDefault:true, globewidthDefault:true, globeheightDefault:true,
	globetop, globetophoffsetDefault:true, globetopvoffsetDefault:true, globetopwidthDefault:true,
	globetopheightDefault:true, ring, ringhoffsetDefault:true, ringvoffsetDefault:true, ringwidthDefault:true,
	ringheightDefault:true, glow, glowhoffsetDefault:true, glowvoffsetDefault:true, glowwidthDefault:true,
	glowheightDefault:true, supportingBar, supportingBarhoffsetDefault:true,
	supportingBarvoffsetDefault:true, supportingBarwidthDefault:true, supportingBarheightDefault:true,
	toggle1, toggle1hoffsetDefault:true,
	toggle1voffsetDefault:true, toggle1widthDefault:true, toggle1heightDefault:true,
	toggle2, toggle2hoffsetDefault:true,
	toggle2voffsetDefault:true, toggle2widthDefault:true, toggle2heightDefault:true,
	toggle3, toggle3hoffsetDefault:true,
	toggle3voffsetDefault:true, toggle3widthDefault:true, toggle3heightDefault:true,
	toggle4, toggle4hoffsetDefault:true,
	toggle4voffsetDefault:true, toggle4widthDefault:true, toggle4heightDefault:true,
	toggle5, toggle5hoffsetDefault:true,
	toggle5voffsetDefault:true, toggle5widthDefault:true, toggle5heightDefault:true,
	toggle6, toggle6hoffsetDefault:true,
	toggle6voffsetDefault:true, toggle6widthDefault:true, toggle6heightDefault:true,
	toggle7, toggle7hoffsetDefault:true,
	toggle7voffsetDefault:true, toggle7widthDefault:true, toggle7heightDefault:true,
	toggleS, toggleShoffsetDefault:true,
	toggleSvoffsetDefault:true, toggleSwidthDefault:true, toggleSheightDefault:true,
	toggleF, toggleFhoffsetDefault:true,
	toggleFvoffsetDefault:true, toggleFwidthDefault:true, toggleFheightDefault:true,
	earthTimer, tingingSound:true, mainScreen, buildVitality, resize, setmenu, settooltip
*/

/*properties
	earthSizePref, earthTurnPref, height, hoffset, interval, onClick, sizebar,
	soundpref, src, ticking, value, visible, voffset, width
*/

//resizing variables
var mainWindowwidthDefault = mainWindow.width;
var mainWindowheightDefault = mainWindow.height;
//preferences.earthSizePref.value = 100;

var globehoffsetDefault = globe.hoffset;
var globevoffsetDefault = globe.voffset;
var globewidthDefault = globe.width;
var globeheightDefault = globe.height;

var globetophoffsetDefault = globetop.hoffset;
var globetopvoffsetDefault = globetop.voffset;
var globetopwidthDefault = globetop.width;
var globetopheightDefault = globetop.height;

var ringhoffsetDefault = ring.hoffset;
var ringvoffsetDefault = ring.voffset;
var ringwidthDefault = ring.width;
var ringheightDefault = ring.height;

var glowhoffsetDefault = glow.hoffset;
var glowvoffsetDefault = glow.voffset;
var glowwidthDefault = glow.width;
var glowheightDefault = glow.height;

var supportingBarhoffsetDefault = supportingBar.hoffset;
var supportingBarvoffsetDefault = supportingBar.voffset;
var supportingBarwidthDefault = supportingBar.width;
var supportingBarheightDefault = supportingBar.height;

var toggle1hoffsetDefault = toggle1.hoffset;
var toggle1voffsetDefault = toggle1.voffset;
var toggle1widthDefault = toggle1.width;
var toggle1heightDefault = toggle1.height;

var toggle2hoffsetDefault = toggle2.hoffset;
var toggle2voffsetDefault = toggle2.voffset;
var toggle2widthDefault = toggle2.width;
var toggle2heightDefault = toggle2.height;

var toggle3hoffsetDefault = toggle3.hoffset;
var toggle3voffsetDefault = toggle3.voffset;
var toggle3widthDefault = toggle3.width;
var toggle3heightDefault = toggle3.height;

var toggle4hoffsetDefault = toggle4.hoffset;
var toggle4voffsetDefault = toggle4.voffset;
var toggle4widthDefault = toggle4.width;
var toggle4heightDefault = toggle4.height;

var toggle5hoffsetDefault = toggle5.hoffset;
var toggle5voffsetDefault = toggle5.voffset;
var toggle5widthDefault = toggle5.width;
var toggle5heightDefault = toggle5.height;

var toggle6hoffsetDefault = toggle6.hoffset;
var toggle6voffsetDefault = toggle6.voffset;
var toggle6widthDefault = toggle6.width;
var toggle6heightDefault = toggle6.height;

var toggle7hoffsetDefault = toggle7.hoffset;
var toggle7voffsetDefault = toggle7.voffset;
var toggle7widthDefault = toggle7.width;
var toggle7heightDefault = toggle7.height;

var toggleFhoffsetDefault = toggleF.hoffset;
var toggleFvoffsetDefault = toggleF.voffset;
var toggleFwidthDefault = toggleF.width;
var toggleFheightDefault = toggleF.height;

var toggleShoffsetDefault = toggleS.hoffset;
var toggleSvoffsetDefault = toggleS.voffset;
var toggleSwidthDefault = toggleS.width;
var toggleSheightDefault = toggleS.height;

var tingingSound = "Resources/ting.mp3";
var suck = "Resources/suck.mp3";
var newclunk = "Resources/newclunk.mp3";
var steamsound = "Resources/steamsound.mp3";
var electricDrone = "Resources/electricdrone.mp3";

var currIcon = "Resources/icon.png";

var widgetName = "globe.widget";

var earthFrame = 1;
var earthBaseName;

earthBaseName = "globe/Earth-spinning_";

if (preferences.earthTurnPref.value === "Fast") {
	earthTimer.interval = 0.1;
} else if (preferences.earthTurnPref.value === "Slow") {
	earthTimer.interval = 0.3;
}
globe.src = earthBaseName + earthFrame + ".png";

var debugFlg = "";
//===========================================
// this function runs on startup
//===========================================
function startup() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
        preferences.imageEditPref.hidden=false;
        preferences.imageCmdPref.hidden=false;
    } else {
        preferences.imageEditPref.hidden=true;		
        preferences.imageCmdPref.hidden=true;
    }		

    mainScreen();
    buildVitality(currIcon);
    resize();
    onEarthLoad();
    setmenu();
    settooltip();
    mainWindow.visible = true;
}
//=====================
//End function
//=====================


//=====================
// the earth is loaded, spin speed selected, globe timer activated and size bar enabled/disabled
//=====================
function onEarthLoad() {
	earthBaseName = "globe/Earth-spinning_";
	if (preferences.earthTurnPref.value === "Fast") {
		earthTimer.interval = 0.1;
	} else if (preferences.earthTurnPref.value === "Slow") {
		earthTimer.interval = 0.3;
	}
	globe.src = earthBaseName + earthFrame + ".png";
	earthTimer.ticking = true;
	if (preferences.sizebar.value === "enable") {
		supportingBar.visible = true;
		toggle1.visible = true;
		toggle2.visible = true;
		toggle3.visible = true;
		toggle4.visible = true;
		toggle5.visible = true;
		toggle6.visible = true;
		toggle7.visible = true;
	} else {
		supportingBar.visible = false;
		toggle1.visible = false;
		toggle2.visible = false;
		toggle3.visible = false;
		toggle4.visible = false;
		toggle5.visible = false;
		toggle6.visible = false;
		toggle7.visible = false;
	}
}
//=====================
//End function
//=====================


//=====================
// Turn the earth by selecting the next frame
//=====================
function earthTurn() {
	globe.src = earthBaseName + earthFrame + ".png";
	if (earthFrame >= 35) {
		earthFrame = 1;
	} else {
		earthFrame = earthFrame + 1;
	}
}
//=====================
//End function
//=====================
//=====================
//when the globe is clicked it stop/start the globe rotation
//=====================
globe.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(tingingSound, false);
	}
	if (earthTimer.ticking) {
		earthTimer.ticking = false;
	} else {
		earthTimer.ticking = true;
	}
};
//=====================
//when the 1 toggle is clicked it show in full size
//=====================
toggle1.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(steamsound, false);
	}
	preferences.earthSizePref.value = 100;
	resize();
};
//=====================
//when the 2 toggle is clicked it decrease size by 10%
//=====================
toggle2.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(steamsound, false);
	}
	preferences.earthSizePref.value = 90;
	resize();
};
//=====================
//when the 3 toggle is clicked it decrease size by 20%
//=====================
toggle3.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(steamsound, false);
	}
	preferences.earthSizePref.value = 80;
	resize();
};
//=====================
//when the 4 toggle is clicked it decrease size by 30%
//=====================
toggle4.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(steamsound, false);
	}
	preferences.earthSizePref.value = 70;
	resize();
};
//=====================
//when the 5 toggle is clicked it decrease size by 40%
//=====================
toggle5.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(steamsound, false);
	}
	preferences.earthSizePref.value = 60;
	resize();
};
//=====================
//when the 6 toggle is clicked it decrease size by 50%
//=====================
toggle6.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(steamsound, false);
	}
	preferences.earthSizePref.value = 50;
	resize();
};
//=====================
//when the globe is double-clicked it
//=====================
toggle7.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(steamsound, false);
	}
	preferences.earthSizePref.value = 40;
	resize();
};
//=====================
//when the F toggle is clicked turn the globe fast
//=====================
toggleF.onClick = function () {
	preferences.earthTurnPref.value = "Fast";
	earthTimer.interval = 0.1;
	earthTimer.ticking = true;
	if (preferences.soundpref.value === "enable") {
		play(electricDrone, false);
	}
};
//=====================
//when the S toggle is clicked turn the globe slow
//=====================
toggleS.onClick = function () {
	preferences.earthTurnPref.value = "Slow";
	earthTimer.interval = 0.3;
	earthTimer.ticking = true;
	if (preferences.soundpref.value === "enable") {
		play(newclunk, false);
	}
};
//=====================
//when the supporting bar is clicked bar disappears
//=====================
supportingBar.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(suck, false);
	}
	preferences.sizebar.value = "disable";
	supportingBar.visible = false;
	toggle1.visible = false;
	toggle2.visible = false;
	toggle3.visible = false;
	toggle4.visible = false;
	toggle5.visible = false;
	toggle6.visible = false;
	toggle7.visible = false;
};
//=====================
//when the supporting bar is clicked bar disappears
//=====================
globetop.onClick = function () {
	if (preferences.soundpref.value === "enable") {
		play(suck, false);
	}
	preferences.sizebar.value = "enable";
	supportingBar.visible = true;
	toggle1.visible = true;
	toggle2.visible = true;
	toggle3.visible = true;
	toggle4.visible = true;
	toggle5.visible = true;
	toggle6.visible = true;
	toggle7.visible = true;
};
//=====================
//End function
//=====================

//======================================================================================
//End globe.js
//======================================================================================
