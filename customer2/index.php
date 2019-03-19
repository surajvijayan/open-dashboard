<?php

    // Static list provides security against URL injection by default.
    $routes = [
    'dashboard_sample',
    ];
    // Keeping things fast for a small number of routes.
    $regex = '/\/(' . join($routes, '|') . ')\.php/';
    if (preg_match($regex, $_SERVER['REQUEST_URI'], $matches)) 
    {
        $file_path = __DIR__ . '/dashboard/' . $matches[0];
        if (file_exists($file_path)) 
        {
            chdir(__DIR__ . '/dashboard/');  
            require($file_path);
            die();
        }
    }
?>
    <!DOCTYPE HTML>
    <html>
    <head>
        <title>Open-Dashboard</title>
    </head>
    <body>
    <h1>Sorry!</h1>
    </body>
    </html>
