let enabledModules = {
    "energie-rinnovabili": {
        "name": "Energie rinnovabili",
        "description": "Energie rinnovabili",
        "files": {
            "introduzione.html": {
                "name": "Introduzione", 
                "description": "Introduzione all'energie rinnovabili"
            },
        }

    },
}

// For each module in enabledModules create a card element in index
$.each(enabledModules, function(module, pages) {
    $("#selectArgumentDiv").append(`
        <div class="card">
            <div class="card-body" id="${module}">
                <h4 class="card-title">${pages["name"]}</h4>
                <i class="fas fa-arrow-right position-absolute top-50 end-0 translate-middle-y"></i>
                <h6 class="text-muted card-subtitle mb-2">${pages["description"]}</h6>
            </div>
        </div>
    `);

    $.each(pages["files"], function(fileName, content) {
        var idName = module + "-" + fileName.replace(".html", "");
        $("#contentDiv").append(`
            <div class="card">
                <div class="card-body" id="${idName}">
                    <h4 class="card-title">${content["name"]}</h4>
                    <iclass="fas fa-arrow-right position-absolute top-50 end-0 translate-middle-y"></i>
                    <h6 class="text-muted card-subtitle mb-2">${content["description"]}</h6>
                </div>
            </div>
        `);

        // When a card is clicked, load the corresponding file in the card
        $("#contentDiv").on("click", "#" + idName, function() {
            $("#loader").fadeIn("fast");
            $('.div-content-card').load("./pages/" + module + "/" + fileName, function() {
            $('.card-content').fadeIn()
                .css({top:1000})
                .animate({top:70}, 500, function() {
                    $('#card-container').attr('style','display:none !important');
                    $('.footer').hide();
                });
                $("#loader").fadeOut("fast");
            });
        });
    });

    // When a card is clicked, show the corresponding section
    $("#selectArgumentDiv").on("click", "#" + module, function() {
        $("#backToSection").fadeIn("fast");
        $("#backToSection").attr("onclick", "backToSection()");
        $("#selectArgumentDiv").fadeOut("fast", function() {
            $("#contentDiv").fadeIn("fast");
        });
    });    
});


function backToSection() {
    $("#contentDiv").fadeOut("fast", function() {
        $("#selectArgumentDiv").fadeIn("fast");
    });
    $("#backToSection").fadeOut("fast");
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