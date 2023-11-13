<?php
//Escribe una función que se conecta a una función API online y devuelve el resultado de la petición en un array asociativo
function getAPI($url){
    $json = file_get_contents($url);
    $array = json_decode($json, true);
    return $array;
}

$result = getAPI("https://jsonplaceholder.typicode.com/posts");
print_r($result);


//Crea una función para mostrar el array asociativa de getApi() en una tabla HTML. La tabla tendrá una fila con los nombre de las columnas y una fila por cada elemento del array
function showTable($array){
    echo "<table border='1'>";
    echo "<tr>";
    foreach ($array[0] as $key => $value) {
        echo "<th>$key</th>";
    }
    echo "</tr>";
    foreach ($array as $key => $value) {
        echo "<tr>";
        foreach ($value as $key2 => $value2) {
            echo "<td>$value2</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}

showTable($result);

//Crea una función que procesa el resultado de getApi() y que si detecta valos numéricos los rempolace por un texto "ES NUMERICO"
function replaceNumeric($array){
    foreach ($array as $key => $value) {
        foreach ($value as $key2 => $value2) {
            if(is_numeric($value2)){
                $array[$key][$key2] = "ES NUMERICO";
            }
        }
    }
    return $array;
}

showTable(replaceNumeric($result));