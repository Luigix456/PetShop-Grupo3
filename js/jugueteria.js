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
        if(elemento.stock <= 4 && elemento.tipo == "Juguete"){ //ACA FILTRAMOS POR CATEGORIA  "Medicamento" o "Juguete"
            cards +=`
            <article class='card-productos'>
                <div class='card-imagen'>
                    <img src="${elemento.imagen}" alt="imagen" class="imgCartas"> 
                </div>
                <div class='card-texto'>
                    <h3 class='nombre-producto'>${elemento.nombre}</h3>
                    <h4><span>¡Ultimas unidades!</span></h4>
                    <p class="price">Costo: $${elemento.precio},00</p>
                </div>
            </article>
            `
        }else if(elemento.stock > 4 && elemento.tipo == "Juguete"){ //ACA TAMBIEN FILTRAMOS POR CATEGORIA
            cards +=`
            <article class='card-productos'>
                <div class='card-imagen'>
                    <img src="${elemento.imagen}" alt="imagen" class="imgCartas"> 
                </div>
                <div class='card-texto'>
                    <h3 class='nombre-producto'>${elemento.nombre}</h3>
                    <p class="price">Costo: $${elemento.precio},00</p>
                </div>
            </article>
            `
        }
    })
    console.log(toDisplay);
    document.querySelector('#jugueteria').innerHTML = cards;
}

document.getElementById("input-text").addEventListener("keyup", inputSearch)

function inputSearch(evento){
    let val = evento.target.value
    console.log(val)
    let productosFiltrados = productos.filter(producto =>producto.nombre.toLowerCase().includes(val.toLowerCase()) && producto.tipo == 'Juguete')
    DisplayProducts(productosFiltrados)
}
