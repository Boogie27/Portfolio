<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');


// $destination = './api';
// $fileNameArray = explode(".", $_FILES['image']['name']);
// $fileName = time().'.'.end($fileNameArray);

// $uploadPath = $destination.$fileName;
// $fileLink = 'http://localhost:3000/api/'.$fileName;

// if(!file_exists($estination)){
//     mkdir($estination, 0777, true);
// }

// if(move_uploaded_file($_FILE['file']['tmp_name'], $uploadPath)){
//     echo json_encode([
//         'message' => 'File uploaded successfully!',
//         'image_link' => $fileLink,
//         'name' => $fileName
//     ]);
// }


echo 'hello'









?>