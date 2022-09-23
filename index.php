<?php
$command = escapeshellcmd('/index.py');
$output = shell_exec($command);
echo $output;
echo header("Location: http://ytd.local:5000");
?>