<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["user_email"] = $session['user_email'];
    $response["display_name"] = $session['display_name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('user_email', 'user_pass'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->user_pass;
    $email = $r->customer->user_email;
    $user = $db->getOneRecord("select ID,display_name,user_pass,user_email,user_registered from wp_users where user_email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['user_pass'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['display_name'] = $user['display_name'];
        $response['uid'] = $user['ID'];
        $response['user_email'] = $user['user_email'];
        $response['createdAt'] = $user['user_registered'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $user['ID'];
        $_SESSION['user_email'] = $email;
        $_SESSION['display_name'] = $user['display_name'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $response = array();
    $obj = $m_obj = new stdClass;
    $r = json_decode($app->request->getBody());

    verifyRequiredParams(array('user_email', 'display_name', 'user_pass'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $name = $r->customer->display_name;
    $email = $r->customer->user_email;
    $password = $r->customer->user_pass;
    $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $r->customer->user_profile_pic));
    $image_name = explode(' ',$name);
    $file_path = 'profilepics/'.$image_name[0].'_'.time().'.png';
    file_put_contents($file_path, $data);
    $obj->display_name = $name;
    $obj->user_email = $email;
    $obj->user_pass = $password;
    $obj->user_login = $email;
    $obj->user_nicename = $name;
    $obj->user_registered = time();
    $obj->user_status = '1';
    
    $m_obj->user_designation = $r->customer->user_designation;
    $m_obj->user_education = $r->customer->user_education;
    $m_obj->user_category = $r->customer->user_category;
    $m_obj->user_about_me = $r->customer->user_about_me;
    $m_obj->user_employment_history = $r->customer->user_employment_history;
    $m_obj->user_profile_pic = $file_path;
    
    $isUserExists = $db->getOneRecord("select 1 from wp_users where user_email='$email'");
    if(!$isUserExists){
        $obj->user_pass = passwordHash::hash($password);
        $tabble_name = "wp_users";
        $meta_tabble_name = "wp_usermeta";
        //$column_names = array('phone', 'name', 'email', 'password', 'city', 'address');
        $column_names = array('user_login', 'user_pass', 'user_nicename', 'user_email', 'user_status', 'display_name', 'user_registered');
        $meta_column_names = array('user_designation', 'user_education', 'user_category','user_about_me','user_employment_history','user_profile_pic');
        $result = $db->insertIntoTablewithMeta($obj, $column_names, $tabble_name, $m_obj, $meta_column_names, $meta_tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['display_name'] = $name;
            $_SESSION['user_email'] = $email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});
$app->post('/profileEdit', function() use ($app) {
    $db = new DbHandler();
    $response = array();
    $m_obj = new stdClass;
    $r = json_decode($app->request->getBody());
    $user_id = $r->userData->ID;
    $m_obj->user_designation = $r->userData->user_designation;
    $m_obj->user_education = $r->userData->user_education;
    $m_obj->user_category = $r->userData->user_category;
    $m_obj->user_about_me = $r->userData->user_about_me;
    $m_obj->user_employment_history = $r->userData->user_employment_history;
    $meta_column_names = array('user_designation', 'user_education', 'user_category','user_about_me','user_employment_history');
    $meta_tabble_name = "wp_usermeta";
    $result = $db->updateMetaValues($m_obj, $meta_column_names, $meta_tabble_name,$user_id);
    if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account updated successfully";
            $response["uid"] = $result;
    } else{
        $response["status"] = "error";
        $response["message"] = "User account cannot be updated.";
        echoResponse(201, $response);
    }
  
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});
$app->post('/userProfile', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $email = $session['user_email'];
    $userid = $session['uid'];
    $user = $db->getOneRecord("select ID,display_name,user_pass,user_email,user_registered from wp_users where user_email='$email'");
    if ($user != NULL) {
        $user_meta = $db->getMetaRecord("select * from wp_usermeta where user_id='$userid'");
        for($i=0;$i<count($user_meta);$i++){
            $response[$user_meta[$i]["meta_key"]] = $user_meta[$i]["meta_value"];
        }
        $response['status'] = "success";
        $response['display_name'] = $user['display_name'];
        $response['uid'] = $user['ID'];
        $response['user_email'] = $user['user_email'];
        $response['createdAt'] = $user['user_registered'];
        echoResponse(200, $response);
    }
    });
$app->post('/createActivity', function() {
        $db = new DbHandler();
        $session = $db->getSession();
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $column_names = array('text', 'start', 'end');
        $tabble_name = 'events';
        $result = $db->insertIntoTable($params, $column_names, $tabble_name);
    if ($result != NULL) {
        $response['status'] = 'success';
        $response['message'] = 'Event Created.';//$db->lastInsertId();
        $response['id'] = $result;
    }
        echoResponse(200, $response);
    });
$app->post('/updateActivity', function() {
        $db = new DbHandler();
        $session = $db->getSession();
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $new_obj = new stdClass;
        $new_obj->start = $params->newStart;
        $new_obj->end = $params->newEnd;
        $column_names = array('text', 'start', 'end');
        $tabble_name = 'events';
        $result = $db->updateTable($new_obj, $column_names, $tabble_name,$params->id);
    if ($result != NULL) {
        $response['status'] = 'success';
        $response['message'] = 'Event Updated.';//$db->lastInsertId();
        $response['id'] = $result;
    }
        echoResponse(200, $response);
    });
$app->post('/getActivity', function() {
        $db = new DbHandler();
        $session = $db->getSession();
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $events = $db->getAllActivity("select * from events where NOT ((end <='$params->start') OR (start >= '".$params->end."'))");        
        echoResponse(200, $events);
    });
?>