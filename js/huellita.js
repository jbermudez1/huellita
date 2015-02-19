$(document).ready( inicio );

var dinero;

function inicio () {
  $('.cantidad').focus(function(){
    dinero =$(this).val();
    $(this).val("");
  });

  $('.cantidad').blur(function(){
    if ($(this).val() == ""){
      $(this).val(dinero);
      }
    
    $('.cantidad').formatCurrency();
  });
}
          
// CONEKTA
jQuery(function($) {
  $("#card-form").submit(function(event) {
    var $form;
    $form = $(this);

  /* Previene hacer submit más de una vez */
    $form.find("button").prop("disabled", true);
    Conekta.token.create($form, conektaSuccessResponseHandler, conektaErrorResponseHandler);
    
    /* Previene que la información de la forma sea enviada al servidor */
    return false;
  });
});

// BIEN
var conektaSuccessResponseHandler;
conektaSuccessResponseHandler = function(token) {
  var $form;
  $form = $("#card-form");

  /* Inserta el token_id en la forma para que se envíe al servidor */
  $form.append($("<input type=\"hidden\" name=\"conektaTokenId\" />").val(token.id));

  /* and submit */
  // console.log(token.id)
  $form.get(0).submit();
};

// MAL
var conektaErrorResponseHandler;
conektaErrorResponseHandler = function(response) {
  var $form;
  $form = $("#card-form");

  /* Muestra los errores en la forma */
  $form.find(".card-errors").text(response.message);
  $form.find("button").prop("disabled", false);
};