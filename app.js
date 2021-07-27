
const stat = document.querySelector("#stat");


window.addEventListener("scroll", () => {
    let nav = document.querySelector("#mainNavbar");
    if (window.pageYOffset > 0) {
        nav.classList.add('scrolled')
    } else {
        nav.classList.remove('scrolled')
    }


})

const url = "https://covid19.mathdro.id/api";

internationalNumberFormat = new Intl.NumberFormat('en-US')



function animateCount(element, end) {
    const duration = 1600;
    let minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / end));

    stepTime = Math.max(stepTime, minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;


    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * end));
        element.innerHTML = internationalNumberFormat.format(value);
        if (value == end) {
            clearInterval(timer);
        }

    }

    timer = setInterval(run, stepTime);
    run();

}
async function set() {
    const data = await fetchData();
    // console.log(data.confirmed.value);

    const dateCurr = new Date(data.lastUpdate).toDateString();
    const timeCurr = new Date(data.lastUpdate).toLocaleTimeString();

    const infect = document.querySelector("#infect h2 span");
    const recover = document.querySelector("#recover h2 span");
    const death = document.querySelector("#death h2 span");
    const active = document.querySelector("#active h2 span");

    const activeval = data.confirmed.value - data.recovered.value - data.deaths.value;

    animateCount(infect, data.confirmed.value);
    animateCount(recover, data.recovered.value);
    animateCount(death, data.deaths.value);
    animateCount(active, activeval);



    const date = document.querySelectorAll(".date");
    const time = document.querySelectorAll(".time");
    for (let i = 0; i < 4; i++) {
        date[i].innerText = dateCurr;
        time[i].innerText = timeCurr;

    }


}

const fetchData = async () => {

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (e) {
        console.log(e);
    }
};



setInterval(set, 300000);


window.addEventListener('scroll', (e) => {
    let hT = stat.offsetTop, hH = stat.offsetHeight, wH = this.innerHeight, wS = this.scrollY;
    if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
        set();
        stat.remove();


    }
})