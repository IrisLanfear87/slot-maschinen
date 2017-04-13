var startDugme = $('.start_dugme').eq(0);
var autoplayDugme = $('.autoplay_dugme').eq(0);
var prviDiv = $('.prvi_Div').eq(0);
 // ovo je niz divova, svaki div sa klasom 'slike_Div' div je prvi child div u svakom 'wrapp' divu, drugi je div zvani 'naslovna' koji sadrzi pocetne slike koje stoje dok se ne pokrene igra
var brojSlika = 13;
var brojPogodakaZa3 = 0;
var brojPogodakaZa4 = 0;
var brojPogodakaZa5 = 0;
var brojObrtaja = 0;
var prUlog = document.getElementById('preostali_ulog');
 var dobSpan5 = document.getElementById('za_5_pog');
 var dobSpan4 = document.getElementById('za_4_pog');
 var dobSpan3 = document.getElementById('za_3_pog');
var dajPareDugme = $('#daj_pare').eq(0);
var dobitakZa5=0;
var dobitakZa4=0;
var dobitakZa3=0;
var osvojeno =0;
var prekidac = false;



window.addEventListener('load', napraviKolone);

dajPareDugme.on('click', function() {
  ulog = parseInt(document.getElementsByTagName('input')[0].value);
  preostaliNovac = ulog;
  // console.log(typeof preostaliNovac);

  startDugme.on('click', pokreniIgru);
  autoplayDugme.on('click', function() {
    startDugme.off( "click", "**" );
    pokreniIgru()
    brojObrtaja=0
    prekidac = true;

  });

});

 function povecajBrojObr() {
      brojObrtaja++;
     if (brojObrtaja>3) {
       prekidac= false;
       autoplayDugme.off( "click", "**" );
       brojObrtaja=0
     }

   pokreniIgru();
 }

function napraviKolone() {
  var text=``;
  for (var i = 0; i < 5; i++) {
    text+=`<div class="wrapp">
      <div class="slike_Div">
      </div>
      <div class="naslovna">
        <img src="pocetna.png" class="img-responsive" alt="pocetna"><img src="pocetna.png" lass="img-responsive" alt="pocetna"><img src="pocetna.png" class="img-responsive" alt="pocetna">
      </div>
  </div>`;
  }
  prviDiv.html(text);
}


  // OVA FUNKCIJA POKRECE FUNKCIJU ZA PRAVLJENJE SLIKA U SVIH 5 KOLONA PONAOSOB
function pokreniIgru() {
  dobSpan3.innerHTML= 0;
  dobSpan4.innerHTML= 0;
  dobSpan5.innerHTML= 0;
  if (preostaliNovac > 0) {
    var slikeDiv = $('.slike_Div');
    napraviSlike( slikeDiv.eq(0), 1800 );
    napraviSlike( slikeDiv.eq(1), 2050 );
    napraviSlike( slikeDiv.eq(2), 2200 );
    napraviSlike( slikeDiv.eq(3), 2300 );
    napraviSlike( slikeDiv.eq(4), 2400 );
     setTimeout(proveriKombine5, 2500);
  }
  else {
    alert("you ain't got no more money bro, Y not spend some more?")
    window.location.reload();
  }
}



  // OVA FUNKCIJA PRAVI (STVARA) SLIKE U POJEDINACNOJ KOLONI; UZIMA KAO ARGUMENT PO JEDAN slikeDiv ELEMENT U KOJI CE SMESTITI  13 STVORENIH SLIKA; ZATIM STVARA 13 DIVOVA SA KLASOM '.ram' I U SVAKI SMESTA PO JEDNU SLICICU; SVAKI OD '.ram' DIVOVA DOBIJA CUSTOM DATA ATRIBUT data-i U KOJI CE BITI SMESTEN NJEGOV REDNI BROJ. PREKO OVIH REDNIH BROJEVA CE SVE SLIKE VISKA KOJE SU U  ovreflow: hidden BITI ODSECENE KAD SE ZAVRSI ANIMACIJA;
  // NA KRAJU SE POZIVA FUNKCIJA 'zavrti(x)' KOJA ANIMIRA KOLONU
  // 'data-br' SAMO BELEZI U SEBI BROJ KOJI JE SLIKA IMALA U NIZU 'slike'
function napraviSlike(x,vreme) {
      x.css('margin-top', '-1950px');
      var text = '';
      var slike = [`images/a.jpg`,`images/b.jpg`,`images/c.jpg`,`images/a.jpg`,`images/b.jpg`,`images/c.jpg`,`images/a.jpg`,`images/b.jpg`,`images/c.jpg`,`images/a.jpg`,`images/b.jpg`,`images/c.jpg`,`images/a.jpg`];

      // console.log(slike.length);
      for (var i = 0; i < brojSlika; i++) {
      var random = Math.floor(Math.random()*slike.length);
        // console.log(random);
        text += `<div class="ram " data-i="${i}" data-br="${random}"><img src="${slike[random]}" class="img-responsive" alt="bla"></div>`;
        slike.splice(random,1);
      }
      x.html(text);
      zavrti(x,vreme);
  }



//  OVA FUNKCIJA POMERA MARGINU SVAKOM 'slikeDiv'-u I NA TAJ NACIN ANIMIRA SLOT.  TEK KAD SE ANIMACIJA ZAVRSI TREBALO BI ZA SVAKU KOLONU DA SE POZOVE F-JA 'obrisiVisak()' KAO CALLBACK FUNCTION
function zavrti(x,vreme) {
      $(x).animate({marginTop: "0px"},vreme, function () {
        obrisiVisak(x);
      });
  }


//  OVA FUNKCIJA BRISE SVE '.ram' DIVOVE KOJI IMAJU 'data-i' VECI OD 2 U JEDNOJ KOLONI, NA TAJ NACIN SE BRISU SVI DIVOVI VISKA;
function obrisiVisak(x) {

    var obr =  x.find('div.ram');
    // var j=0;
    obr.each( function () {
      var a = $(this).attr('data-i');
      // console.log(a);
      if (a>2) {
        $(this).remove();
      }
      // $(this).attr('data-redni',j)
      // j++;
    })
    dodeliRedniBr();
 }


// NAKON TOGA OVA FUNKCIJA SVAKOM PREOSTALOM '.ram' DIVU U CELOJ APLIKACIJI DODELJUJE REDNI BROJ 'j' PREKO CUSTOM ATRIBUTA 'data-redni'. NA OVAJ NACIN PREOSTALI DIVOVI IMAJU REDNE BROJEVE OD 0 DO 14 I POMOCU OVIH BROJEVA  MAPIRAM  DOBITNE KOMBINACIJE
function dodeliRedniBr() {
    var j=0;
    var ramovi = $('div.ram');
    ramovi.each( function () {
      $(this).attr('data-redni',j),
      j++;
    })
  }


 // OVA FUNKCIJA MAPIRA DOBITNE KOMBINACIJE U NIZ 'kombine' I POMOCU 'for' I 'if' PETLJE I 'src' ATRIBUTA SVAKE SLIKE PROVERAVA DA LI SE NEKA DOBITNA KOMBINACIJA POJAVILA

function proveriKombine5() {
  var test3= 0;
  var test4= 0;
  var test5= 0;
  osvojeno = 0
  singlUlog = parseInt(document.getElementById('spiner').value);
    // console.log(typeof singlUlog);
  var polja = $('div[data-redni]');

  var kombine3 = [
      [polja.eq(0),polja.eq(3),polja.eq(6)],
      [polja.eq(1),polja.eq(4),polja.eq(7)],
      [polja.eq(2),polja.eq(5),polja.eq(8)],
      [polja.eq(0),polja.eq(4),polja.eq(8)],
      [polja.eq(2),polja.eq(4),polja.eq(6)]
    ];

  var kombine4 = [
      [polja.eq(0),polja.eq(3),polja.eq(6),polja.eq(9)],
      [polja.eq(1),polja.eq(4),polja.eq(7),polja.eq(10)],
      [polja.eq(2),polja.eq(5),polja.eq(8),polja.eq(11)],
      [polja.eq(0),polja.eq(4),polja.eq(8),polja.eq(10)],
      [polja.eq(2),polja.eq(4),polja.eq(6),polja.eq(10)]
    ];

    var kombine5 = [
        [polja.eq(0),polja.eq(3),polja.eq(6),polja.eq(9),polja.eq(12)],
        [polja.eq(1),polja.eq(4),polja.eq(7),polja.eq(10),polja.eq(13)],
        [polja.eq(2),polja.eq(5),polja.eq(8),polja.eq(11),polja.eq(14)],
        [polja.eq(0),polja.eq(4),polja.eq(8),polja.eq(10),polja.eq(12)],
        [polja.eq(2),polja.eq(4),polja.eq(6),polja.eq(10),polja.eq(14)]
      ];

         for (var i = 0; i < kombine5.length; i++) {

         if (
          ( ( (kombine5[i][0].children('img').attr('src')===kombine5[i][1].children('img').attr('src') )
          && (kombine5[i][0].children('img').attr('src')===kombine5[i][2].children('img').attr('src') ) )
          && (kombine5[i][0].children('img').attr('src')===kombine5[i][3].children('img').attr('src') ) )
          && (kombine5[i][0].children('img').attr('src')===kombine5[i][4].children('img').attr('src') )
         ) {
           brojPogodakaZa5++;
          //  console.log('brojPogodakaZa5 je: '+brojPogodakaZa5+', a "i" je = '+i);
          test5++
           for (var j = 0; j < 5; j++) {
           animePog(kombine5[i][j],'images/5wins.png')
           }
           dobitakZa5 = singlUlog*5;
           osvojeno = dobitakZa5;
          //  console.log(dobitakZa5);
          preostaliNovac+=osvojeno
          console.log(osvojeno + 'u spinu za 5');
           dobSpan5.innerHTML = osvojeno+' x '+test5;

         }


          else  if (
             ( (kombine4[i][0].children('img').attr('src')===kombine4[i][1].children('img').attr('src') )
            && (kombine4[i][0].children('img').attr('src')===kombine4[i][2].children('img').attr('src') ) )
            && (kombine4[i][0].children('img').attr('src')===kombine4[i][3].children('img').attr('src') )
          ) {
              brojPogodakaZa4++;
              // console.log('brojPogodakaZa4 je: '+brojPogodakaZa4+', a "i" je = '+i);
              test4++
              for (var j = 0; j < 4; j++) {
              animePog(kombine4[i][j],'images/4wins.jpg')
              }
                dobitakZa4 = singlUlog*4;
                // console.log(dobitakZa4);
                osvojeno=dobitakZa4;
                preostaliNovac+=osvojeno
                  console.log(osvojeno + 'u spinu za 4');
                dobSpan4.innerHTML= osvojeno+' x '+test4;
            }

           else {

                              if (
                                (kombine3[i][0].children('img').attr('src')===kombine3[i][1].children('img').attr('src'))&&(kombine3[i][0].children('img').attr('src')===kombine3[i][2].children('img').attr('src'))
                                ) {
                                brojPogodakaZa3++;
                                // console.log('brojPogodakaZa3 je: '+brojPogodakaZa3+', a "i" je = '+i);
                                test3++
                                for (var j = 0; j < 3; j++) {
                                animePog(kombine3[i][j],'images/3wins.jpg')
                                }
                                dobitakZa3 = singlUlog*3;
                                // console.log(dobitakZa3);
                                osvojeno = dobitakZa3;
                                preostaliNovac+=osvojeno
                                  console.log(osvojeno + 'u spinu za 3');
                                dobSpan3.innerHTML= osvojeno+' x '+test3;
                              }
                              else {
                              // var preostaliNovac = ulog - (brojObrtaja*(ulog/3));
                              }

                }   //kraj elsa

     } // kraj for-petlje
    //  console.log(preostaliNovac);
    if (prekidac ===true) {
        setTimeout(povecajBrojObr, 1500)
        console.log(brojObrtaja);
    }
preostaliNovac -= singlUlog;
// console.log(preostaliNovac);
prUlog.innerHTML = preostaliNovac;

}// KRAJ FUNKCIJE proveriKombine5------------------------



function animePog(a,b) {
   $(a).children('img').addClass('obrni').attr('src', b);
}
