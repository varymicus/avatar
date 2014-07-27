function choose_nation(nation_id, color, style_1, style_2, style_3) {
    var nation = document.getElementById(nation_id);
    nation.style.backgroundColor = color;
    
    nation.getElementsByClassName("nation_desc")[0].style.fontWeight = "bold";
    //enable style buttons
    var styles = nation.getElementsByClassName("style");
    for(i=0; i<styles.length; i++) {
        styles[i].children[0].disabled = false;
    }
}

function choose_style(nation_id, style_id, dependent_id_1, dependent_id_2, dependent_id_3, dependent_id_4) {
    var nation = document.getElementById(nation_id);
    //reset other styles
    var styles = nation.getElementsByClassName("style_selected");
    for(i=0; i<styles.length; i++) {
        styles[i].className = "style";
    }
    
    //select appropriate style
    document.getElementById(style_id).className = "style_selected";
    
    //disable nation selection
    var nations = document.getElementById("nations").getElementsByTagName("div");
    for(i=0; i<nations.length; i++) {
        if(nations[i].id != nation_id) {
            nations[i].className = "nation_disabled";
            nations[i].style.backgroundColor = "#888888";
        }
        nations[i].children[0].disabled = true;
    }
    
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
            if(style_requirements[0].innerHTML == style_id || style_requirements[0].innerHTML == "none") {
                //check tech dependency
                tech_requirements = sections[i].getElementsByClassName("basic_requirement")
                if(tech_requirements.length == 0 || tech_requirements[0].innerHTML == "none") {
                    sections[i].getElementsByTagName("button")[0].disabled = false;
                }
            }
        }
    }
}