<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Pago Realizado</title>
</head>
<body>
    <?php if($charge->status == "paid") : ?>
        <p>Pago realizado exitosamente</p>
    <?php else : ?>
        <p>Ocurrio un error al procesar su pago</p>
    <?php endif; ?>
</body>
</html>