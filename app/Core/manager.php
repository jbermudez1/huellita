<?php

require_once("../../vendor/conekta/conekta-php/lib/Conekta.php");

Conekta::setApiKey("key_LcrSyqZqsxGTc8sr");

try{

    $monto = $_POST['monto'];
    $monto = str_replace(".","",$monto);

    $charge = Conekta_Charge::create(array(
        "amount"=> $monto,
        "currency"=> "MXN",
        "description"=> "Prueba de pago",
        "reference_id"=> "orden_de_id_interno",
        "card"=> $_POST['conektaTokenId']
        //"tok_a4Ff0dD2xYZZq82d9"
    ));

    echo json_encode([
            'result' => true
    ]);

}catch (Conekta_Error $e){
    // echo $e->getMessage();
    echo json_encode([
        'result'=> false
    ]);
}