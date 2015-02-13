$(document).ready( inicio )

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
    
};

/* Previene que la información de la forma sea enviada al servidor */

    return false;
  });
  var conektaErrorResponseHandler;
conektaErrorResponseHandler = function(response) {
  var $form;
  $form = $("#card-form");

  
/* Muestra los errores en la forma */

  $form.find(".card-errors").text(response.message);
  $form.find("button").prop("disabled", false);
};
});