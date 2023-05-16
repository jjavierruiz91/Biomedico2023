$(document).ready(function () {//FUNCION INICIAL;
    
    Get_Data(LlenarCampos, '/Deportista/GetDeportistaPorSexo');
  


});


function LlenarCampos(data) {
    let Hombres = data.filter(w => w.Genero == "MASCULINO")
    let Mujeres = data.filter(w => w.Genero == "FEMENINO")

    let CantHombre = Hombres.length;
    let CantMujeres = Mujeres.length;

    var doughnutData = {
        labels: ["MUJERES", "HOMBRES"],
        datasets: [{
            data: [CantMujeres, CantHombre],
            backgroundColor: ["#a3e1d4", "#dedede"]
        }]
    };


    var doughnutOptions = {
        responsive: true
    };


    var ctx4 = document.getElementById("doughnutChart").getContext("2d");
    new Chart(ctx4, { type: 'doughnut', data: doughnutData, options: doughnutOptions });
}

