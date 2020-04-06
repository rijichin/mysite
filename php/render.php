<?php
include "conn.php";
if(isset($_GET['talk'])){
  if($_GET['talk']='banner'){
    $res=$conn->query("select * from banner");
    $arr=array();
    if($res->num_rows>0){
        for($i=0;$i<$res->num_rows;$i++){
            $arr[$i]=$res->fetch_assoc();
        }
    echo json_encode($arr);
    }
  }
}
if(isset($_GET['talk1'])){
    if($_GET['talk1']='brands'){
      $res1=$conn->query("select * from brands");
      $arr1=array();
      if($res1->num_rows>0){
          for($i=0;$i<$res1->num_rows;$i++){
              $arr1[$i]=$res1->fetch_assoc();
          }
      echo json_encode($arr1);
      }
    }
  }
  if(isset($_GET['talk2'])){
    if($_GET['talk2']='tm'){
      $res1=$conn->query("select * from tmguo");
      $arr1=array();
      if($res1->num_rows>0){
          for($i=0;$i<$res1->num_rows;$i++){
              $arr1[$i]=$res1->fetch_assoc();
          }
      echo json_encode($arr1);
      }
    }
  }


