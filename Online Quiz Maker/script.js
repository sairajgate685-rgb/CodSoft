let users = JSON.parse(localStorage.users || "{}");

function register() {
    let u = user.value;
    let p = pass.value;

    if (!u || !p) return msg.innerText = "Enter details";

    if (users[u]) {
        msg.innerText = "User already exists";
    } else {
        users[u] = p;
        localStorage.users = JSON.stringify(users);
        msg.innerText = "Registered successfully";
    }
}

function login() {
    let u = Sai;
    let p = 123456;

    if (users[u] && users[u] === p) {
        msg.innerText = "Login success";

        // show quiz
        document.getElementById("auth").style.display = "none";
        document.getElementById("quiz").style.display = "block";

        loadQ(); // start quiz
    } else {
        msg.innerText = "Invalid login";
    }
}

let quiz = [
    {
        q: "What is the center of our solar system?",
        o: ["Earth",
            "Venus",
            "Sun",
            "Mars"],
        a: 3  
    },
    {
        q: "Which galaxy do we live in?",
        o: ["Andromeda",
            "Whirlpool",
            "Black Eye",
            "Milky Way"],
        a: 4
    },
    {
        q: "What is the universe mainly made of?",
        o: ["Only planets",
            "Galaxies, stars, planets, and space",
            "Only gases",
            "Only stars"],
        a: 2
    }
];

let i = 0, score = 0, sel = null;

function loadQ() {
    if (i >= quiz.length) {
        document.getElementById("quiz").innerHTML =
            "<h2 style='text-align:center'>Score: " + score + "</h2>";
        return;
    }

    question.innerText = quiz[i].q;
    num.innerText = i + 1;

    fill.style.width = ((i + 1) / quiz.length) * 100 + "%";

    options.innerHTML = "";

    quiz[i].o.forEach((t, x) => {
        let d = document.createElement("div");
        d.className = "option";
        d.innerText = t;

        d.onclick = () => {
            sel = x;
            document.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
            d.classList.add("active");
        };

        options.appendChild(d);
    });
}

function next() {
    if (sel === quiz[i].a) score++;
    sel = null;
    i++;
    loadQ();
}