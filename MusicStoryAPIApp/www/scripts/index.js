// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.
var catId;
var nomCategorie;
var lesCat = new Array();
var laCat;
var adress;
var lesFilms = new Array();
var idPhoto = new Array();
var idPop = new Array();
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    
    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        var $afficher = $('#btn'),
            $list = $('#listCat'),
            $pop = $('#popBtn');

        console.log(catId);
        $pop.click(function () {
            filmPopulaires();
        })
        $afficher.click(function () {
            alert('click affiche');
            listerFilms();
        });


        $list.change(function () {
            nomCategorie = $("#listCat option:selected").text();
            
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
    (function listeCategories() {
        console.log("le numero :: ",catId);
        //alert('fct ok');
        $.ajax({
            url: "https://api.themoviedb.org/3/genre/movie/list?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
                lesCat = data.genres;
                //lesCat = data.genres;
                console.log("tableau cat::", lesCat);
                console.log("les genres: ", data.genres[2].name);
                for (var i = 0; i < data.genres.length; i++) {
                    
                    console.log(laCat);
                    var genre = data.genres[i].name;
                    //var adress = "https://image.tmdb.org/t/p/w500/" + data.results[i].backdrop_path;
                    $('#listCat').append($('<option>', { value: i, text: genre.toString() }));
                    //$('#listFilm').append(" <option value="+data.genres[i].name+">"+data.genres[i].name+"</option>");
                }
            
            }
        });
    })();
    function listerFilms(id) {
        //alert("fct listerFilms");
        $.ajax({
            url: "https://api.themoviedb.org/3/genre/" + id + "/movies?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US&include_adult=false&sort_by=created_at.asc",
            cache: false,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log("les data des films::", data);
                console.log("nombre de films trouvés", data.total_results);
                lesFilms = data.object_ids;
                for (var i = 0; i < data.results.length; i++) {
                    console.log("la page 2: ",data.results['page'][2]);
                console.log("les id films", data.results[i]['original_title']);
                    //var leFilm = getFilm(data.object_ids[0][0]);
                }
            }
        });
    };
    function filmPopulaires() {
        for (var j = 0; j < 50; j++) {

            $.ajax({
                url: "https://api.themoviedb.org/3/movie/popular?api_key=85a1114cc9bcee8c748abdaaade8169a&language=en-US/&page="+j,
                cache: false,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("les data des films populaires::", data);
                    console.log("nombre de films trouvés", data.total_results);
                    lesFilms = data.object_ids;
                    for (var i = 0; i < data.results.length; i++) {
                        idPop.push(data.results[i].id);
                            idPhoto.push(data.results[i].id);
                            if (data.results[i].backdrop_path==null) {
                                $('img').css('display', 'none');
                            } else var laPhoto = "https://image.tmdb.org/t/p/w500/" + data.results[i].backdrop_path;
                            console.log("adresse photo: ", laPhoto);
                            $('#listFilm').append("<img class='col-6'  id=" + data.results[i].id + " href='detailsFilms.html?id=" + data.results[i].id + "' src=" + laPhoto + "  alt=" + data.results[i].name + " />");
                            
       


                        //var leFilm = getFilm(data.object_ids[0][0]);
                    }
                    for (var x = 0; x < length; x++) {

                    }
                console.log("les photo : ",idPhoto);
                }
            });

        }
    }
    $('body').on('click', 'img', function () { location="detailsFilms.html?id="+this.id })
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
    }
    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
    };
} )();