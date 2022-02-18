let styles_params = document.querySelectorAll("menu input");
let pretext = document.querySelector("#text");
const range = document.createRange();

document.querySelector("#font-weight").onclick = (e) => {
	e = e.target
	if (e.checked){
		e.style.background = "rgb(255 255 255 / 0.1)"
	}
	else{
		e.style.background = ""
	}	
}

document.querySelector("#text-decoration").onclick = (e) => {
	e = e.target
	if (e.checked){
		e.style.background = "rgb(255 255 255 / 0.1)"
	}
	else{
		e.style.background = ""
	}	
}

function style(){
	let data = ""

	for (let quer of styles_params){
		let id = quer.id
		let value = document.querySelector("#" + id).value
		if (value == "on"){
			if (document.querySelector("#" + id).checked){
				value = document.querySelector("#" + id).getAttribute("evalue")
			}
		}
		if (value != undefined){
			data += id + ":" + value + ";"
		}
	}

	return data
}

function create_span(style,text=""){
	const span = document.createElement('span');
	span.setAttribute("style",style)
	span.innerText = text
	return span
}

pretext.oninput = (e) => {
	let sel = window.getSelection()
    let brs = document.querySelectorAll("#text > br")

    for (let br of brs){
        br.remove()
    }

    
	if (sel.isCollapsed){
		let nod = sel.baseNode // Le texte
		let pnod = nod.parentNode // Le node du texte
		let ppnod = pnod.parentNode // Le parent du node

		let old_style = pnod.getAttribute("style")
		let stylify = style()

		if (nod.innerText == "" || nod.innerText == "\n"){}
		else if (pnod.nodeName == "PRE" || ppnod.nodeName == "FONT"){
			const div = document.createElement('div');
			let text = nod.data
			const span = create_span(stylify, text)
			
			div.appendChild(span)
            if (ppnod.nodeName == "FONT"){
                ppnod.insertBefore(div,pnod)
                ppnod.remove()
            }
            else{
                pnod.insertBefore(div,nod)
                nod.remove()
            }
		}
		else if (pnod.nodeName == "DIV"){
			let text = nod.data
			const span = create_span(stylify, text)

			pnod.insertBefore(span,nod)
			nod.remove()
		}
		else if (old_style != stylify){
			let text = nod.data
			let text1 = text.slice(0,text.length-1)
			let text2 = text.slice(text.length-1,text.length)

			const span1 = create_span(old_style,text1) // ancien style
			const span2 = create_span(stylify,text2) // nouveau style
			
			ppnod.insertBefore(span2,pnod)
			ppnod.insertBefore(span1,span2)

			pnod.remove()
		}
	}
}