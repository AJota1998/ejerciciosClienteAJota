let xhr;
let resultados = document.getElementById("resultados");
let v_json = [];


window.onload = () => {
	document
		.getElementById("carga_vehiculo")
		.addEventListener("click", cargar_vehiculos_xml);

	document
		.getElementById("registrar_envio")
		.addEventListener("click", registrar_envio_fetch);
};


function cargar_vehiculos_xml() {
	console.log("cargar_vehiculos_xml");

	if (XMLHttpRequest) {
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = comprobar_estado;
		xhr.open("GET", "vehiculos.json");
		xhr.send();
	}
}


function comprobar_estado() {
	console.log("comprobar_estado");

	if (xhr.readyState === 4 && xhr.status === 200) {
		resultados.innerHTML = "Datos desde XML cargados";
		console.log(JSON.parse(xhr.responseText));
		let vehiculos = JSON.parse(xhr.responseText);

        filtrar(vehiculos);
        insertar_vehiculos_fetch(filtrar(vehiculos));
	}
}


function filtrar(vehiculos) {
    console.log("filtrar_para_pintar");

    v_json = [];
	vehiculos.forEach((vehiculo) => {
			let vehiculo_json = {
				id: vehiculo.id,
				name: vehiculo.name,
                description: vehiculo.description,
                vehicle_class: vehiculo.vehicle_class
			};
			v_json.push(vehiculo_json);
	});
	console.log(v_json);
    pintartabla(v_json);

    return v_json;    
}


function pintartabla(v_json) {
    console.log("pintartabla")

	let div_tabla = document.getElementById("div_tabla");
	div_tabla.innerHTML = "";

	let tabla = document.createElement("table");
	tabla.setAttribute("style", "border-collapse: collapse; text-align: center");
	let tr = document.createElement("tr");

	let rotulos = [
		"ID",
		"NAME",
		"DESCRIPTION",
		"VEHICLE CLASS",
		"ENVIAR",
	];

	rotulos.forEach((rotulo) => {
		let th = document.createElement("th");
		th.setAttribute("style", "border: solid 2px");
		th.appendChild(document.createTextNode(rotulo));
		tr.appendChild(th);
	});
	tabla.appendChild(tr);

	v_json.forEach((vehiculo) => {

		let tr = document.createElement("tr");
		for (const item in vehiculo) {
			let td = document.createElement("td");
			td.setAttribute("style", "border: solid 2px");
			td.appendChild(document.createTextNode(vehiculo[item]));
			tr.appendChild(td);
		}

        let td_input = document.createElement("td");
		td_input.setAttribute("style", "border: solid 2px");

        let tipo_input = document.createElement("input");
        tipo_input.setAttribute("type", "checkbox");
		tipo_input.setAttribute("id", vehiculo.id);

        td_input.appendChild(tipo_input);
        tr.appendChild(td_input);
        
		tabla.appendChild(tr);
	});

	div_tabla.appendChild(tabla);
}


function insertar_vehiculos_fetch(vehiculos) {
    console.log("insertar_vehiculos_fetch")
    console.log(vehiculos);

    fetch("insertar_vehiculos.php", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(vehiculos),
	})
		.then((response) => {
			if (response.ok) return response.json();
            
		})
		.then((data) => {
			console.log(data);
            resultados.innerHTML = data.resultado;
		});
}


function registrar_envio_fetch() {
    console.log("registrar_envio_fetch")

    let vehiculos_seleccionados = [];
	
	let vehiculos = document.querySelectorAll("input[type='checkbox']:checked");
	console.log(vehiculos);

	let vehiculo1 = document.getElementById("4e09b023-f650-4747-9ab9-eacf14540cfb").checked;
	let vehiculo2 = document.getElementById("d8f893b5-1dd9-41a1-9918-0099c1aa2de8").checked;
	let vehiculo3 = document.getElementById("923d70c9-8f15-4972-ad53-0128b261d628").checked;

	(vehiculo1) ? vehiculos_seleccionados.push("4e09b023-f650-4747-9ab9-eacf14540cfb") : "";
	(vehiculo2) ? vehiculos_seleccionados.push("d8f893b5-1dd9-41a1-9918-0099c1aa2de8") : "";
	(vehiculo3) ? vehiculos_seleccionados.push("923d70c9-8f15-4972-ad53-0128b261d628") : "";
	
    empleado = {
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        vehiculos: vehiculos_seleccionados  
    }

	console.log(empleado);

	fetch("registrar_envio.php", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(empleado),
	})
		.then((response) => {
			if (response.ok) return response.json();
            
		})
		.then((data) => {
			console.log(data);
            resultados.innerHTML = data.resultado;
		});
}
