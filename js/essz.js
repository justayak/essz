"use strict"
/**
 * User: Baka
 * Date: 21.05.13
 * Time: 18:16
 */
var essz = {

    INTEGER_BYTESIZE : 4,
    SHORT_BYTESIZE : 2,

    intArray : function(size){
        var buffer = new ArrayBuffer(size * essz.INTEGER_BYTESIZE);
        var result = new Int32Array(buffer);
        return result;
    },

    matrix2D : function(width,height){
        var result = new essz.Matrix2D(width,height);
        return result;
    },

    bitMatrix2D : function(width,height){
        return new essz.BitMatrix2D(width,height);
    },

    shortArray : function(size){
        var buffer = new ArrayBuffer(size * essz.SHORT_BYTESIZE);
        var result = new Int16Array(buffer);
        return result;
    }

}

/**
 * @param width (in bits)
 * @param height (in bits)
 * @constructor
 */
essz.BitMatrix2D = function(width,height){
    // we have to map the width and height from bit to byte
    var byteWidth = Math.ceil(width / 8.0);
    var buffer = new ArrayBuffer(byteWidth * height);
    this._data = new Uint8Array(buffer);
    this.byteWidth = byteWidth;
    this.byteHeight = height;
};

essz.BitMatrix2D.prototype.set = function(x,y){
    var bytePosX = (x / 8.0);
    bytePosX = bytePosX|bytePosX; // fast floor (only 32bit integer!)
    var bitPosX = x % 8

    var pos = (bytePosX*this.byteWidth) + y;
    var n = this._data[pos];

    var mask = 1 << bitPosX;
    n |= mask;
    this._data[pos] = n;
    return this;
};

essz.BitMatrix2D.prototype.clear = function(x,y){
    var bytePosX = (x / 8.0);
    bytePosX = bytePosX|bytePosX; // fast floor (only 32bit integer!)
    var bitPosX = x % 8

    var pos = (bytePosX*this.byteWidth) + y;
    var n = this._data[pos];

    var mask = 1 << bitPosX;
    n &=~mask;
    this._data[pos] = n;
    return this;
}

essz.BitMatrix2D.prototype.test = function(x,y){
    var bytePosX = (x / 8.0);
    bytePosX = bytePosX|bytePosX; // fast floor (only 32bit integer!)
    var bitPosX = x % 8

    var pos = (bytePosX*this.byteWidth) + y;
    var n = this._data[pos];

    var mask = 1 << bitPosX;
    return ((n&mask) != 0)
};

essz.BitMatrix2D.prototype.debug = function(bit8sign, bit4sign){
    var bit8sign = bit8sign || ""
    var bit4sign = bit4sign || ""
    var result = "";
    for (var y = 0; y < this.byteHeight;y++){
        if (y%8===0){
            result +=bit8sign;
        }else if (y%4===0){
            result +=bit4sign;
        }
        for (var x = 0; x < (this.byteWidth * 8);x++){
            if (x%8===0){
                result += bit8sign
            }else if (x%4===0){
                result += bit4sign
            }
            result += (this.test(x,y) ? "1 " : "0 ");
        }
        result += "\n";
    }
    return result;
}

/**
 *
 * @param width
 * @param height
 * @constructor
 */
essz.Matrix2D = function(width,height){
    var buffer = new ArrayBuffer(width*height*essz.INTEGER_BYTESIZE);
    this._data = new Int32Array(buffer);
    this.width = width;
    this.height = height;
};

/**
 * Gets a certain value of the matrix
 * @param x
 * @param y
 * @return {*}
 */
essz.Matrix2D.prototype.get = function(x,y){
    var pos = (y*this.width) + x;
    return this._data[pos];
};

/**
 * sets a certain value of the matrix
 * @param x
 * @param y
 * @param value
 */
essz.Matrix2D.prototype.set = function(x,y,value){
    var pos = (y*this.width) + x;
    this._data[pos] = value;
    return this;
};

/**
 * Set multiple fields on the matrix
 * @param x
 * @param y
 * @param value
 * @param width
 * @param height
 */
essz.Matrix2D.prototype.setField = function(x,y,width, height,value){
    for (var Y = 0; Y < height; Y++){
        for (var X = 0; X < width; X++){
            var pos = ((y + Y) *this.width) + (x + X);
            this._data[pos] = value;
        }
    }
}

/**
 * returns a Information-String about the Matrix
 */
essz.Matrix2D.prototype.debug = function(){

    var newLine = "\n";
    var result = "";

    for (var y = -1; y < this.height;y++){
        for (var x = -1; x < this.width;x++){
            if (y === -1 && x === -1 ){
                result = "\t\t"
            }else if (y === -1){
                result += "|\t" + "<" + x + ">\t"
            }else if (x === -1 ){
                result += "|\t" + "<" + y + ">\t"
            }else{
                var pos = (y*this.width) + x;
                result += "|\t" + this._data[pos] + "\t";
            }
        }
        result += newLine;
    }

    return result;

};

/**
 * Checks, weather the given rectangle contains a certain value or not
 * @param value
 * @param x
 * @param y
 * @param width
 * @param height
 */
essz.Matrix2D.prototype.hasValue = function(value, x,y,width,height){
    if (width === undefined || height === undefined){
        return this.get(x,y) === value;
    }else{
        for (var h = 0; h < height; h++){
            for (var w = 0; w < width; w++){
                if (this.get(x+w,y+h) === value){
                    return true;
                }
            }
        }
        return false;
    }
};