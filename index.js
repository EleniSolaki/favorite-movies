$(document).ready(function(){
    let debounceTimeout = null
    $('#searchInput').on('input', function(){
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(()=> getMovie(this.value.trim()),1500)
    })

    $('.show-more').on('click',function(e){
        e.preventDefault()
        onShowMoreClicked()     
    })


    $('#favoriteLink').on('click',function(){
        addToFavorites()
    })

})

function addToFavorites(){
    let xhr = new XMLHttpRequest()
    xhr.timeout=5000
    xhr.ontimeout=(e)=>onApiError()
    const title= 'title='+movieApiResponse.Title
    const year= 'year='+movieApiResponse.Year
    const genre= 'genre='+movieApiResponse.Genre
    const params = title +"&"+ year +"&"+ genre
            
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            if(xhr.status ===200){
                console.log("Success in adding to favorites")
            }else{
                console.log("error in adding to favorites")
            }
        }
    }
    xhr.open('POST',`http://localhost:3000/api/movies/create`, true)
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')            
    xhr.send(params);

}

function getMovie(title){
    if(!title){
        return
    }
    onBeforeSend()
    fetchMovieFromApi(title)
}

function fetchMovieFromApi(title){
    let xhr = new XMLHttpRequest()
    xhr.open('GET',`http://www.omdbapi.com/?t=${title}&apikey=1b98c9ac`, true)
    xhr.timeout=5000
    xhr.ontimeout=(e)=>onApiError()
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            if(xhr.status ===200){
                handleResults(JSON.parse(xhr.responseText))
            }else{
                onApiError()
            }
        }
    }
    xhr.send()
}

function handleResults(results){
    if(results.Response==='True'){
        movieApiResponse= results
        let transformed = transformedResponse(results)
        buildMovie(transformed)
    }else if(results.Response==='False'){
        hideComponent('#waiting')
        showNotFound()
    }
}

function buildMovie(apiResponse){
    if(apiResponse.poster){
        $('#image').attr('src', apiResponse.poster).on('load', function(){
            buildMovieMetaData(apiResponse,$(this))
        })
    }else{
        buildMovieMetaData(apiResponse)
    }
}

function onBeforeSend(){
    showComponent('#waiting')
    hideComponent('.movie')
    hideNotFound()
    hideError()
    collapsePlot()
    hideExtras()
}

function onApiError(){
    hideComponent('#waiting')
    showError()
}

function buildMovieMetaData(apiResponse, imageTag){
    hideComponent('#waiting')
    handleImage(imageTag)
    handleLiterals(apiResponse)
    showComponent('.movie')
}

function handleImage(imageTag){
    imageTag ? $('#image').replaceWith(imageTag) : $('#image').removeAttr('src')
}

function handleLiterals(apiResponse){
    $('.movie').find('[id]').each((index,item)=>{
        if($(item).is('a')){
            $(item).attr('href',apiResponse[item.id])
        }else{
            let valueElement = $(item).children('span')
            let metadataValue = apiResponse[item.id] ? apiResponse[item.id] : '-'
            valueElement.length ? valueElement.text(metadataValue) : $(item).text(metadataValue)
        }
    })
}

function transformedResponse(apiResponse){
    let camelCaseKeyResponse = camelCaseKeys(apiResponse)
    clearNotAvailableInfo(camelCaseKeyResponse)
    buildImdbLink(camelCaseKeyResponse)
    return camelCaseKeyResponse
}

function camelCaseKeys(apiResponse){
    return _.mapKeys(apiResponse,(v,k)=> _.camelCase(k))
}

function buildImdbLink(apiResponse){
    if(apiResponse.imdbId !== 'N/A'){
        apiResponse.imdbId = `https://www.imdb.com/title/${apiResponse.imdbId}/`
    }
}

function clearNotAvailableInfo(apiResponse){
    for (let key in apiResponse){
        if(apiResponse.hasOwnProperty(key)&& apiResponse[key]==='N/A'){
            apiResponse[key]=''
        }
    }
}

function onShowMoreClicked(){
    
    $('#plot').toggleClass('expanded')
    if($('.extended').is(':visible')){
        $('.extended').hide(500)
    }else{
        $('.extended').show(500)
    }
}

function hideComponent(jQuerySelector){
    return $(jQuerySelector).addClass('hidden')
}

function showComponent(jQuerySelector){
    return $(jQuerySelector).removeClass('hidden')
}
function showNotFound(){
    $('.not-found').clone().removeClass('hidden').appendTo($('.center'))
}
function showError(){
    $('.error').clone().removeClass('hidden').appendTo$('.center')
}
function hideNotFound(){
    $('.center').find('.not-found').remove()
}
function hideError(){
    $('.center').find('.error').remove()
}
function  hideExtras(){
    $('.extended').hide()
}
function collapsePlot(){
    $('#plot').removeClass('expanded')
}

