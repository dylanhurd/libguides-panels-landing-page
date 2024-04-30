# LibGuides Panels Landing Page


Upload **research-guides-front.css**, **research-guides-front.js** and **api-connection.php** to a web server.

Reference **research-guides-front.css** and **research-guides-front.js** from your Custom JS/CSS section of Look and Feel in LibGuides admin.


## Edit research-guides-front.js

Add your guide information to the top of research-guides-front.js inside the subjectIDs object.

Each propery included in the object will appear as a panel. They will appear on the page in the same order they have in the object. Each property in the object should have the following format:
 
 **SubjectSlug**: {title: '**Publicly Displayed Subject Title**', faunicode: '**font awesome icon unicode**', subs: [**'comma','separated','list','of','guide','ids'**]},
 
 **SubjectSlug** is used only within the script -- just a brief, unique string of a-z characters.
 
 **Publicly Displayed Subject Title** is the label for each panel.
 
 **Font awesome icon unicode** is the unicode for the font awesome icon representing the subject -- appears below the title in the panel (same as you'd use in CSS, minus the beginning slash).
 
 **Comma separated list of guide ids** are the numeric ids for each guide you wish to assign to the subject (guides can be assigned to more than one subject).
 
 Example:
 
 ```
 const subjectIDs = {
 AgFood: {title: 'Agriculture & Food', faunicode: 'f06c', subs: ['96029','19781','19780','19782','19783','19784','19785','19813','19819','19826','19827','19828','19857','19859','19867','193310','193543', '19806']},
 
 ArtArch: {title: 'Art & Architecture', faunicode: 'f1ad', subs: ['96030','19788','19789','19832','19837','198480']},
 
 OpenEd: {title: 'Open Education', faunicode: 'f5d1', subs: ['189610']}
 };
 ```

Give the loader() function the URL of the api-connection.php script

 ```
function loader() {
  $.getJSON(
		"https://url-of-api-connection.php", // Set the URL of the api-connection.php script you uploaded to your webserver
 ```
  

 ## Edit api-connection.php
 
 In the Tools > API section of LibGuides, under API Authentication, create an application to get a client id and client secret.
 
 In the following block in api-connection.php, add your client id and client secret:
 
  ```
 function authenticate(){
		$post = [
    		"client_id" => "", // Your LibApps API Client ID <<
    		"client_secret" => "", // Your LibApps API Client Secret <<
    		"grant_type"   => "client_credentials",
		];
  ```
