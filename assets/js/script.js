$(document).ready(function() {
    $("#pasaSobre").mouseover(function() {
        $("#imagenCambio").attr("src", "assets/img/sh2.jpg");
    });

    $("#pasaSobre").mouseleave(function() {
        $("#imagenCambio").attr("src", "assets/img/sh1.jpg");
    });

    //fin jquery
});

$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault();

        let valueInput = $("#superHeroInput").val();

        $.ajax({
            type: "GET",
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + valueInput,
            dataType: "json",
            success: function(data) {
                if (data !== null && data !== undefined) {
                    console.log(data);

                    let nombre = data.name;
                    let conexiones = data.connections.relatives;
                    let publicadoPor = data.biography.publisher;
                    let ocupacion = data.work.occupation;
                    let primeraAparicion = data.biography["first-appearance"];
                    let alturaP = data.appearance.height["0"];
                    let alturaCM = data.appearance.height["1"];
                    let pesoL = data.appearance.weight["0"];
                    let pesoK = data.appearance.weight["1"];
                    let alianzas = data.biography.alianses;
                    let imagen = data.image.url

                    $("#superHeroInfo").append(`
                        <h4 class="text-start ms-5">SuperHero Encontrado</h4>
                        <br>
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${imagen}" class="img-fluid rounded-start" alt="SuperHero ${nombre}">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre: ${nombre}</h5>
                                    <p class="card-text fs-6 border" id="small-font">Conexiones: ${conexiones}</p> 
                                    <p class="card-text fs-6 border" id="small-font">Publicado por: ${publicadoPor}</p>
                                    <p class="card-text fs-6 border" id="small-font">Ocupación: ${ocupacion}</p>
                                    <p class="card-text fs-6 border" id="small-font">Primera Aparición: ${primeraAparicion}</p>
                                    <p class="card-text fs-6 border" id="small-font">Altura: ${alturaP} o ${alturaCM}</p> 
                                    <p class="card-text fs-6 border" id="small-font">Peso: ${pesoL} o ${pesoK}</p>
                                    <p class="card-text fs-6 border" id="small-font">Alianzas: ${alianzas}</p>
                                </div>
                            </div>
                        </div>
                    `)

                    let estadisticas = [];

                    for (let key in data.powerstats) {
                        estadisticas.push({ y: data.powerstats[key], name: key })
                    }

                    console.log(estadisticas);

                    var chart = new CanvasJS.Chart("chartContainer", {
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `Estadísticas de Poder para ${nombre}`,
                            fontSize: 20,
                            fontColor: "blue"
                        },
                        legend: {
                            cursor: "pointer",
                            itemclick: explodePie
                        },
                        data: [{
                            type: "pie",
                            showInLegend: true,
                            toolTipContent: "{name}: <strong>{y}</strong>",
                            indexLabel: "{name} - {y}",
                            dataPoints: estadisticas
                        }]
                    });
                    chart.render();


                    function explodePie(e) {
                        if (typeof(e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
                            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
                        } else {
                            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
                        }
                        e.chart.render();

                    }

                }

            }
        });

    });
    //fin jquery
});