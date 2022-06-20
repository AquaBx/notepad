<script>
    let styles_params = ["font-size","font-family","text-decoration","font-weight","color"]
	let text_length = 0
    //let pretext = document.querySelector("#text");
    //const range = document.createRange();
    function style(){
    	let data = ""

    	for (let quer of styles_params){
    		let value = document.querySelector("#" + quer).getAttribute("value")
    		if (value != undefined){
    			data += quer + ":" + value + ";"
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

    const input = (e) => {
    	let sel = window.getSelection()
        let brs = document.querySelectorAll("#text > br")

        for (let br of brs){
            br.remove()
        }
		
		let nlen = e.target.innerText.length
		if (nlen < text_length){}
    	else if (sel.isCollapsed){
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
    			let pos = sel.baseOffset
    			let text1 = text.slice(0,pos-1)
    			let text2 = text.slice(pos-1,pos)
    			let text3 = text.slice(pos,text.length)

    			const span1 = create_span(old_style,text1) // ancien style
    			const span2 = create_span(stylify,text2) // nouveau style
            
    			ppnod.insertBefore(span2,pnod)
    			ppnod.insertBefore(span1,span2)

    			if (text3){
    				nod.data = text3
    			}
    			else{
    				pnod.remove()
    			}
    		}
    	}
		text_length = nlen
    }
    
    document.querySelector("img").onmousedown = (e) => {
  	let parent = e.target.parentNode
  	let x = e.x;
  	let y = e.y;
  	let posY = parent.offsetTop;
  	let posX = parent.offsetLeft;
  	document.onmousemove = (e) => {
    		parent.style.top = (posY - y + e.clientY).toString() + "px";
    		parent.style.left = (posX - x + e.clientX).toString() + "px";
  	};
	};

	document.onmouseup = (e) => {
  document.onmousemove = null;
};

</script>

<pre class="mx-auto mt-4 mb-0 rounded-3xl bg-[#ffffff]/5 shadow-md whitespace-pre-wrap" contenteditable="true" id="text" on:input={input}></pre>

<style>


pre {
	height:calc(100vh - 2rem - 58px);
	width: clamp(100px, calc(100% - 4em) ,900px);
	padding : 3em 1.5em 0.5em 1.5em;
	overflow:auto;
	border-bottom-left-radius : 0;
	border-bottom-right-radius : 0;
}

pre:focus{
	outline:none;
}
</style>
