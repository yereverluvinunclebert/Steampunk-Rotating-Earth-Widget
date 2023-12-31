//===========================================================================
// Globe widget function.js
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================

/*global mainWindow, mainWindowwidthDefault, mainWindowheightDefault, globe,
	globehoffsetDefault, globevoffsetDefault, globewidthDefault, globeheightDefault,
	globetop, globetophoffsetDefault, globetopvoffsetDefault, globetopwidthDefault,
	globetopheightDefault, ring, ringhoffsetDefault, ringvoffsetDefault, ringwidthDefault,
	ringheightDefault, glow, glowhoffsetDefault, glowvoffsetDefault, glowwidthDefault,
	glowheightDefault, supportingBar, supportingBarhoffsetDefault,
	supportingBarvoffsetDefault, supportingBarwidthDefault, supportingBarheightDefault,
	toggle1, toggle1hoffsetDefault,
	toggle1voffsetDefault, toggle1widthDefault, toggle1heightDefault,
	toggle2, toggle2hoffsetDefault,
	toggle2voffsetDefault, toggle2widthDefault, toggle2heightDefault,
	toggle3, toggle3hoffsetDefault,
	toggle3voffsetDefault, toggle3widthDefault, toggle3heightDefault,
	toggle4, toggle4hoffsetDefault,
	toggle4voffsetDefault, toggle4widthDefault, toggle4heightDefault,
	toggle5, toggle5hoffsetDefault,
	toggle5voffsetDefault, toggle5widthDefault, toggle5heightDefault,
	toggle6, toggle6hoffsetDefault,
	toggle6voffsetDefault, toggle6widthDefault, toggle6heightDefault,
	toggle7, toggle7hoffsetDefault,
	toggle7voffsetDefault, toggle7widthDefault, toggle7heightDefault,
	toggleS, toggleShoffsetDefault,
	toggleSvoffsetDefault, toggleSwidthDefault, toggleSheightDefault,
	toggleF, toggleFhoffsetDefault,
	toggleFvoffsetDefault, toggleFwidthDefault, toggleFheightDefault,
	earthTimer, startup, tingingSound
*/

/*properties
	altKey, contextMenuItems, data, debug, earthSizePref, earthTurnPref, event,
	globeCmdPref, hOffset, height, hoffset, interval, onContextMenu,
	onRunCommandInBgComplete, onSelect, open, openFilePref, soundpref, title,
	tooltip, vOffset, value, voffset, widgetTooltip, width
*/

//===================================================================================
// Function to move the main_window onto the main screen
//======================================================================================
function mainScreen() {
	// if the widget is off screen then move into the viewable window
	if (mainWindow.hOffset < 0) {
		mainWindow.hOffset = 10;
	}
	if (mainWindow.vOffset < 32) {
		mainWindow.vOffset = 32; // avoid Mac toolbar
	}
	if (mainWindow.hOffset > screen.width - 50) {
		mainWindow.hOffset = screen.width - mainWindow.width;
	}
	if (mainWindow.vOffset > screen.height - 50) {
		mainWindow.vOffset = screen.height - mainWindow.height; // avoid Mac toolbar
	}
}
//=====================
//End function
//=====================
//===============================
// function to resize all layers
//===============================
function resize() {
	var Scale = Number(preferences.earthSizePref.value) / 100;
	log("Resizing: preferences.earthSizePref.value: " + preferences.earthSizePref.value);
	log("Scale: " + Scale);
	mainWindow.width = mainWindowwidthDefault * Scale;
	mainWindow.height = mainWindowheightDefault * Scale;

	globe.hoffset = globehoffsetDefault * Scale;
	globe.voffset = globevoffsetDefault * Scale;
	globe.width = globewidthDefault * Scale;
	globe.height = globeheightDefault * Scale;

	globetop.hoffset = globetophoffsetDefault * Scale;
	globetop.voffset = globetopvoffsetDefault * Scale;
	globetop.width = globetopwidthDefault * Scale;
	globetop.height = globetopheightDefault * Scale;

	ring.hoffset = ringhoffsetDefault * Scale;
	ring.voffset = ringvoffsetDefault * Scale;
	ring.width = ringwidthDefault * Scale;
	ring.height = ringheightDefault * Scale;

	glow.hoffset = glowhoffsetDefault * Scale;
	glow.voffset = glowvoffsetDefault * Scale;
	glow.width = glowwidthDefault * Scale;
	glow.height = glowheightDefault * Scale;

	supportingBar.hoffset = supportingBarhoffsetDefault * Scale;
	supportingBar.voffset = supportingBarvoffsetDefault * Scale;
	supportingBar.width = supportingBarwidthDefault * Scale;
	supportingBar.height = supportingBarheightDefault * Scale;

	toggle1.hoffset = toggle1hoffsetDefault * Scale;
	toggle1.voffset = toggle1voffsetDefault * Scale;
	toggle1.width = toggle1widthDefault * Scale;
	toggle1.height = toggle1heightDefault * Scale;

	toggle2.hoffset = toggle2hoffsetDefault * Scale;
	toggle2.voffset = toggle2voffsetDefault * Scale;
	toggle2.width = toggle2widthDefault * Scale;
	toggle2.height = toggle2heightDefault * Scale;

	toggle3.hoffset = toggle3hoffsetDefault * Scale;
	toggle3.voffset = toggle3voffsetDefault * Scale;
	toggle3.width = toggle3widthDefault * Scale;
	toggle3.height = toggle3heightDefault * Scale;

	toggle4.hoffset = toggle4hoffsetDefault * Scale;
	toggle4.voffset = toggle4voffsetDefault * Scale;
	toggle4.width = toggle4widthDefault * Scale;
	toggle4.height = toggle4heightDefault * Scale;

	toggle5.hoffset = toggle5hoffsetDefault * Scale;
	toggle5.voffset = toggle5voffsetDefault * Scale;
	toggle5.width = toggle5widthDefault * Scale;
	toggle5.height = toggle5heightDefault * Scale;

	toggle6.hoffset = toggle6hoffsetDefault * Scale;
	toggle6.voffset = toggle6voffsetDefault * Scale;
	toggle6.width = toggle6widthDefault * Scale;
	toggle6.height = toggle6heightDefault * Scale;

	toggle7.hoffset = toggle7hoffsetDefault * Scale;
	toggle7.voffset = toggle7voffsetDefault * Scale;
	toggle7.width = toggle7widthDefault * Scale;
	toggle7.height = toggle7heightDefault * Scale;

	toggleS.hoffset = toggleShoffsetDefault * Scale;
	toggleS.voffset = toggleSvoffsetDefault * Scale;
	toggleS.width = toggleSwidthDefault * Scale;
	toggleS.height = toggleSheightDefault * Scale;

	toggleF.hoffset = toggleFhoffsetDefault * Scale;
	toggleF.voffset = toggleFvoffsetDefault * Scale;
	toggleF.width = toggleFwidthDefault * Scale;
	toggleF.height = toggleFheightDefault * Scale;

}
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function widgethelp() {
	var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://lightquick.co.uk/instructions-for-the-steampunk-rotating-earth-widget.html?Itemid=264");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the URL for paypal
//===========================================
function donate() {
    var answer = alert("Help support the creation of more widgets like this, send us a coffee! This button opens a browser window and connects to the Kofi donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
                openURL("https://www.ko-fi.com/yereverluvinunclebert");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens my Amazon URL wishlist
//===========================================
function amazon() {
	var answer = alert("Help support the creation of more widgets like this. Buy me a small item on my Amazon wishlist! This button opens a browser window and connects to my Amazon wish list page). Will you be kind and proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://www.amazon.co.uk/gp/registry/registry.html?ie=UTF8&id=A3OBFB6ZN4F7&type=wishlist");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the rocketdock URL
//===========================================
function rocketdock() {

	var answer = alert("Log in and vote for my widgets on Rocketdock. This button opens a browser window and connects to the Rocketdock page where you can give the widget a 5 star rating... Will you be kind and proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://rocketdock.com/user/107284/addons/popular");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the download URL
//===========================================
function update() {
	var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://lightquick.co.uk/downloads/steampunk-rotating-earth-widget.html?Itemid=264");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the browser at the contact URL
//===========================================
function contact() {
	var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://lightquick.co.uk/contact.html?Itemid=3");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens other widgets URL
//===========================================
function otherwidgets() {
	var answer = alert("This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://lightquick.co.uk/steampunk-widgets.html?Itemid=264");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function allows a spacer in the menu
//===========================================
function nullfunction() {
	alert("nullfunction");
}
//=====================
//End function
//=====================

//=========================================================================
// this function assigns translations to preference descriptions and titles
//=========================================================================
function setmenu() {
    mainWindow.onContextMenu = function() {
        var items = [], mItem, sItem;
        
        mItem = new MenuItem();
        mItem.title = "Online Help";
        mItem.onSelect = function() {
            widgethelp();
        };
        items.push(mItem);
        
        mItem = new MenuItem();
        mItem.title = "Donate a Coffee with Ko-Fi";
        mItem.onSelect = function() {
            donate();
        };
        items.push(mItem);        
        
        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);        
 
        
        mItem = new MenuItem();
        mItem.title = "See More Steampunk Widgets";
        mItem.onSelect = function() {
            otherwidgets();
        };
        items.push(mItem);    
        
            
            
        mItem = new MenuItem();
        mItem.title = "Download Latest Version";
        mItem.onSelect = function() {
            update();
        };
        items.push(mItem); 
        
                
        mItem = new MenuItem();
        mItem.title = "Contact Support";
        mItem.onSelect = function() {
            contact();
        };
        items.push(mItem); 
        
 
        mItem = new MenuItem();
        mItem.title = "Reveal Widget in Windows Explorer";
        mItem.onSelect = function() {
            findWidget();
        };
         items.push(mItem);
 
        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);
 
        mItem = new MenuItem();
        mItem.title = "Reload Widget (F5)";
        mItem.onSelect = function () {
            reloadWidget();
        };
        items.push(mItem);
    

        if (preferences.imageEditPref.value != "" && debugFlg === "1") {
            mItem = new MenuItem();
            mItem.title = "Edit Widget using " + preferences.imageEditPref.value ;
            mItem.onSelect = function () {
                editWidget();
            };
            items.push(mItem);
        }        

        mItem = new MenuItem();
        mItem.title = "Switch off my functions";
        mItem.onSelect = function () {
            earthTimer.ticking = false;		
        };
        items.push(mItem);
    
        mItem = new MenuItem();
        mItem.title = "Turn all functions ON";
        mItem.onSelect = function () {
              earthTimer.ticking=true;
        };
        items.push(mItem);
            
        mainWindow.contextMenuItems = items;
    };
}
//=====================
//End function
//=====================

//==============================================================
// this function reloads the widget when preferences are changed
//==============================================================
function changePrefs() {
	log("preferences Changed");
	if (preferences.earthTurnPref.value === "Fast") {
		earthTimer.interval = 0.1;
	} else if (preferences.earthTurnPref.value === "Slow") {
		earthTimer.interval = 0.3;
	}

	savePreferences();	// <<<<<<<<<<<<<
	//sleep(1000);
	startup();
	//reloadWidget();
}
//=====================
//End function
//=====================
//==============================================================
// this function reloads the widget when preferences are changed
//==============================================================
function settooltip() {
	if (preferences.widgetTooltip.value !== "") {
		globe.tooltip = preferences.widgetTooltip.value;
	} else {
		if (preferences.globeCmdPref.value === "") {
			globe.tooltip = "Single click to stop me spinning. Double click on me to assign any command line function. Click on the outer ring to move me.";
			glow.tooltip = globe.tooltip;
		} else {
			globe.tooltip = "Current command: " + preferences.globeCmdPref.value;
			glow.tooltip = globe.tooltip;
		}
	}
}
//=====================
//End function
//=====================

//======================================================================================
// Function to perform commands
//======================================================================================
var runningTask;



//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
        //uses the contents of imageEditPref to initiate your default editor
        performCommand("menu");
    //}

}
//=====================
//End function
//=====================


//=====================
// function to carry out a command
//=====================
function performCommand(method) {
    var answer;
    
    if (method === "menu") {
        runCommandInBg(preferences.imageEditPref.value, "runningTask");
    } else {
        print("method "+method);
        if (system.event.altKey) { // filesystem.open() call
            if (preferences.openFilePref.value === "") {
                answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
            filesystem.open(preferences.openFilePref.value);
        } else { 
            if (preferences.imageCmdPref.value === "") {
                answer = alert("This widget has not been assigned a double-click function. You need to open the preferences and enter a run command for this widget. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
                runCommandInBg(preferences.imageCmdPref.value, "runningTask");
        }
    }
}
//=====================
//End function
//=====================

widget.onRunCommandInBgComplete = function () {
	var theTag = system.event.data;
	print("onRunCommandInBgComplete for tag: " + theTag);
	if (theTag === "runningTask") {
		if (widget.debug === "on") {
			print(preferences.globeCmdPref.value + "\n\n" + runningTask);
		} else {
			alert(preferences.globeCmdPref.value + "\n\n" + runningTask);
		}
	}
};

//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 // temporary development version of the widget
    var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
    var alertString = "The widget folder is: \n";
    if (filesystem.itemExists(widgetFullPath)) {
        alertString += system.userWidgetsFolder + " \n\n";
        alertString += "The widget name is: \n";
        alertString += widgetName + ".\n ";

        alert(alertString, "Open the widget's folder?", "No Thanks");

        filesystem.reveal(widgetFullPath);
    } else {
        widgetFullPath = resolvePath(".");   
        filesystem.reveal(widgetFullPath);
        print("widgetFullPath " + widgetFullPath);
    }
}
//=====================
//End function
//=====================