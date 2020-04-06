<?php
include "conn.php";
if(isset($_POST['page'])&&isset($_POST['pageSize'])){
    $pagevalue=$_POST['page'];
    $pagesize=$_POST['pageSize'];
    $page=($pagevalue-1)*$pagesize;
    $res=$conn->query("select * from list limit $page,$pagesize");
if($res->num_rows>0){
    $arr=array();
    for($i=0;$i<$res->num_rows;$i++){
        $arr[$i]=$res->fetch_assoc();
    }
    echo json_encode($arr);
}
}
