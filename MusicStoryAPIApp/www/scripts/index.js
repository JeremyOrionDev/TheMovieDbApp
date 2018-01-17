// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.

/*
INSERT INTO 'lesfilms'.'films'
('adult','backdrop','genre_1','genre_2','genre_3','iD','langue','titre_original','resume','poster','duree','date_sortie','titre_2','video','budget','Production','Pays','recette')
VALUES (<{adult: }>,<{backdrop: }>,<{genre_1: }>,<{genre_2: }>,<{genre_3: }>,<{iD: }>,<{langue: }>,<{titre_original: }>,<{resume: }>,<{poster: }>,<{duree: }>,<{date_sortie: }>,<titre_2: }>,<{video: }>,<{budget: }>,<{Production: }>,<{Pays: }>,<{recette: }>);*/

var db, catId, nomCategorie, lesCat = new Array(), laCat, laPhoto, resultat = new Array(), adress, lesFilms = new Array(), idPhoto = new Array(), idPop = new Array(), tabPosition = new Array(Location), listePop = new Array(),
tabPop = new Array(), $afficher = $('#btn'), $list = $('#listCat'),$btnRecherche = $('#btnRecherche'),$inRecherche = $('#texteRecherche'),$listeCat=new Array(),$pop = $('#popBtn');
$('#btnFilm').click(function () {
    listerFilms;
});
function populateDB(tx) {
    alert("la liste 1" + "\n" + listePop[0][0]);
   
    tx.executeSql('DROP TABLE IF EXISTS film');

    tx.executeSql('CREATE TABLE IF NOT EXISTS film (id unique,adult,backdrop ,genre1,genre2,genre3,langue,titreOriginal,resume,poster,duree,dateSortie,titre2,video,budget,Production,Pays,recette)');

    tx.executeSql('CREATE TABLE IF NOT EXISTS acteur(id unique,birthday,deathday,gender,page, name, placeOfBirth, popularity)');


    tx.executeSql('INSERT INTO film(id,adult,backdrop ,genre1 ,genre2 ,genre3 ,langue ,titreOriginal,resume ,poster ,duree ,dateSortie ,titre2 ,video ,budget ,Production ,Pays ,recette ) VALUES (' + listePop[1]['id'] + ',' + adult + ',' + listePop[1]['backdrop_path'] + ' ,' + listePop[1]['genre_ids'][0] + ' ,' + listePop[1]['genre_ids'][1] + ' ,' + listePop[1]['genre_ids'][2] + ', ,' + listePop[1]['original_title'] + ',' + listePop[1]['overview'] + ',' + listePop[1]['poster_path'] + ', ,' + listePop[1]['release_date'] + ',' + listePop[1]['title'] + ',' + listePop[1]['video'] + ',,,,)');
    for (var i = 0; i < 20; i++) {
        var adult;
        if (data['results'][i]['adult']) { adult = 0 } else adult = 1;
        alert("titre = "+listePop[i]['title']);
        tx.executeSql('INSERT INTO film(id,adult,backdrop ,genre1 ,genre2 ,genre3 ,langue ,titreOriginal,resume ,poster ,duree ,dateSortie ,titre2 ,video ,budget ,Production ,Pays ,recette ) VALUES ('+listePop[i]['id'] + ',' + adult + ',' + listePop[i]['backdrop_path'] + ' ,' + listePop[i]['genre_ids'][0] + ' ,' + listePop[i]['genre_ids'][1] + ' ,' + listePop[i]['genre_ids'][2] + ', ,' + listePop[i]['original_title'] + ',' + listePop[i]['overview'] + ',' + listePop[i]['poster_path'] + ', ,' + listePop[i]['release_date'] + ',' + listePop[i]['title'] + ',' + listePop[i]['video'] + ',,,,)');
    };

};
function chargePop() {

}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
};

function successCB() {
    alert("success!");
};


(function () {
    //try {
    //    db = window.openDatabase("lesFilms", '1.0', "liste ", 5*1024*1025);
    //    db.transaction(populateDb, transaction_error, populateDb_success);

    //} catch (e) {
    //    alert("erreur "+"\n"+ e+"\n"+ e.message);
    //}
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
 




    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        var db = window.openDatabase("Movies", "1.0", "movies databases", 200000);
        $pop.click(function () {
            afficheFilms();            
        })
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/popular?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {

                listePop = data['results'];
                alert("nb " + listePop.length);
            }
        });
        db.transaction(populateDB, errorCB, successCB);
        var $film = $('#btnFilm');
        $film.click(function () {
            listerFilms;
        });
        $btnRecherche.click(function () {
            var laRecherche = encodeURIComponent($inRecherche.val()).replace(/'/g, "%27");

            rechercheFilm(laRecherche)
        });
        
    };

    //function send2Db(tx, film) {
    //    tx.executeSql('INSERT INTO film')
    //}
    //function insert2Db(film) {
    //    db.transaction(send2Db(film), errorCB, successCB);
    //}
    //function filmsCategorie(id) {
    //    $('#listFilm').empty();
    //    $.ajax({
    //        url: "https://api.themoviedb.org/3/genre/" + id + "/movies?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR&include_adult=false&sort_by=created_at.desc",
    //        cache: false,
    //        type: "GET",
    //        dataType: "json",
    //        success: function (data) {
    //            console.log("les resultat de la categorie: "+id,data.results);
    //            resultat.push(data.results);
    //            console.log("le tableau resultat: ", resultat);
    //            for (var i = 0; i < resultat.length; i++) {
    //                for (var j = 0; j < resultat[i].length; j++) {
    //                    $('#listFilm').append("<img class='col-4' id='" + resultat[i][j]['id'] + "' src=" + laPhoto + " alt=" + resultat[i][j]['original_title'] + " />");
    //                    if (resultat[i][j]['poster_path'] !== null) {
    //                        laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[i][j]['backdrop_path'];
    //                    }
    //                    else if (resultat[i][j]['backdrop_path'] !== null) {
    //                        laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[i][j]['poster_path'];
    //                    }
    //                    else $(data[i][j]["id"]).css('display', 'none');

    //                }
    //            }
    //            console.log("le tableau 0 :", resultat[0][0]['poster_path']);
    //            //for (var i = 0; i < resultat[0]['length']; i++) {
    //            //    var idPhoto = resultat[0][i]['id'];
    //            //    console.log("le nom : ", resultat[0][i]['original_title']);

    //            //}
    //        }

    //    });
    //}
    //function rechercheFilm(nom) {
    //    var resultat = new Array();
    //    console.log("le nom :", nom);
    //    var laPhoto;
    //    $('#listFilm').empty();
    //    $.ajax({
    //        url: "https://api.themoviedb.org/3/search/multi?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR&query=" + encodeURIComponent($('#texteRecherche').val()).replace(/'/g, "%27")+"&page=1&include_adult=false",
    //        cache: false,
    //        type: "GET",
    //        dataType: "json",
    //        success: function (data) {
    //            resultat.push(data.results);
    //            console.log("le tableau resultat: ", resultat);
    //            console.log("le tableau 0 :",resultat[0][0]['poster_path']);
    //            for (var i = 0; i < resultat[0]['length']; i++) {
    //                var idPhoto = resultat[0][i]['id'];
    //                console.log("le nom : ", resultat[0][i]['original_title']);
    //                if (resultat[0][i]['backdrop_path'] !== null) {
    //                    laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[0][i]['backdrop_path'];
    //                }
    //                else if (resultat[0][i]['poster_path'] !== null) {
    //                    laPhoto = "https://image.tmdb.org/t/p/w500" + resultat[0][i]['poster_path'];
    //                }
    //                else $(data[0][i]['id']).css('display','none');
                    
    //                $('#listFilm').append("<img class='col-4' id=" + resultat[0][i]['id'] + " src=" + laPhoto + " alt=" + resultat[0][i]['original_title'] + " />");
    //            }
    //        }

    //    });
    //    console.log("les resultats: ", resultat);
    //}
    //(function listeCategories() {
        
    //    $.ajax({
    //        url: "https://api.themoviedb.org/3/genre/movie/list?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US",
    //        cache: false,
    //        type: "GET",
    //        dataType: "json",
    //        success: function (data) {
      
               
    //            for (var i = 0; i < data.genres.length; i++) {
    //                $('#drop').append("<li type='button' action='"+filmsCategorie(data.genres[i]['id'])+"' id="+data.genres[i]['name']+">" + data.genres[i]['name'] + "</li>");
    //            }
    //            }
    //    });
    //})();
    //(function test() {
    //    $.getJSON("https://api.themoviedb.org/3/movie/popular?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US/&page=1", function (data) {
    //        var expected = ['id', 'original_title', 'backdrop_path', 'poster_path',]
    //    })
    //});
    //(function filmPopulaires() {
    //    for (var i = 0; i < 20; i++) {

    //        $.ajax({
    //            url: "https://api.themoviedb.org/3/movie/popular?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US/&page="+i+"",
    //            cache: false,
    //            type: "GET",
    //            dataType: "json",
    //            success: function (data) {
    //                tabPop.push(data.results);
                    
    //            }
    //        })
    //    }
    //    setTimeout(afficheFilms, 2000);
        
    //})();
    //function afficheFilms() {
    //    console.log("le tableau: ", tabPop);
    //    console.log("la longueur du tableau : ",tabPop.length);
    //    for (var i = 0; i < tabPop.length; i++) {
    //        console.log("premiere boucle :: ",tabPop[i][0]['original_title']);
    //        for (var j = 0; j < tabPop.length; j++) {
                
    //            //console.log("le film : ",tabPop[i][j]['original_title']);
    //            //var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[j]['backdrop_path'];
               
    //            //$('#listFilm').append('<img class="col-4" src="' + iPhoto + '" id="' + tabPop[j]['id'] + '" style="height:80px;" alt="' + tabPop[j]["original_title"] + '" />');
    //            //if (tabPop[j]['backdrop_path'] == null) {
    //            //    $(tabPop[j]['id']).css('display', 'none');
    //            //}


            
    //            var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[i][j]['poster_path'];

    //            $('#listFilm').append('<img class="col-4" src="' + iPhoto + '" id="' + tabPop[i][j]['id'] + '"alt="' + tabPop[i][j]["original_title"] + '" />');
    //            //if (tabPop[i][j]['backdrop_path'] == null) {
    //            //    if (tabPop[i][j]['poster_path']!=null) {
    //            //        var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[i][j]['poster_path'];
    //            //    }
    //            //    $(tabPop[i][j]['id']).css('display', 'none');
    //            //} var iPhoto = "https://image.tmdb.org/t/p/w500" + tabPop[i][j]['backdrop_path'];
    //    }
    //    }
        
    //}
    $('body').on('click', 'img', function () { location = "detailsFilms.html?id=" + this.id });
    $('body').on('click', 'li', function () { filmsCategorie(this.id);})
    //function getFilm(id) {
    //    $.ajax({
            
    //        url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=85a1114cc9bcee8c748abdaaade8169a&language=fr-FR",
    //        cache: false,
    //        type: "GET",
    //        dataType: "json",
    //        success: function (data) {
    //            console.log("les data du films::", data);
    //            $('#listFilm').append("<p> " + data.name + "</p>");
    //        }
    //    });
    //};
    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
        
    };
} )();