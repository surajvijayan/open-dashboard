<?php
include_once('../vars.inc');
require_once '../dashboard/dashboard.php';
require_once 'DB_Connect.php';

class DB_Functions 
{
 
    private $link,$error_msg,$db;
	private $response = array(); 
    //put your code here
    // constructor
    function __construct() 
	{
        // connecting to database
        $this->db = new DB_Connect();
        $this->link = $this->db->connect($error_msg);
    }
    // destructor
    function __destruct() 
	{
    }
    /**
     * Validate user/passwd
     */
    public function validateUser($user,$pwd) 
	{
		$_SESSION['logged_in'] = true;
        $_SESSION['userid'] = $user;
		$response["success"] = 1;
        $response["user"] = $user;
        echo json_encode($response);
		return(true);
	}

	public function logoff()
	{
		$_SESSION['logged_in'] = false;
		$_SESSION['userid'] = "";
		unset($_SESSION['userid']);
		$response["success"] = 1;
        echo json_encode($response);
		return(true);
	}
/**********************************************************************************************************/

	private function get_db_csv($query,$excel_name)
    {
		$fh = fopen('php://output', 'w');
		$arr = explode('.',$excel_name);
		$excel_name = $arr[0] . ".csv";
		// Output CSV-specific headers
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header("Content-Disposition: attachment; filename=$excel_name");
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		echo "\xEF\xBB\xBF"; // UTF-8 BOM
        if(!$this->link)
        {
            $response["error"] = "1";
            $response["error_msg"] = $this->error_msg;
			fputcsv($fh,array_keys($r));
			fputcsv($fh,array_values($r));
            return(false);
        }
        $sth = mysqli_query($this->link,$query);
        $row_cnt = mysqli_num_rows($sth);
        if($row_cnt == 0)
        {
            $response["error"] = "1";
            $response["error_msg"] = "Empty record set.";
			fputcsv($fh,array_keys($r));
			fputcsv($fh,array_values($r));
            return(false);
        }
		$start = FALSE;
        while($r = mysqli_fetch_assoc($sth))
        {
			if($start == FALSE)
			{
				$start = TRUE;
				fputcsv($fh,array_keys($r));
			}
			fputcsv($fh,array_values($r));
        }
        return(true);
    }
/**********************************************************************************************************/

	private function get_db_count($query)
    {
        if(!$this->link)
        {
            $response["error"] = "1";
            $response["error_msg"] = $this->error_msg;
            echo json_encode($response);
            return(false);
        }
        $sth = mysqli_query($this->link,$query);
        $row_cnt = mysqli_num_rows($sth);
        return($row_cnt);
    }
/**********************************************************************************************************/

	private function get_db_array($query)
    {
		$row_set = array();
        if(!$this->link)
        {
            $response["error"] = "1";
            $response["error_msg"] = $this->error_msg;
            echo json_encode($response);
            return(false);
        }
        $sth = mysqli_query($this->link,$query);
        $row_cnt = mysqli_num_rows($sth);
        if($row_cnt == 0)
        {
            $response["error"] = "1";
            $response["error_msg"] = "Empty record set.";
            echo json_encode($response);
            return(false);
        }
        while($r = mysqli_fetch_assoc($sth))
        {
			$row_set[] = $r;
        }
		echo json_encode($row_set);
        return(true);
    }
/**********************************************************************************************************/

	public function login_check()
	{
		return(true);
	}
/**********************************************************************************************************/

	public function get_sample()
    {
        if(!$this->login_check())
            return(false);
		/* get data from DB here.. */
        //$query = "select <data> from <table>";
        if(!$this->get_db_array($query))
            return(false);
        return(true);
    }
/**********************************************************************************************************/
}
