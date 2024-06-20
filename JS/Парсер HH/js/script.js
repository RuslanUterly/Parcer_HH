//https://api.hh.ru/vacancies?text=net&experience=noExperience&page=${i}&per_page=20
const fetchData = async () => {
    let data = [];

    for(let i = 0; i < 23; i++) {
        const url = `https://api.hh.ru/vacancies`;
        params = new URLSearchParams({
            text: "net",
            experience: "noExperience",
            page: i,
            per_page: 20,
        });
        
        try {
            const response = await fetch(`${url}?${params}`);
            data.push(await response.json());
        }
        catch (err) {
            console.error(err);
        }
    }
    return data;
};
    
const GetTechnologies = async () => {
    const data = await fetchData();

    let technologies = [];
    for(let item of data) {
        technologies.push(item.items.map(obj => {
            return {
                snippets: obj.snippet,
        }}))
    }

    return technologies;
};

const processRequirements = (requirement) => {
    const keywordsMap = [
        { id: "net",        keyword: ["net", "c#"] },
        { id: "oop",        keyword: ["ооп", "solid"] },
        { id: "mvc",        keyword: ["asp.net mvc"] },
        { id: "webApi",     keyword: ["asp.net webapi", "asp.net web api", "webapi", "web api"] },
        { id: "sql",        keyword: ["sql"] },
        { id: "entity",     keyword: ["entity"] },
        { id: "ado",        keyword: ["ado"] },
        { id: "unit",       keyword: ["тест", "unit"] },
        { id: "htmlcss",    keyword: ["html", "css"] },
        { id: "boot",       keyword: ["bootstrap"] },
        { id: "jquery",     keyword: ["jquery"] },
        { id: "js",         keyword: ["javascript", "js"] },
        { id: "ts",         keyword: ["typescript", "ts"] },
        { id: "react",      keyword: ["react"] },
        { id: "angular",    keyword: ["angular"] },
        { id: "vue",        keyword: ["vue"]},
        { id: "pattern",    keyword: ["паттерн"] },
        { id: "docker",     keyword: ["docker"] },
        { id: "algoritm",   keyword: ["алгоритм"] },
        { id: "git",        keyword: ["git", "контроля"] }
    ]

    for (let item of keywordsMap) {
        if (item.keyword.some(keyword => requirement.includes(keyword))) {
          document.getElementById(item.id).innerText++;
        }
      }
}

(async () => {
    const technologies = await GetTechnologies();
    for(let technology of technologies) {
        technology.forEach(req => {
            let data = req.snippets.requirement;
            if(data != null) {
                processRequirements(data.toLowerCase());
            }
        })
    }
})();