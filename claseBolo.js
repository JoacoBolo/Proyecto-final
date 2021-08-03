class Juego {
    constructor(name, precio, img, obj) {
        this.name = name;
        this.precio = precio;
        this.img = img;
        this.obj = obj;
    }
}

let GTAV = new Juego("Grand Theft Auto V", 1100, "Imgs/gtav.jpg", [{ name: "Grand Theft Auto V", precio: 1100 }]);
let Hitman_3 = new Juego("Hitman 3", 1400, "Imgs/Hitman3.jpeg", [{ name: "Hitman 3", precio: 1400 }]);
let TBI = new Juego("The Binding of Isaac", 900, "Imgs/TBoI.png", [{ name: "The Binding of Isaac", precio: 900 }]);
let ACvalhalla = new Juego("Assassin's Creed Valhalla", 2300, "Imgs/AC-V.jpg", [{ name: "Assassin's Creed Valhalla", precio: 2300 }]);
let Cyberpunk = new Juego("Cyberpunk 2077", 2200, "Imgs/Cybr.jpg", [{ name: "Cyberpunk 2077", precio: 2200 }]);
let Dota2 = new Juego("Dota 2", 0, "Imgs/Dota2.jpg", [{ name: "Dota 2", precio: 0 }]);

$(document).ready(function() {
    console.log("Estoy listo");
    let btnOcuJuegos = $("#btnOcuJuegos");
    btnOcuJuegos.click(function(){
        $("#jqueryid").toggle("slow");
    })
    let btnVerJuegos = $("#btnVerJuegos");
    btnVerJuegos.click(function() {
        Comprar()
        this.disabled = true
    })

    function Comprar() {
        
        compra.map((item) => {
            $("#jqueryid").append(`
              <section id="juego">
              
              <h3>${item.name}</h3>
               <h3> precio: ${item.precio == 0 ? "Gratis" : "$" + item.precio}</h3>
               <img id = "imagen" src = ${item.img}>
               <button id = "BtnComprar" type = "button" onclick = "AgreCarrito(${item.precio})"> comprar </button>
              </section>`
            );
        });
    };

    let btnOcuCarro = $("#btnOcuCarro")
    btnOcuCarro.click(function(){
        $("#card").toggle("slow")
    }) 
    let boton = $("#btnCarrito")
    boton.click(function() {
        carroDOM()
        this.disabled = true
        $("#card > h2").css("display", "block")
    })

});

const local = "json/item.json";

$.getJSON(local, function (rspta, estado){
    if (estado === "success"){
        let datos = rspta
        for (item of datos){
            $("#btnVerJuegos").append(
                `<h3>${item.name}</h3>
                <h3> precio: $${item.precio}</h3>
                <img id = "imagen" src = ${item.img}>`
                
            )
        }
    }
})

let carrito = [];

let compra = [GTAV, Hitman_3, TBI, ACvalhalla, Cyberpunk, Dota2]

let carroJSON = JSON.stringify(carrito);
localStorage.setItem("carrito", carroJSON)

let respuesta = []

function AgreCarrito(dato) {

    if (dato == 1100) {
        carrito.push(GTAV)
    } else if (dato == 1400) {
        carrito.push(Hitman_3)
    } else if (dato == 900) {
        carrito.push(TBI)
    } else if (dato == 2300) {
        carrito.push(ACvalhalla)
    } else if (dato == 2200) {
        carrito.push(Cyberpunk)
    } else if (dato == 0){
        carrito.push(Dota2)   
    }
}

let total = []

function carroDOM() {
    for (item of carrito) {
        $("#card").append(`<div>                    
                                <h2> el juego es ${item.name}: $${item.precio} </h2> 
                              </div>`)
    }

    carrito.map((item) => {
        let precio = item.precio
        total.push(precio)
    });

    var suma = 0
    for (let i = 0; i < total.length; i++) {
        suma += total[i]
    }
    $("#card").append(`<h2> total: $${suma} </h2>`)
    $("#card ").append(`<button id="button-compra" type ="button" onclick= compraAll(${suma})> comprar todo </button>`)
}

function compraAll(suma){
    $("#card").children().hide("slow")
    $("#card").append(`<div>
                        <h2> Su compra se realizo con exito, disfrute de sus juegos </h2>
                        <h2> Ustd pago un total de $${suma} </h2>
                        </div>`)
}