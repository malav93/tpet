<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Edit Event</title>    
        <link rel="stylesheet" type="text/css" href="css/styles.css" />
          <link rel="stylesheet" type="text/css" href="css/responsive.css" />
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/calender-all.js" type="text/javascript"></script>
    </head>
    <body>
        <a href="#" id="delete">Delete Event</a>
        <?php
            // check the input
            is_numeric($_GET['id']) or die("invalid URL");
            
            require_once '_db.php';
            
            $stmt = $db->prepare('SELECT * FROM events WHERE id = :id');
            $stmt->bindParam(':id', $_GET['id']);
            $stmt->execute();
            $event = $stmt->fetch();
        ?>
       
				<div class="activites-block">
					<form id="f" action="backend_update.php">
                        <input type="hidden" name="id" id="id" value="<?php print $_GET['id'] ?>" />
						<div class="activites-toprow cf">
							<div class="activites-row cf">
									<div class="activites-col activites-inputcol">
										<div class="activites-input">
											<input type="input" placeholder="Activity Title" name="title" id="title" />
										</div>
									</div>
									<div class="activites-col activites-selectcol">
										<div class="activites-select">
											<select>
												<option value="none">Select Courses</option>
												<option value="infants">Infants</option>
												<option value="pre">Jr. Preschool</option>
												<option value="kindergarten">Kindergarten</option>
												<option value="summer">Summer Programs</option>
											</select>
										</div>	
									</div>									
									
								</div>						
						</div>
						<div class="activitesdesc-row">
							<h3>Description</h3>
							<div class="actidesc-control">
								<textarea name="text" id="text"></textarea>
							</div>
							<div class="btn-rightside"><input class="btn-border" type="submit" value="Add Activity" /> <a href="#" id="cancel">Cancel</a></div>
						</div>
						
					</form>
				</div>
			
        
        <script type="text/javascript">

        $("#f").submit(function () {
            var f = $("#f");
            $.post(f.attr("action"), f.serialize(), function (result) {
                DayPilot.Modal.close(result);
            });
            return false;
        });
        
        $("#delete").click(function() {
            $.post("backend_delete.php", { id: $("#id").val()}, function(result) {
                DayPilot.Modal.close(result);
            });
            return false;
        });
        
        $("#cancel").click(function() {
            DayPilot.Modal.close();
            return false;
        });

        $(document).ready(function () {
            $("#name").focus();
        });
    
        </script>
    </body>
</html>
