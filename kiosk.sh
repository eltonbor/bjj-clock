#!/bin/bash

xset s noblank
xset s off
xset -dpms

xdotool mousemove 2000 2000

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences


(cd bjj-clock && git pull) || echo "Could not update bjj-clock project"


DISPLAY=:0 /usr/bin/chromium-browser \
	--noerrdialogs \
	--disable-infobars \
	--kiosk \
	"file://$(pwd)/bjj-clock/index.html" \
	&
