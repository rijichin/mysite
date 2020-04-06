<?php
include "conn.php";
if(isset($_POST['nickname'])&&isset($_POST['password'])){
    $nickname=$_POST['nickname'];
    $password=sha1($_POST['password']);
    $res=$conn->query("select * from registry where nickname='$nickname' and password='$password'");
    if($res->num_rows>0){
        echo 'exist';
    }
}

