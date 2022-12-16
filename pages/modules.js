/*
    Civicamente
    Github: @Matt0550
    License: MIT
*/

let enabledModules = {
    "energie-rinnovabili": {
        "name": "Energie rinnovabili",
        "description": "Energie rinnovabili",
        "files": {
            "introduzione.html": {
                "name": "Introduzione", 
                "description": "Introduzione all'energie rinnovabili"
            },
            "fonti-di-energia.html": {
                "name": "Fonti di energia",
                "description": "Le principali fonti di energia rinnovabile"
            },
            "vantaggi-e-svantaggi.html": {
                "name": "Vantaggi e svantaggi",
                "description": "Vantaggi e svantaggi delle energie rinnovabili"
            },
        }
    },
    "comunita-energetiche": {
        "name": "Le comunità energetiche",
        "description": "Le comunità energetiche",
        "files": {
            "introduzione.html": {
                "name": "Introduzione",
                "description": "Introduzione alle comunità energetiche"
            },
            "obiettivi.html": {
                "name": "Obiettivi",
                "description": "Gli obiettivi delle comunità energetiche"
            },
            "esempio.html": {
                "name": "Esempio",
                "description": "Esempio di una comunità energetica"
            },
            "normative.html": {
                "name": "Normative",
                "description": "Normative sulle comunità energetiche in Italia e in Europa"
            },
        }
    }
}

// For each module in enabledModules create a card element in index
$.each(enabledModules, function(module, pages) {
    // Replace - with _
    module = module.replace(/-/g, "_");

    $("#selectArgumentDiv").append(`
        <div class="card">
            <div class="card-body" id="${module}">
                <h4 class="card-title">${pages["name"]}</h4>
                <i class="fas fa-arrow-right position-absolute top-50 end-0 translate-middle-y"></i>
                <h6 class="text-muted card-subtitle mb-2">${pages["description"]}</h6>
            </div>
        </div>
    `);

    $("#contentCards").append(`
        <div class="card-group" id="contentDiv-${module}" style="display: none !important;"></div>
    `);

    $.each(pages["files"], function(fileName, content) {
        var idName = module + "-" + fileName.replace(".html", "")
        $("#contentDiv-" + module).append(`
            <div class="card">
                <div class="card-body" id="${idName}">
                    <h4 class="card-title">${content["name"]}</h4>
                    <i class="fas fa-arrow-right position-absolute top-50 end-0 translate-middle-y"></i>
                    <h6 class="text-muted card-subtitle mb-2">${content["description"]}</h6>
                </div>
            </div>
        `);

         // When a card is clicked, show the corresponding section
        $("#selectArgumentDiv").on("click", "#" + module, function() {        
            $("#backToSection").fadeIn("fast");
            $("#backToSection").attr("onclick", "backToSection()");
            $("#selectArgumentDiv").fadeOut("fast", function() {
                $("#contentDiv-" + module).fadeIn("fast");
                $("#contentCards").fadeIn("fast");
            });
        });    

        // When a card is clicked, load the corresponding file in the card
        $("#contentDiv-" + module).on("click", "#" + idName, function() {
            $("#loader").fadeIn("fast");
            // Replace _ with - in module name
            module = module.replace(/_/g, "-");
            $('.div-content-card').load("./pages/" + module + "/" + fileName, function(responseTxt, statusTxt, xhr) {
                if(statusTxt == "success") {          
                    $("custom-image").each(function() {
                        var fileName = $(this).attr("file-name");
                        var altText = $(this).attr("alt");
                        var classes = $(this).attr("class");
                        var style = $(this).attr("style");
                    
                        insertImage(fileName, altText, classes, style, this);
                    });
                    
                    $('.card-content').fadeIn()
                    .css({top:1000})
                    .animate({top:70}, 500, function() {
                        $('#card-container').attr('style','display:none !important');
                        $('.footer').hide();
                    });
                    $("#loader").fadeOut("fast");
                }
                if(statusTxt == "error") {
                    $("#loader").fadeOut("fast");
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
                }
            });
        });
    });
});

function backToSection() {
    try {
        // Find the current section using the id of the displayed div (contentDiv + module name)
        var currentModule = $("#contentCards").find(".card-group").filter(function() {
            return $(this).css("display") != "none";
        }).attr("id").split("-")[1];
    } catch (error) {
        // If an error occurs, reload the page to reset the state of the sections
        console.log("Error: " + error);
        location.reload();
    }
    
    $("#contentDiv-" + currentModule).fadeOut("fast", function() {
        $("#selectArgumentDiv").fadeIn("fast");
        $("#backToSection").fadeOut("fast");
        $("#contentCards").hide();
    });
}

function insertImage(fileName, altText, classes, style, element) {
    console.log("Inserting image " + fileName + " with alt text " + altText + " and classes " + classes);
    // In contentCard, find the current section using the id of the displayed div (contentDiv + module name) the class is card-group
    var currentModule = $("#contentCards").find(".card-group").filter(function() {
        return $(this).css("display") != "none";
    }).attr("id").split("-")[1];

    // Replace _ with - in module name
    currentModule = currentModule.replace(/_/g, "-");

    var image = `<img src="./pages/${currentModule}/images/${fileName}" alt="${altText}" class="${classes}" style="${style}">`;
    $(element).replaceWith(image);
}

$("#card-close").click(function() {
    $('.card-content').fadeIn()
        .css({top:70})
        .animate({top:1000}, 300, function() {
        $('.div-content-card').empty();
    });
    $("#card-container").fadeIn("fast",function() {
        $('.footer').fadeIn("fast");
    });
});