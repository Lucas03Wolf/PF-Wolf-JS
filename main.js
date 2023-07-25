function caluladoraCuotas(){
    let monto = prompt("Ingrese el monto a pagar")
    let cuotas = prompt("Ingrese el numero de cuotas")
    let cuotaBase = monto / cuotas;

    if(!isNaN(monto) && monto != null && monto != "" && !isNaN(cuotas) && cuotas != null && cuotas != ""){
        if(cuotas <= 24){
            for (let i = 1; i <= cuotas; i++) {
                let recargo = i * 0.1
                let resultado = cuotaBase + (recargo * cuotaBase);  
                alert(`Tu cuota #${i} es de $${resultado}`);
            }
        }else{
            alert(`Las cuotas deben ser menores a 24`)
        }
    }else{
        alert(`Los datos ingresados no son validos`)
    }
}

caluladoraCuotas()