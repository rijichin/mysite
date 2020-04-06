<?php
include "conn.php";

if(isset($_POST['nickname'])&&isset($_POST['email'])&&isset($_POST['password'])){
    $nickname=$_POST['nickname'];
    $email=$_POST['email'];
    $pass=sha1($_POST['password']);
    // echo $email;
    $conn->query("insert registry values(null,'$nickname','$email','$pass',NOW())");
    echo 'success';
}
if(isset($_POST['username'])){
    $user=$_POST['username'];
    // echo $user;
    $res=$conn->query("select * from registry where nickname='$user'");
    if($res->num_rows>0){
        echo 1;
    }else{
        echo 0;
    }
}