const n1 = document.getElementById("name");
const e2 = document.getElementById("email");
const p1 = document.getElementById("password");
const d1 = document.getElementById("dob");
const t1 = document.getElementById("acceptTerms");
const s1 = document.getElementById("submit");
const h1 = document.getElementById("history");

const date = new Date();
let aE = []

const dV = (gD) => {

    const Ud = gD.split("-").map((d) => Number(d))
    const vdy = (Ud[0] >= (date.getFullYear() - 55) && Ud[0] <= (date.getFullYear() - 18))

    let vdm;
    let vdd;

    if (Ud[0] === date.getFullYear() - 55) {
        vdm = Ud[1] >= (date.getMonth() + 1)
        vdd = Ud[2] >= (date.getDate())
    } else if (Ud[0] === date.getFullYear() - 18) {
        vdm = Ud[1] <= (date.getMonth() + 1)
        vdd = Ud[2] <= (date.getDate())
    } else if (vdy) {
        vdm = true
        vdd = true
    } else {
        vdm = false
        vdd = false
    }

    return vdy && vdm && vdd
}

const cV = (element) => {
    return element.validity.valid
}

const digits = (n) => {
    if (n < 10) {
        return "0" + n
    } else {
        return n
    }
}
const sS = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    aE.push(userData)
    localStorage.setItem('userData', JSON.stringify(aE))
}

const gS = () => {
    aE = JSON.parse(localStorage.getItem("userData"))
    if (aE === null) {
        aE = []
    } else {
        const view = aE.map((entry) => {
            let row = ""
            const aK = Object.keys(entry)

            for (let i = 0; i < aK.length; i++) {
                row += `<td>${entry[aK[i]]}</td>`
            }

            return `<tr>${row}</tr>`
        })
        h1.innerHTML += view.join("\n")
    }
}


s1.addEventListener("click", () => {
    const uda = d1.value

    if (!dV(uda)) {
        d1.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        d1.setCustomValidity("")
    }

    const allValid = cV(n1) && cV(e2) && cV(p1) && cV(d1)

    if (allValid) {
        sS(n1.value, e2.value, p1.value, d1.value, t1.checked)
    }
})

gS()