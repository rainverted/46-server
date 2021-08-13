I dalis - serverio kurimas:

1.index.js - logika kaip paleisti projekta pries pajungiant serveri(server.js)
2.config.js - serverio naudojimo daznumas/daznis
3.Bibliotekos "lib" folderis, kuriame:
-data.js - tekstiniu failu nuskaitymas
-server.js - serverio logika, tarsi klase kaip ji sukurti ir kaip naudoti, index.js labiau skirta logikos inicijavimui
4.index.html - turinys
5.data.js idedame async funkcija ir failai ir derektorijos projekto

index.js kuriame objektus, kuriems priskirsime metodus:

- app.init() turime:
  -paruosti reikiamas direktorijas
  -paruosti reikiamus failus
  -paleisti serverius (main step)

server.js kuriame:
-server objekta ir ji eksportuojame
-server.metodai:
-server.init - tam, kad paleistume importuojame i index.js ir iskvieciame (t.y. paleidziame HTTP serveri)
-turime paleisti HTTP(nesaugus, del vaizdo, kuris nukreipia i saugu) ir HTTPS(saugus)

-server.httpServer = null;
-http.createServer metodas suteikiame request ir response parametrus bei localhost porta 3000;
/siuo metu live-serveris neatsidaro, nes nedaveme jokio req ir res/
-kuriame req.on() duodami reikiama ivyki - close, data, end, error, pause, readable, resume
mums reikiamas yra 'end', kuris nurodo kas ivyks, kai uzklausa baigsis, ir priskiriame data
-kuriame req.data() - uzklauso gavo duomenis
-kuriame req.end() - uzklausos pabaiga -

public direktorijoje:
tekstiniai failai
-css
-js
-svg

binariniai failai:
-img(jpg, png)
-fonts

MIME tas pats failo tipas tik su extra papildymais...

// css/base/main.css -> [css.base/main, css]
// css/base/main.min.css -> [css.base/main, min, css]

        //bus isspauzdinta, jei tipas nebus teisingas ir bus nurodytas paprastu(plain) tekstu
        res.writeHead(404, {
            'Content-Type': 'text/plain',
        })

        return res.end('Content/file not found');
    })

      // server.httpServer.on('listening', () => {
    //     console.log('### kazkas pradejo klausytis');
    // })


    'Cache-Control': 'max-age=15', laikas nurodytas sekundemis
