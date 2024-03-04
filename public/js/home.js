const myModal = new bootstrap.Modal("#transactions-modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
}


//Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({value: value, type: type, description: description, date: date});

    saveData(data);
    e.target.reset();

    myModal.hide();
    
    getCashIn();
    getCashOut();
    getTotal();
    alert("Lnaçamento adiconado com sucesso!")


});


document.getElementById("button-loggout").addEventListener("click", logout);

document.getElementById("transactions-button").addEventListener("click", function(){

window.location.href = "transactions.html";

});

ckeckLogged();


function ckeckLogged(){

    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
   

}

function logout (){

    sessionStorage.removeItem("logged");
 
    localStorage.removeItem("session");

    window.location.href = "index.html";
}



function getCashIn(){

    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1") ;
    
    if(cashIn.length){

        let cashInHtml = ``;
        let limite = 0;

        if(cashIn.length > 5){
            limite = 5;
        } else {
            limite = cashIn.length;
        }
        
        for (let index = 0; index < limite; index++) {
        	console.log("entrou for");
        	console.log(index);
        	console.log(limite);

            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)} </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-30 d-flex justify-content-end">
                                <p>${cashIn[index].date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}


function getCashOut(){

    const transactions = data.transactions;

    const cashOut = transactions.filter((item) => item.type === "2") ;
    
    if(cashOut.length){

        let cashOutHtml = ``;
        let limite = 0;

        if(cashOut.length > 5){
            limite = 5;
        } else {
            limite = cashOut.length;
        }
        
        for (let index = 0; index < limite; index++) {
        	console.log("entrou for");
        	console.log(index);
        	console.log(limite);

            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)} </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-30 d-flex justify-content-end">
                                <p>${cashOut[index].date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}



function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
    
        if(item.type === "1"){
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`
}


function saveData(data){

    localStorage.setItem(data.login, JSON.stringify(data));
}
