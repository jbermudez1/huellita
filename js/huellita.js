$(function(){
  var dinero;
  
  inicio();
  

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
  $(function($) {
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
    $form.find("button").prop("disabled", false);

    $.post($form.prop('action'), $form.serialize(), function(data){
      data = JSON.parse(data);

      if(data.result)
      {
        $('#card-form').find('input').not('.cantidad').val('');

        muestraMensaje("Gracias por tu donativo!")
      }
      else
      {
        muestraMensaje("No se pudo procesar tu donativo, intenta con otra tarjeta!");
      }
      $('#card-form').find("input[type='hidden']").remove();

    })
    //$form.get(0).submit();
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


  // MUESTRA EL MESAJE DEL PAGO
  function muestraMensaje(text){
    var dialog = $('.mensajePago').first();
    dialog.find('p').text(text);
    dialog.fadeIn();

    setTimeout(function() {
      dialog.fadeOut();
    }, 3000);
  }
});