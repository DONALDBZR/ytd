<?php
require_once "{$_SERVER['DOCUMENT_ROOT']}/Routes.php";
require_once "{$_SERVER['DOCUMENT_ROOT']}/Modules/YouTube.php";
$YouTube = new YouTube();
if (json_decode(file_get_contents("php://input")) != null) {
    if (!empty(json_decode(file_get_contents("php://input"))->videoURL)) {
        $Youtube->initialize();
    } else {
        $json = array(
            "success" => "failure",
            "url" => "{$Youtube->domain}/Register",
            "message" => "The form must be completely filled!"
        );
        header('Content-Type: application/json');
        echo json_encode($json);
    }
} else {
    $json = array(
        "success" => "failure",
        "url" => "{$Youtube->domain}/Register",
        "message" => "The form must be completely filled!"
    );
    header('Content-Type: application/json');
    echo json_encode($json);
}
