# Reto para la Práctica de OOP


## El Contexto. Introducción

La función `dataTable` en `d-table.js` es la que parsea el objeto construído a partir de la entrada y decide la clase de celda que se aplica a cada entrada, retornando un array de objetos que son de alguna clase *Celda*: 

```js
  dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
      return new UnderlinedCell(name);
    });
    var body = data.map(function(row) {
      return keys.map(function(name) {
        var value = row[name];

        if (/^\s*[-+]?\d+([.]\d*)?([eE][-+]?\d+)?\s*$/.test(value))
          return new RCell(String(value));
        else
          return new TCell(String(value));
      });
    });
    return [headers].concat(body);
  }
```
* Los nombres de los atributos del objeto son tratados como objetos de la clase `UnderlinedCell`:

  ```js
    var headers = keys.map(function(name) {
      return new UnderlinedCell(name);
    });
  ```
* Si parece que el contenido es un número, es tratado como una `RCell` 

  ```js
          if (/^\s*[-+]?\d+([.]\d*)?([eE][-+]?\d+)?\s*$/.test(value))
            return new RCell(String(value));
  ```
* Si no, es tratado como una `TCell`:

  ```js
          else
            return new TCell(String(value));
  ```

## Objetivo

**Modifique `dataTable` para que aquellas celdas en las que el valor es un objeto en vez de una ` String`  o un `Number`
se interpreten como del tipo specificado en el atributo `type`**

  Sigue un ejemplo de entrada:

  ```
  [
    {"name": {"type": "StrechCell", params: ["Teide", 2, 6]}, "height": 3718, "country": "Spain"},
    {"name": "Kilimanjaro\nMontaña mágica", "height": 5895, "country": "Tanzania"},
    {"name": "Everest", "height": 8848, "country": "Nepal\nPaís lejano"},
    {"name": {"type": "StrechCell", params: ["Mount Fuji", 2]}, "height": 3776, "country": "Japan"},
    {"name": "Mont Blanc", "height": {"type": "TCell", params: [4808]}, "country": "Italy/France"},
    {"name": "Vaalserberg", "height": 323, "country": "Netherlands"},
    {"name": "Denali", "height": 6168, "country": "United States"},
    {"name": "Popocatepetl", "height": 5465, "country": "Mexico"}
  ]
  ```
  **El atributo `type` tiene el nombre de la clase de la celda y el atributo `params` la lista de parámetros que se pasaran al constructor de la clase.**


## Notas

* Documentación del método [apply](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/apply): El método apply() invoca una determinada función asignando explícitamente el objeto `this` y un array o similar (array like object) como parámetros (argumentos) para dicha función.

* Este es un ejemplo de mapa que asocia nombres de clases con constructores;

  ```js
  [~/ull-pl1718-campus-virtual/tema1-intro-a-js/practica-oop/OOP/src(reto2)]$ node
  > DTable = require("d-table")
  > TCell = require("t-cell")
  > RCell = require("r-cell")
  > Classes = new Map()
  > Classes["TCell"] = TCell
  > Classes["RCell"] = RCell
  > w = "RCell"
  > x = new (Classes[w])("Chinyero")
  RCell { text: [ 'Chinyero' ] }
  ```
* En ECMA6 el método `constructor` nos devuelve el constructor, el cual tiene un atributo `name`:

  ```js
  > "hello".constructor.name
  'String'
  > (432).constructor.name
  'Number'
  > ({c:4,w:2,h:3}).constructor.name
  'Object'
  ```
* [RegExp test](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp/test)
* [Array concat](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/concat)
