<?php
require_once "{$_SERVER['DOCUMENT_ROOT']}/Router.php";
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        switch ($_SERVER['REQUEST_URI']) {
            case '/':
                $Router = new Router("GET", "/", "/Views/Homepage.php");
                break;
        }
        break;
}
