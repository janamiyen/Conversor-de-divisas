const APIKEY = "f46704315f9dcee29d13d696";

const listaDesplegable = document.querySelectorAll(".lista-desplegable select");
obtenerBtn = document.querySelector("form button");
deLaMoneda = document.querySelector(".de select");
aLaMoneda = document.querySelector(".a select");


for (let i = 0; i < listaDesplegable.length; i++){
    for (lista_monedas in lista_paises){
        let selected;
        if(i == 0){
            selected = lista_monedas == "ARS" ? "selected" : "";
        }else if(i == 1){
            selected = lista_monedas == "USD" ? "selected" : "";
        }
        let optionTag = `<option value="${lista_monedas}" ${selected}>${lista_monedas}</option>`;
        listaDesplegable[i].insertAdjacentHTML("beforeend", optionTag);
    }
    listaDesplegable[i].addEventListener("change", e =>{
        mostrarBandera(e.target);
    });
}

function mostrarBandera(element){
    for(paises in lista_paises){
        if(paises == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://www.countryflagsapi.com/png/${lista_paises[paises]}`
        }
    }
}

window.addEventListener("load", () => {
    obtenerBtnIntercambio();
});

obtenerBtn.addEventListener("click", e => {
    e.preventDefault();
    obtenerBtnIntercambio();
});

const conversorIcon = document.querySelector(".lista-desplegable .icon");
conversorIcon.addEventListener("click", () => {
    let temp = deLaMoneda.value;
    deLaMoneda.value = aLaMoneda.value
    aLaMoneda.value = temp;
    mostrarBandera(deLaMoneda);
    mostrarBandera(aLaMoneda);
    obtenerBtnIntercambio();
})

function obtenerBtnIntercambio(){
    const monto = document.querySelector(".monto input");
    conversionTxt = document.querySelector(".exchange-rate");
    let montoVal = monto.value;
    if(montoVal == "" || montoVal == "0"){
        monto.value = "1";
        montoVal = 1;
    }
    conversionTxt.innerText ="Esperando resultado..."

    let url = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${deLaMoneda.value}`;

    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result.conversion_rates);
        let tipoDeCambio = result.conversion_rates[aLaMoneda.value];
        let cambioTotal = (montoVal * tipoDeCambio).toFixed(2);
        const conversionTxt = document.querySelector(".exchange-rate");
        conversionTxt.innerText = `${montoVal} ${deLaMoneda.value} = ${cambioTotal} ${aLaMoneda.value}`;
    }).catch(() => {
        conversionTxt.innerText ="Algo salio mal";
    });
}