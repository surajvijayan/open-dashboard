#! /bin/sh

if [ $# -ne 1 ]
then
	echo "Usage: $0 <dashboard_pane>.inc"
	exit
fi
js_file=`echo $1|awk -F. '{print $1".js"}'`
php dashboard_create_js.php  dashboard_sample.inc > $js_file
