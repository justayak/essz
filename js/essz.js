"use strict"
/**
 * User: Baka
 * Date: 21.05.13
 * Time: 18:16
 */
var essz = {

    INTEGER_BYTESIZE : 4,

    intArray : function(size){
        var buffer = new ArrayBuffer(size * essz.INTEGER_BYTESIZE);
        var result = new Int32Array(buffer);
        return result;
    },

    matrix2D : function(width,height){
        var result = new essz.Matrix2D(width,height);
        return result;
    }

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