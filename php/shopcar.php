<?php
include "conn.php";
if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    $res=$conn->query("select * from list where sid='$sid'");
    if($res->num_rows>0){
        $arr=array();
        for($i=0;$i<$res->num_rows;$i++){
            $arr[$i]=$res->fetch_assoc();
        }
        echo json_encode($arr);
    }
}
