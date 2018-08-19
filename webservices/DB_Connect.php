<?php
include_once('../vars.inc');

class DB_Connect 
{
	private $link;
    // constructor
    function __construct() 
	{
    }
 
    // destructor
    function __destruct() 
	{
        // $this->close();
    }
 
    // Connecting to database
    public function connect(&$error_msg) 
	{
		global $dbHost,$dbUser,$dbPass,$dbDatabase,$dbPort;
        // connecting to mysql
		$link = mysqli_connect(
			$dbHost, /* The host to connect to */
			$dbUser, /* The user to connect as */
			$dbPass, /* The password to use */
			$dbDatabase); /* The default database to query */
			if (!$link)
			{
				$error_msg = "Unable to connect to DB!";
				return(false);
			}
			return($link);
    }
 
    // Closing database connection
    public function close() 
	{
        mysqli_close($link);
    }
}
?>
