
<script>
import Selectbox from "./Selectbox.svelte";
import Input from "./Input.svelte";
import ColorButton from "./ColorButton.svelte";
let fonts = ["LeagueMono","LeagueSpartan","Raleway","Secuela","Urbanist"]
let underline = ["unset","underline solid","underline wavy","underline dashed","underline dotted","underline double"]
let weight = ["unset","bold","100","200","300","400","500","600","700","800","900"]

const export_data = () => {
	let pretext = document.querySelector("#text")
	let text = pretext.innerHTML
  	var element = document.createElement("a");
  	element.setAttribute(
    	"href",
    	"data:text/html;charset=utf-8," + encodeURIComponent(text)
  	);
  	element.setAttribute("download","note");
  	element.style.display = "none";
  	document.body.appendChild(element);
  	element.click();
  	document.body.removeChild(element);
}

</script>

<menu class="flex p-2 rounded-xl gap-2 items-center text-white bg-[#ffffff]/5 mx-auto mt-4 mb-0 shadow-md">

	<!--
	<input class="" type="color" oninput="this.style.color = this.value" style="color:#ffffff" value="#ffffff" id="color">
	<input type="color" oninput="this.style.color = this.value" style="color:#ffffff" value="#ffffff" id="background-color">
	<span class="material-icons">brush</span>
	-->
	<ColorButton id="color" value="#ffffff"/>
	<Input id="font-size" ext="px" value="24" type="number" before="title" />
	<Selectbox id="font-weight" value="unset" before="format_bold" options={weight} />
	<Selectbox id="font-family" value="Raleway" before="font_download" options={fonts} />
	<Selectbox id="text-decoration" value="unset" before="format_underlined" options={underline} />
	
	<span on:click={export_data} class="material-icons">save</span>
</menu>

<style>
menu > * {
  border: 1px transparent solid;
  border-radius:0.1em;
}
menu > span {
	padding:0.3em;
	cursor:pointer;
	transition:0.2s;
}

menu > span:hover {
	background-color: rgb(255 255 255 / 5%);
}
</style>