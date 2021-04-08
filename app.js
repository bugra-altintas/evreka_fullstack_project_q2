class Request{
    constructor(){
        this.xhr = new XMLHttpRequest();
    }
    get(url,callback){
        this.xhr.open("GET",url);

        this.xhr.onload = function(){
            if(this.xhr.status == 200){
                callback(null,this.xhr.responseText);
            }
            else{
                callback("Hata",null);
            } 
        }.bind(this);
        this.xhr.send();
    }
}



document.getElementById("ajax").addEventListener("click",create);
function create(){
    const req = new Request();
    req.get("https://www.bloomberght.com/piyasa/intradaydata/dolar",function(err,response){
        const responsej = JSON.parse(response);
        datas = responsej.SeriesData.slice(-10).reverse();
        table = document.getElementById("data");
        table.innerHTML = "";
        datas.forEach(function(data){
            const date = new Date(data[0]);
            const dateformat = date.toLocaleString();
            table.innerHTML += `
            <tr>
                <td>${dateformat}</td>
                <td>${data[1]}</td>
            </tr>
        `
        });
    });
}
create();
