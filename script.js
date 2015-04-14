/*TODO: rework choices to allow selection of non-dependent choices 
* and prevent reset upon selection of 'parent' choices
*/
function choose_nation(nation_id) {
    if(!confirm("Choose nation? This will reset all choices.")) {
        return;
    }
    
    var nation = document.getElementById(nation_id);
    var nations = document.getElementById('nations').getElementsByTagName('div');
    for(i=0; i<nations.length; i++) {
        nations[i].className = 'nation';
        var children = nations[i].getElementsByTagName('p');
        for(j=2; j<children.length; j++) {
           //reset style selection
            /*if(children[j].className.contains("style_selected")) {
                children[j].className = "style";
            }*/
            reset_styles(nations[i]);
            //TODO: reset cascading choices (basic, advanced, special)
            //reset_basic();
            //reset_special();
            //disable buttons
            if(children[j].getElementsByTagName('button').length > 0) {
                children[j].getElementsByTagName('button')[0].disabled = true;
            }
        }
    }
    
    //Set chosen nation as selected
    nation.className += ' nation_' + nation_id;
    document.getElementById("nation_choice").innerHTML = nation_id;
    
    //enable style buttons
    var styles = nation.getElementsByClassName("style");
    for(i=0; i<styles.length; i++) {
        styles[i].children[0].disabled = false;
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
    for(i=0; i<sections.length; i++) {
        style_requirements = sections[i].getElementsByClassName("style_requirement");
        if(style_requirements.length > 0) {
            //reset buttons
            sections[i].getElementsByTagName("button")[0].disabled = true;
            
            //enable dependent buttons
            //check for style dependency
            if(style_requirements[0].innerHTML == style_id || style_requirements[0].innerHTML == "none") {
                //check for tech dependency
                tech_requirements = sections[i].getElementsByClassName("basic_requirement")
                if(tech_requirements.length == 0 || tech_requirements[0].innerHTML == "none") {
                    sections[i].getElementsByTagName("button")[0].disabled = false;
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
    for(i=0; i<styles.length; i++) {
        styles[i].className = "style";
    }
    document.getElementById("style_choice").innerHTML = "";
    reset_basic(nation);
    reset_special(nation);
}

function reset_basic(nation) {
    var techs = nation.getElementsByClassName("basic_selected");
    for(i=0; i<techs.length; i++) {
        techs[i].className = "basic";
    }
    document.getElementById("basic1_choice").innerHTML = "";
    document.getElementById("basic2_choice").innerHTML = "";
    reset_advanced();
}

function reset_advanced(nation) {
    var techs = nation.getElementsByClassName("advanced_selected");
    for(i=0; i<techs.length; i++) {
        techs[i].className = "advanced";
    }
    document.getElementById("advanced1_choice").innerHTML = "";
    document.getElementById("advanced2_choice").innerHTML = "";
}

function reset_special(nation) {
    //TODO: functionality to reset special techniques
    var specials = nation.getElementsByClassName("special_selected");
    for(i=0; i<specials.length; i++) {
        specials[i].className = "special";
    }
    document.getElementById("special_choice").innerHTML = "";
}