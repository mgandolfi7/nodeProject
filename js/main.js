document.querySelector("#startGame").addEventListener("click", makeReq)

async function makeReq() {
    const choice = document.querySelector("#choice").value.toLowerCase();
    const res = await fetch(`/api?choice=${choice}`)
    const data = await res.json()

    console.log(data);
}