/**
 * Created by Baka on 10/23/2014.
 */
var ß = require("./js/essz2");

if (true){

    var h = ß.HashList();
    for(var i = 0; i < 1000000; i++){
        h.put("key" + i, "value"+i);
    }

    var start = Date.now();

    var q = h.sample(200);

    var end = Date.now();

    console.log(q);
    console.log(end-start);


} else {
    var m = new ß.BitMatrix2D(9,8);

    m.set(1,7);
    m.set(2,3);
    console.log(m.test(2,3));
    m.clear(2,3);
    console.log(m.test(2,3));

    console.log(m.debug());

    console.log("~~~~~~~~~~~~~~~");

    var q = new ß.IntMatrix2D(8,8);

    q.setField(2,2,3,3,9);
    q.set(3,2, 10);
    console.log(q.get(3,2));

    console.log(q.debug());

    console.log(q.hasValue(9,2,2,3,3));
}
