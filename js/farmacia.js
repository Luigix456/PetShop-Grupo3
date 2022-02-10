var productos = [];
var tipo = [];

async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then(response => response.json())
    .then(json => productos.push(...json.response))
    tipo = [... new Set(productos.map((o) => o.tipo))];
    console.log(productos);
    console.log(tipo);
    DisplayProducts(productos);
}
getData();

function DisplayProducts(productos){
    let toDisplay = [];
    let cards = "";
    toDisplay = productos;
    toDisplay.map(elemento =>{
        if(elemento.stock <= 4 && elemento.tipo == "Medicamento"){ //ACA FILTRAMOS POR CATEGORIA  "Medicamento" o "Juguete"
            cards +=`
            <article>
                <img src="${elemento.imagen}" alt="imagen" class="imgCartas"> 
                <h3>${elemento.nombre}</h3>
                <h4><span>!Ultimas unidades¡</span></h4>
                <p class="price">Costo: $${elemento.precio},00</p>
            </article>
            `
        }else if(elemento.stock > 4 && elemento.tipo == "Medicamento"){ //ACA TAMBIEN FILTRAMOS POR CATEGORIA
            cards +=`
            <article>
                <img src="${elemento.imagen}" alt="imagen" class="imgCartas"> 
                <h3>${elemento.nombre}</h3>
                <p class="price">Costo: $${elemento.precio},00</p>
            </article>
            `
        }
    })
    console.log(toDisplay);
    document.querySelector('#farmacia').innerHTML = cards;
}
