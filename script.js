/*TODO: rework choices to allow selection of non-dependent choices 
* and prevent reset upon selection of 'parent' choices
*/
function choose_nation(nation_id) {
    if(!confirm("Choose nation? This will reset all choices.")) {
        return;
    }
    
    var nation = document.getElementById(nation_id);
    var nations = document.getElementById('nations').getElementsByTagName('div');    
    var children;
    var buttons;
    for(i=0; i<nations.length; i++) {
        nations[i].className = 'nation';
        
        //reset style selection
        reset_styles(nations[i]);        

        children = nations[i].getElementsByTagName('p');
        for(j=2; j<children.length; j++) {
            //disable buttons
            buttons = children[j].getElementsByTagName('button');
            if(buttons.length > 0) {
                buttons[0].disabled = true;
            }
        }
    }
    
    //Set chosen nation as selected
    nation.className += ' nation_' + nation_id;
    document.getElementById("nation_choice").innerHTML = nation_id;
    
    //enable style buttons
    var styles = nation.getElementsByClassName("style");
    for(k=0; k<styles.length; k++) {
        styles[k].children[0].disabled = false;
    }
}

function choose_style(style_id) {
    var nationID = document.getElementById("nation_choice").innerHTML;
    var nation = document.getElementById(nationID);
    
    reset_styles(nation);
    //reset data
    
    //select chosen style
    document.getElementById(style_id).className += " style_selected";   
    document.getElementById("style_choice").innerHTML = style_id;
    
    
    //enable/disable buttons
    var sections = nation.getElementsByTagName("p");
    var style_requirements;
    var tech_requirements;
    for(l=0; l<sections.length; l++) {
        style_requirements = sections[l].getElementsByClassName("style_requirement");
        if(style_requirements.length > 0) {
            //reset buttons
            sections[l].getElementsByTagName("button")[0].disabled = true;
            
            //enable dependent buttons
            //check for style dependency
            if(style_requirements[0].innerHTML.contains(style_id) || style_requirements[0].innerHTML == "none") {
                //check for tech dependency
                tech_requirements = sections[l].getElementsByClassName("basic_requirement")
                if(tech_requirements.length == 0 || tech_requirements[0].innerHTML == "none") {
                    sections[l].getElementsByTagName("button")[0].disabled = false;
                }
            }
        }
    }
}

function choose_basic(basic_id) {
    var nationID = document.getElementById("nation_choice").innerHTML;
    var nation = document.getElementById(nationID);
    
    reset_advanced(nation);
    
    //check status of chosen basic tech
    //if chosen selected
        //unselect
        //reset dependencies
    //else
        //select chosen
        //enable dependencies
}

function reset_styles(nation) {
    var styles = nation.getElementsByClassName("style_selected");
    for(m=0; m<styles.length; m++) {
        styles[m].className = "style";
    }
    document.getElementById("style_choice").innerHTML = "";
    reset_basic(nation);
    reset_special(nation);
}

function reset_basic(nation) {
    var techs = nation.getElementsByClassName("basic_selected");
    for(n=0; n<techs.length; n++) {
        techs[n].className = "basic";
    }
    document.getElementById("basic1_choice").innerHTML = "";
    document.getElementById("basic2_choice").innerHTML = "";
    reset_advanced(nation);
}

function reset_advanced(nation) {
    var techs = nation.getElementsByClassName("advanced_selected");
    for(o=0; o<techs.length; o++) {
        techs[o].className = "advanced";
    }
    document.getElementById("advanced1_choice").innerHTML = "";
    document.getElementById("advanced2_choice").innerHTML = "";
}

function reset_special(nation) {
    //TODO: functionality to reset special techniques
    var specials = nation.getElementsByClassName("special_selected");
    for(p=0; p<specials.length; p++) {
        specials[p].className = "special";
    }
    document.getElementById("special_choice").innerHTML = "";
}