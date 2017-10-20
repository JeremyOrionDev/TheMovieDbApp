// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.

var catId,
    nomCategorie,
    lesCat = new Array(),
    laCat,
    laPhoto,
    resultat=new Array(),
    adress,
    lesFilms = new Array(),
    idPhoto = new Array(),
    idPop = new Array();
var tabPosition = new Array(Location);
var tabPop = new Array();
var $afficher = $('#btn'),
    $list = $('#listCat'),
    $btnRecherche = $('#btnRecherche'),
    $inRecherche = $('#texteRecherche'),
    $listeCat=new Array(),
    $pop = $('#popBtn');
$('#btnFilm').click(function () {
    listerFilms;
});

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    
    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        console.log(catId);
        //$film.click(function () {
        //    console.log("le tableau des pop:: ", tabPop);
        //    console.log("la longueur du tablo pop ", tabPop.length);
        //    for (var i = 0; i < 100; i++) {
        //        //console.log("le resultat: " + i + "  contient le film :", tabPop[i]['original_title']);
        //        if (tabPop[i]['backdrop_path'] === null) {
        //            $('img').css('display', 'none');
        //        } else var laPhoto = "https://image.tmdb.org/t/p/w500/" + tabPop[i]['backdrop_path'];
        //        $('#listFilm').append("<img class='col-6'  id=" + tabPop[i]['id'] + " href='detailsFilms.html?id=" + tabPop[i]['id'] + "' src=" + laPhoto + "  alt=" + tabPop[i]['name'] + " />");
  
        //    }
        //})
        $pop.click(function () {
            afficheFilms();
            
        })

        var $film = $('#btnFilm');
        $film.click(function () {
            alert("bouton film");
            listerFilms;
        });
        $btnRecherche.click(function () {
            var laRecherche = encodeURIComponent($inRecherche.val()).replace(/'/g, "%27");

            rechercheFilm(laRecherche)
        });
        $list.change(function () {
            nomCategorie = $("#listCat option:selected").toString();
            
            console.log("longueur tableau: ",lesCat.length);
            for (var i = 0; i < lesCat.length; i++) {
                console.log("tablo: " + lesCat[i][0]);
                console.log("le nom ",lesCat[i]['name']);
                if (lesCat[i]['name']=== $('#listCat option:selected').text()) {
                    laCat = lesCat[i]['name'];
                    catId = lesCat[i]['id'];
                    console.log("mon id choisi:: ",catId);
                    listerFilms(lesCat[i]['id']);
                    
                }
            }
            console.log(lesCat);
            catId = document.getElementById('listCat').options[document.getElementById('listCat').selectedIndex].value;
            //alert(nomCategorie);
            //alert("le num = ",num);
        });
    };
    (function listerFilms() {
        //alert("fct listerFilms");
        $.ajax({
            url: "https://api.themoviedb.org/3/genre/movie/list?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
                $listeCat.push(data);
            }
        });
        console.log("ma liste de cat",$listeCat);
        for (var i = 0; i < $listeCat.length; i++) {
            $.ajax({
                url: "https://api.themoviedb.org/3/genre/" + $listeCat[i],
                cache: false,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $listeCat.push(data);
                }
            });
        }
    })();
    function recupListFilms() {
        $.ajax({
            url: "http://files.tmdb.org/p/exports/movie_ids_04_28_2017.json.gz",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log("les data de la liste: ", data);

            }
        });
    };
    function filmsCategorie(id) {
        $('#listFilm').empty();
        $.ajax({
            url: "https://api.themoviedb.org/3/genre/" + id + "/movies?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR&include_adult=false&sort_by=created_at.desc",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log("les resultat de la categorie: "+id,data.results);
                resultat.push(data.results);
                console.log("le tableau resultat: ", resultat);
                for (var i = 0; i < resultat.length; i++) {
                    for (var j = 0; j < resultat[i].length; j++) {
                        $('#listFilm').append("<img class='col-4' id='" + resultat[i][j]['id'] + "' src=" + laPhoto + " alt=" + resultat[i][j]['original_title'] + " />");
                        if (resultat[i][j]['poster_path'] !== null) {
                            laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[i][j]['backdrop_path'];
                        }
                        else if (resultat[i][j]['backdrop_path'] !== null) {
                            laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[i][j]['poster_path'];
                        }
                        else $(data[i][j].id).css('display', 'none');

                    }
                }
                console.log("le tableau 0 :", resultat[0][0]['poster_path']);
                for (var i = 0; i < resultat[0]['length']; i++) {
                    var idPhoto = resultat[0][i]['id'];
                    console.log("le nom : ", resultat[0][i]['original_title']);

                }
            }

        });
    }
    function rechercheFilm(nom) {
        var resultat = new Array();
        console.log("le nom :", nom);
        var laPhoto;
        $('#listFilm').empty();
        $.ajax({
            url: "https://api.themoviedb.org/3/search/multi?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR&query=" + encodeURIComponent($('#texteRecherche').val()).replace(/'/g, "%27")+"&page=1&include_adult=false",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
                resultat.push(data.results);
                console.log("le tableau resultat: ", resultat);
                console.log("le tableau 0 :",resultat[0][0]['poster_path']);
                for (var i = 0; i < resultat[0]['length']; i++) {
                    var idPhoto = resultat[0][i]['id'];
                    console.log("le nom : ", resultat[0][i]['original_title']);
                    if (resultat[0][i]['backdrop_path'] !== null) {
                        laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[0][i]['backdrop_path'];
                    }
                    else if (resultat[0][i]['poster_path'] !== null) {
                        laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[0][i]['poster_path'];
                    }
                    else $(data[0][i]['id']).css('display','none');
                    
                    $('#listFilm').append("<img class='col-4' id=" + resultat[0][i]['id'] + " src=" + laPhoto + " alt=" + resultat[0][i]['original_title'] + " />");
                }
            }

        });
        console.log("les resultats: ", resultat);
    }
    (function listeCategories() {
        
        $.ajax({
            url: "https://api.themoviedb.org/3/genre/movie/list?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
      
               
                for (var i = 0; i < data.genres.length; i++) {
                    $('#drop').append("<li type='button' action='"+filmsCategorie(data.genres[i]['id'])+"' id="+data.genres[i]['name']+">" + data.genres[i]['name'] + "</li>");
                }
                }
        });
    })();
    (function test() {
        $.getJSON("https://api.themoviedb.org/3/movie/popular?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US/&page=1", function (data) {
            var expected = ['id', 'original_title', 'backdrop_path', 'poster_path',]
        })
    });
    (function filmPopulaires() {
        for (var i = 0; i < 20; i++) {

            $.ajax({
                url: "https://api.themoviedb.org/3/movie/popular?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US/&page="+i+"",
                cache: false,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    tabPop.push(data.results);
                    
                }
            })
        }
        setTimeout(afficheFilms, 2000);
        
    })();
    function afficheFilms() {
        console.log("le tableau: ", tabPop);
        console.log("la longueur du tableau : ",tabPop.length);
        for (var i = 0; i < tabPop.length; i++) {
            console.log("premiere boucle :: ",tabPop[i][0]['original_title']);
            for (var j = 0; j < tabPop.length; j++) {
                
                //console.log("le film : ",tabPop[i][j]['original_title']);
                //var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[j]['backdrop_path'];
               
                //$('#listFilm').append('<img class="col-4" src="' + iPhoto + '" id="' + tabPop[j]['id'] + '" style="height:80px;" alt="' + tabPop[j]["original_title"] + '" />');
                //if (tabPop[j]['backdrop_path'] == null) {
                //    $(tabPop[j]['id']).css('display', 'none');
                //}


            
                var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[i][j]['backdrop_path'];

                $('#listFilm').append('<img class="col-4" src="' + iPhoto + '" id="' + tabPop[i][j]['id'] + '"alt="' + tabPop[i][j]["original_title"] + '" />');
                //if (tabPop[i][j]['backdrop_path'] == null) {
                //    if (tabPop[i][j]['poster_path']!=null) {
                //        var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[i][j]['poster_path'];
                //    }
                //    $(tabPop[i][j]['id']).css('display', 'none');
                //} var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[i][j]['backdrop_path'];
        }
        }
        
    }
    $('body').on('click', 'img', function () { location = "detailsFilms.html?id=" + this.id });
    $('body').on('click', 'li', function () { filmsCategorie(this.id);})
    function getFilm(id) {
        $.ajax({
            
            url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log("les data du films::", data);
                $('#listFilm').append("<p> " + data.name + "</p>");
            }
        });
    };
    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
        
    };
} )();