$(document).ready(function(){
    openFavorites()
})

function openFavorites(){
    let xhr = new XMLHttpRequest()
    xhr.open('GET',`http://localhost:3000/api/movies/findAll`, true)   
    xhr.timeout=5000
    xhr.ontimeout=(e)=>onApiError()    
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            if(xhr.status ===200){
                console.log("Success in oppening favorites")
                handlefavorite(JSON.parse(xhr.responseText))
            }else{
                console.log("error in oppening favorites")
            }
        }
    }
            
    xhr.send();
}


function handlefavorite(json){
        let output = "<tr>" + 
                "<th>Τίτλος</th>" +
                "<th>Έτος</th>" +
                "<th>Είδος</th>" +
                "</tr>"

    for (let inputs of json.data){
        output += "<tr>"+
                    "<td>"+ inputs.title + "</td>"+
                    "<td>"+ inputs.year + "</td>" +
                    "<td>"+ inputs.genre + "</td>" +
                    "</tr>"
        }

        $('.table').html(output)
}