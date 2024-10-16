<?php
// Simulación de datos (puedes usar una base de datos aquí)
$proyectos = [
    [
        'titulo' => 'Sistema punto de venta',
        'imagen' => 'imagesProyects/SistemaPuntoVenta.png',
        'link' => 'https://github.com/DonobanR/Sistema-punto-de-venta',
        'tipo' => 'participacion'
    ],
    [
        'titulo' => 'Nodo venta de electrodomésticos',
        'imagen' => 'imagesProyects/nodoVentaSur.png',
        'link' => 'https://github.com/DonobanR/AplicacionNodoSur_EjemploBDD',
        'tipo' => 'personal'
    ],
    [
        'titulo' => 'Portafolio personal',
        'imagen' => 'imagesProyects/myPortafolio.png',
        'link' => 'https://github.com/DonobanR/Pagina',
        'tipo' => 'personal'
    ],
    [
        'titulo' => 'Sokoban',
        'imagen' => 'imagesProyects/sokoban.png',
        'link' => 'https://github.com/DonobanR/Sokoban_In_JAVA',
        'tipo' => 'personal'
    ],
    [
        'titulo' => 'SharpShooter',
        'imagen' => 'imagesProyects/SharpShooter.png',
        'link' => 'https://github.com/DonobanR/OpenGL_SharpShooter_2024A_GR1SW_GR5',
        'tipo' => 'participacion'
    ],
    [
        'titulo' => 'Traductor Braille to Text y viceversa',
        'imagen' => 'imagesProyects/brailleToText.jpeg',
        'link' => 'https://github.com/JoelPiuri/TraductorBrailleATexto',
        'tipo' => 'participacion'
    ]
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    echo json_encode($proyectos);
    exit;
}

?>
