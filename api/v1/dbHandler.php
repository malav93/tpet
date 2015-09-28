<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }
    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();    
    }
     /**
     * Fetching meta record
     */
    public function getMetaRecord($query) {
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
        //$result = $r->get_result();
        while($row = $r->fetch_assoc()){
             $rows[] = $row;
        }
        return $rows;    
    }
    /**
     * Fetching All Events
     */
    public function getAllActivity($query) {
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
        //$result = $r->get_result();
        //print_r($query);
        $rows = [];
        while($row = $r->fetch_assoc()){
            $row['start'] = str_replace(' ','T',$row['start']);
            $row['end'] = str_replace(' ','T',$row['end']);
             $rows[] = $row;
            //print_r($row);
        }
        return $rows;    
    }
    
    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {
        
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }
    /**
     * Updating record
     */
    public function updateTable($obj, $column_names, $table_name,$rid) {
        
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        $new_values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                //$$desired_key = '';
                continue;
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
            $new_values = $new_values.$desired_key."='".$$desired_key."',";
        }
        $query = "UPDATE ".$table_name." SET ".trim($new_values,',')." WHERE id =".$rid;
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            return $rid;
            } else {
            return NULL;
        }
    }
   /**
     * Creating new record with meta
     */
    public function insertIntoTablewithMeta($obj, $column_names, $table_name, $meta_obj, $meta_column_names, $meta_table_name) {
        
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        $meta_c = (array) $meta_obj;
        $meta_keys = array_keys($meta_c);
        $meta_columns = '';
        $meta_values = '';
        $meta_query = '';
        foreach($column_names as $desired_key){ 
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }        
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            foreach($meta_column_names as $meta_desired_key){ 
           if(!in_array($meta_desired_key, $meta_keys)) {
                $$meta_desired_key = '';
            }else{
                $$meta_desired_key = $meta_c[$meta_desired_key];
            }
            $meta_query = "INSERT INTO ".$meta_table_name."(`user_id`, `meta_key`, `meta_value`) VALUES ('".$new_row_id."','".$meta_desired_key."','".$$meta_desired_key."')";
            $m = $this->conn->query($meta_query) or die($this->conn->error.__LINE__);
        }            
            return $new_row_id;
            } else {
            return NULL;
        }
    }
    /**
     * Updating meta record
     */
    public function updateMetaValues($meta_obj, $meta_column_names, $meta_table_name, $user_id) {
        
        $meta_c = (array) $meta_obj;
        $meta_keys = array_keys($meta_c);
        $meta_columns = '';
        $meta_values = '';
        $meta_query = '';

        if ($user_id) {
            foreach($meta_column_names as $meta_desired_key){ 
           if(!in_array($meta_desired_key, $meta_keys)) {
                $$meta_desired_key = '';
            }else{
                $$meta_desired_key = $meta_c[$meta_desired_key];
            }
            //$meta_query = "INSERT INTO ".$meta_table_name."(`user_id`, `meta_key`, `meta_value`) VALUES ('".$new_row_id."','".$meta_desired_key."','".$$meta_desired_key."')";
            $meta_query = "UPDATE `".$meta_table_name."` SET `meta_value`='".$$meta_desired_key."' where `user_id`=".$user_id. " and `meta_key`='".$meta_desired_key."'";
                //print_r($meta_query);
                //exit;
            $m = $this->conn->query($meta_query) or die($this->conn->error.__LINE__);
        }            
            return $user_id;
            } else {
            return NULL;
        }
    }
public function getSession(){
    if (!isset($_SESSION)) {
        session_start();
    }
    $sess = array();
    if(isset($_SESSION['uid']))
    {
        $sess["uid"] = $_SESSION['uid'];
        $sess["display_name"] = $_SESSION['display_name'];
        $sess["user_email"] = $_SESSION['user_email'];
    }
    else
    {
        $sess["uid"] = '';
        $sess["display_name"] = 'Guest';
        $sess["user_email"] = '';
    }
    return $sess;
}
public function destroySession(){
    if (!isset($_SESSION)) {
    session_start();
    }
    if(isSet($_SESSION['uid']))
    {
        unset($_SESSION['uid']);
        unset($_SESSION['display_name']);
        unset($_SESSION['user_email']);
        $info='info';
        if(isSet($_COOKIE[$info]))
        {
            setcookie ($info, '', time() - $cookie_time);
        }
        $msg="Logged Out Successfully...";
    }
    else
    {
        $msg = "Not logged in...";
    }
    return $msg;
}
 
}

?>
