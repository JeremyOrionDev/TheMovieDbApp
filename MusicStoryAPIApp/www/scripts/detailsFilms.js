// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.
var id = getUrlVars()["id"];
console.log("id= ", id);
var movieId;
var listeVideo = new Array();
        var $Retour = $('#retour');
function getUrlVars() {
    var vars = [], hash; // Déclaration d'un tableau vars et d’une variable "hash"

    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); /* split des paramètres après le "?" de l'url ; les chaînes de
        caractères possèdent une méthode split() qui permet de les découper en un tableau,
        en fonction d'un séparateur précisé.*/
    console.log("les hashes", hashes);
    console.log('le hashes length = ', hashes.length);
    for (var i = 0; i < hashes.length; i++) // boucle sur le nombre de paramètres
    {
        console.log('le hash brut ', hashes);
        hash = hashes[i].split('='); // split des paires nom et valeur du paramètre
        console.log('le hash = ', hash);
        console.log("le hash 0 ", hash[0]);
        console.log('le hash 1: ', hash[1]);
        vars.push(hash[0]);
        /* La méthode push() permet d'ajouter un ou plusieurs items à un tableau,
        push() peut recevoir un nombre illimité de paramètres, et chaque paramètre
        représente un item à ajouter à la fin du tableau.
        La méthode unshift() fonctionne comme push(), excepté que les items sont ajoutés
        au début du tableau. Cette méthode n'est pas très fréquente mais peut être utile.
        Les méthodes shift() et pop() retirent respectivement le premier et le dernier
        élément du tableau. */
        vars[hash[0]] = hash[1]; // insertion des valeurs dans le tableau
    }
    return vars; // retourne le tableau de paramètres
};
$Retour.css('border-bottom-right-radius', '100px');
$Retour.css('z-index', '-10');
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);


       
    };
   
    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
    };
})();
(function infoFilm() {
    $.ajax({

        url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR",
        cache: false,
        type: "GET",
        dataType: "json",
        success: function (data) {


            console.log("les data du films::", data);
            $('#listFilm').append("<p class='panel'>" + data.original_title + "</p><img class='col-10' src='https://image.tmdb.org/t/p/w500/" + data.poster_path + "' alt=" + data.original_title + " /><p style='font-size:0.5em'> Synopsis : </br><span style='font-size:0.7em'>" + data.overview + "</span></p><p style='font-size:0.5em'> Sortie :  " + data.release_date + "</p>");
            
        }
    });
    
})();
(function getMovies() {
    $.ajax({

        url: "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-EN",
        cache: false,
        type: "GET",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.results.length; i++) {
                $('#player').append('<iframe class="col-12" id="player" type="text/html" src= "http://www.youtube.com/embed/'+data.results[i].key+'?enablejsapi=1&origin=http://example.com" frameborder= "0" ></iframe >');
            }
            onYouTubePlayerAPIReady;
            console.log('les vides en liste: ',listeVideo);
            console.log("les data pour la video: ",data.results.length);
            console.log("id video::", data.key);

        }
    });
})();
// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: auto,
        width: auto,
        disablekb: 0,
        fs: 1,
        videoId: 'M7lc1UVf-VE'
    });
};
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
};

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
};
function stopVideo() {
    player.stopVideo();
};
