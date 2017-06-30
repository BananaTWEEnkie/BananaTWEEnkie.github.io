<?php
    
    $choice = $_POST['choice'];
    $select = $_POST['select'];
    $admin = "sdchelp.cpp@gmail.com";
    $name = $_POST['name'];
    $email = $_POST['email' . "@cpp.edu"];
    $message = $_POST['message'];
    $subject = "Ticket Number: " . uniqid(17,false);
    
        $body = "From: $name 
                Email: $email 
                Issue: $select $choice $message";

    mail($admin, $subject, $body);

if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Thank you for the message. We will contact you shortly.');
		window.location = 'status.html';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message failed. Please send an email directly to sdchelp.cpp@gmail.com');
		window.location = 'status.html';
	</script>
<?php
}
?>