/*TODO: rework choices to allow selection of non-dependent choices 
* and prevent reset upon selection of 'parent' choices
*/
"use strict";

function reset_advanced(nation) {
    var techs = nation.getElementsByClassName("advanced_selected"),
        i;
    for (i = 0; i < techs.length; i++) {
        techs[i].className = "advanced";
    }
    document.getElementById("advanced1_choice").innerHTML = "";
    document.getElementById("advanced2_choice").innerHTML = "";
}

function reset_basic(nation) {
    var techs = nation.getElementsByClassName("basic_selected"),
        i;
    for (i = 0; i < techs.length; i++) {
        techs[i].className = "basic";
    }
    document.getElementById("basic1_choice").innerHTML = "";
    document.getElementById("basic2_choice").innerHTML = "";
    reset_advanced(nation);
}

function reset_special(nation) {
    //TODO: functionality to reset special techniques
    var specials = nation.getElementsByClassName("special_selected"),
        i;
    for (i = 0; i < specials.length; i++) {
        specials[i].className = "special";
    }
    document.getElementById("special_choice").innerHTML = "";
}

function reset_styles(nation) {
    var styles = nation.getElementsByClassName("style_selected"),
        i;
    for (i = 0; i < styles.length; i++) {
        styles[i].className = "style";
    }
    document.getElementById("style_choice").innerHTML = "";
    reset_basic(nation);
    reset_special(nation);
}

function choose_nation(nation_id) {
    if (!window.confirm("Choose nation? This will reset all choices.")) {
        return;
    }
    var nation = document.getElementById(nation_id),
        nations = document.getElementById('nations').getElementsByTagName('div'),
        children,
        buttons,
        i,
        j,
        styles;
    for (i = 0; i < nations.length; i++) {
        nations[i].className = 'nation';
        //reset style selection
        reset_styles(nations[i]);
        children = nations[i].getElementsByTagName('p');
        for (j = 2; j < children.length; j++) {
            //disable buttons
            buttons = children[j].getElementsByTagName('button');
            if (buttons.length > 0) {
                buttons[0].disabled = true;
            }
        }
    }
    //Set chosen nation as selected
    nation.className += ' nation_' + nation_id;
    document.getElementById("nation_choice").innerHTML = nation_id;
    //enable style buttons
    styles = nation.getElementsByClassName("style");
    for (i = 0; i < styles.length; i++) {
        styles[i].children[0].disabled = false;
    }
}

function choose_style(style_id) {
    var nationID = document.getElementById("nation_choice").innerHTML,
        nation = document.getElementById(nationID),
        sections = nation.getElementsByTagName("p"),
        style_requirements,
        tech_requirements,
        i;
    reset_styles(nation);
    //select chosen style
    document.getElementById(style_id).className += " style_selected";
    document.getElementById("style_choice").innerHTML = style_id;
    //enable/disable buttons
    for (i = 0; i < sections.length; i++) {
        style_requirements = sections[i].getElementsByClassName("style_requirement");
        if (style_requirements.length > 0) {
            //reset buttons
            sections[i].getElementsByTagName("button")[0].disabled = true;
            //enable dependent buttons
            //check for style dependency
            if (style_requirements[0].innerHTML.contains(style_id) || style_requirements[0].innerHTML === "none") {
                //check for tech dependency
                tech_requirements = sections[i].getElementsByClassName("basic_requirement");
                if (tech_requirements.length === 0 || tech_requirements[0].innerHTML === "none") {
                    sections[i].getElementsByTagName("button")[0].disabled = false;
                }
            }
        }
    }
}

function choose_basic(basic_id) {
    var nationID = document.getElementById("nation_choice").innerHTML,
        nation = document.getElementById(nationID);
    reset_advanced(nation);
    //check status of chosen basic tech
    //if chosen selected
        //unselect
        //reset dependencies
    //else
        //select chosen
        //enable dependencies
}