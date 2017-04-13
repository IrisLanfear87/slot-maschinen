// var slike = [`images/a.jpg`,`images/b.jpg`,`images/c.jpg`,`images/d.jpg`,`images/e.jpg`,`images/f.jpg`,`images/g.jpg`,`images/h.jpg`,`images/i.jpg`,`images/j.jpg`,`images/k.jpg`,`images/l.jpg`,`images/m.jpg`];

function proveriKombine() {
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



    for (var i = 0; i < kombine4.length; i++) {
            if ( (kombine4[i][0].children('img').attr('src')===kombine4[i][1].children('img').attr('src'))&&(kombine4[i][0].children('img').attr('src')===kombine4[i][2].children('img').attr('src'))&&(kombine4[i][0].children('img').attr('src')===kombine4[i][3].children('img').attr('src')) ) {
              console.log('pogodak za 4');
              brojPogodakaZa4++;
              console.log(brojPogodakaZa4);
            }
            else {
              console.log('nema pogodka');
            }
       }


  for (var i = 0; i < kombine3.length; i++) {
          if ((kombine3[i][0].children('img').attr('src')===kombine3[i][1].children('img').attr('src'))&&(kombine3[i][0].children('img').attr('src')===kombine3[i][2].children('img').attr('src'))) {
            console.log('pogodak za 3');
            brojPogodakaZa3++;
            console.log(brojPogodakaZa3);
          }
          else {
            console.log('nema pogodka');
          }
     }
}
