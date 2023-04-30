
const btn = document.querySelector(".btn")
const mes = document.querySelector(".select-mes")
const listaLis = document.querySelector(".listas-li")
const saldoConta = document.querySelector(".total")
const Positivo = document.querySelector(".positivo")
const Negativo = document.querySelector(".negativo")


const db = firebase.firestore()


// Adicionar itens ao banco de dados Firebase

btn.addEventListener("click", ()=>{
    const Nome = document.querySelector(".nome1").value
    const Valor = document.querySelector(".valor1").value
    const Rd = document.querySelector(".select-rd").value
    const Mes = document.querySelector(".select-form").value
    

    

    db.collection("Entradas").add({
        Nome: `${Nome}`,
        Valor: `${Rd}${Valor}`,
        Mes: `${Mes}`
    })
    .then((docRef) => {
        location.reload()
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

})

// Ler itens no banco de dados Firebase

db.collection("Entradas").get().then((snapshot)=>{
    const banco = snapshot.docs.reduce((acc, doc)=> {acc + doc.data()
        const{Nome, Valor} = doc.data()
        const li = document.createElement("li")
        // const operator = Valor < 0 ? "-" : "+"
        const CSSClass = Valor < 0 ? "minus": "plus"
        const noOperator = Math.abs(Valor)
        li.classList.add(CSSClass)

        li.innerHTML = `
            ${Nome}
            <span>R$ ${noOperator.toFixed(2)}</span>
        `
        listaLis.append(li)

        return acc
    },"")    
})

db.collection("Entradas").get().then((snapsoma)=> {
    const somatotal = snapsoma.docs.map(doc=> doc.data().Valor)
    const total = somatotal.reduce((acc, value)=> acc+= parseFloat(value), 0)
    const totalNegativo = somatotal.filter(negativo => negativo<0)
        .reduce((acc, value)=> acc+= parseFloat(value), 0)
    const totalPositivo = somatotal.filter(positivo=> positivo>0)
        .reduce((acc, value)=> acc+= parseFloat(value), 0)
    console.log(totalPositivo)

    saldoConta.innerHTML = `<div class="valor-saldo">R$ ${total.toFixed(2)}</div>`
    Positivo.innerHTML = `<div class="receita-valor">R$ ${totalPositivo.toFixed(2)}</div>`
    Negativo.innerHTML = `<div class="despesa-valor">R$ ${Math.abs(totalNegativo).toFixed(2)}</div>`
})




