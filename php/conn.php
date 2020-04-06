<?php
$conn=@new mysqli('localhost','root','','nz1903');
$conn->query("SET NAMES UTF8");
if($conn->connect_error){
   die('数据库连接失败'.$conn->connect_error);
}
