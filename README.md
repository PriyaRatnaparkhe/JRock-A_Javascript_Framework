JRock is a javaScript framework which would allow the user to create some components, included but not limited to modals , accordians etc. Using JRock complex activities such as form validations can be performed without much trouble.Trouble here emphasises on the user's need to write the long and cumbursome javascript code.<br>
# Features:
1. Modal and Accordians can be created without any trouble.
2. A combo box can be populated by defining least possible code.
3. Form validations can be performed by mear declaration of properties using json .
4. Ajax  GET and POST requests can be handeled in an effective way.
# Steps to use JRock:
1. Download the zip file and unzip it.
2. After successfull unzip place the folders named as **js,css and images** in your root folder .
4. For using the features of this framework include the **js** and **css** file using the following commands<br>
```
<script src='js/JRock.js'></script>
<link rel="stylesheet" href="css/JRock.css">
```

# Demo Examples with respective codes and Output screenshots showing the correct way of usage .

## Get Type Request
```
<!doctype html>
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>JRock Demo </title>
<script src='js/JRock.js'></script>
<script>
// JRock user script starts here
function getDesignation()
{
let titleSpan=$$$("title");
titleSpan.html("");
let code=$$$("code").value();
$$$.ajax({
"url":"servletTwo",
"data":{
"code":code
},
"methodType":"GET",
"success":function(responseData){
if(responseData=="INVALID")
{
alert("Invalid designation code");
}
else
{
var splits=responseData.split(",");
titleSpan.html(splits[1]);
}
},
"failure":function(){
alert("Some problem");
}
});
}
//JRock user script ends here
</script>
</head>
<body>
<h2>Get type request with data example</h2>
Enter code <input type='text' id='code'>
<button type='button' onclick='getDesignation()'>Get Designation</button><br>
<br>
Title <span id='title'></span>
<br>
<!--<a href='index.html'>Home</a>-->
</body>
</html>
```
## Output 
### If the Designation Code is valid:<br><img width="335" alt="GetTypeRequestExample1" src="https://user-images.githubusercontent.com/82965104/131242561-31d08cc7-99ee-47f8-9c28-4e9217429fa7.png">
### If the Designation code is invalid:<br>
![GetTypeRequestExample2 (2)](https://user-images.githubusercontent.com/82965104/131242579-5b9e7275-2c41-4e1e-9d82-a1723a895c61.png)

## Post Type Request
```
<!doctype html>
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>JRock Demo</title>
<script src='js/JRock.js'></script>
<script>
//JRock user script starts here
function saveEnquiry()
{
var firstName=$$$("firstName").value();
var lastName=$$$("lastName").value();
var age=$$$("age").value();
var customer={
"firstName":firstName,
"lastName":lastName,
"age":age
};
var whatever=$$$("whatever");
whatever.html("");
$$$.ajax({
"methodType":"POST",
"url":"servletThree",
"data":customer,
"success":function(responseData){
var customer=JSON.parse(responseData);
var a="First Name:"+customer.firstName+"<br>";
a=a+"Last Name:"+customer.lastName+"<br>";
var a=a+"Age:"+customer.age;
whatever.html(a);
},
"failure":function(){
alert("Some problem");
}
});
}
//JRock user script ends here
</script>
</head>
<body>
<h2>Post type request example</h2>
First Name<br><input type='text' id='firstName'><br>
Last Name<br><input type='text' id='lastName'><br>
Age<br><input type='text' id='age'><br>
<br>
<button type='button' onclick='saveEnquiry()'>Save</button>
<div id='whatever'></div>
<br>
<!--<a href='index.html'>Home</a>-->
</body>
</html>
```
### Output
![PostTypeRequestExample (2)](https://user-images.githubusercontent.com/82965104/131242640-7b1049eb-032e-4e41-9576-4378d77d9c2f.png)

## Fill combo Box
```
<!doctype html>
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>JRock Demo</title>
<script src='js/JRock.js'></script>
<script>
//JRock user script starts here
function populateDesignations()
{
$$$.ajax({
"url":"servletOne",
"methodType":"GET",
"success":function(responseData){
var designations=JSON.parse(responseData);
$$$("designationCode").fillComboBox({
"dataSource":designations,
"text": "title",
"value":"code",
"firstOption":{
"text":"<select designation>",
"value": "-1"
}
});
},
"failure":function(){
alert("Some problem");
}
});
}
//JRock user script ends here
window.addEventListener('load',populateDesignations);
</script>
</head>
<body>
<h2>Fill Combo Box Example</h2>
<select id='designationCode'>
</select><br>
<!--<a href='index.html'>Home</a>-->
</body>
</html>
```
### Output
![FillComboBoxExample (2)](https://user-images.githubusercontent.com/82965104/131243295-c2d821b4-239d-4dda-b8be-494f86f6bc60.png)

## Form Validation Example
```
<!doctype html>
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>Form Validations</title>
<script src='js/JRock.js'></script>
<script>
//JRock user script starts here
function doSomething()
{
return $$$("someForm").isValid(
{
"nm":{
"required":true,
"max-length":20,
"error-pane":"nmErrorSection",
"errors":{
"required":"Name required",
"max-length":"Name cannot exceed 20 characters"
}
},
"ad":{
"required":true,
"error-pane":"adErrorSection",
"errors":{
"required":"Address required"
}
},
"ct":{
"invalid":-1,
"error-pane":"ctErrorSection",
"errors":{
"invalid":"Select City"
}
},
"gender":{
"required":true,
"error-pane":"genderErrorSection",
"errors":{
"required":"Select gender"
}
},
"agree":{
"required-state":true,
"display-alert":true,
"errors":{
"required-state":"Select I agree checkbox"
}
}
}
);
}
// JRock user script ends here
</script>
</head>
<body>
<h1>Form Validations</h1>
<form id='someForm' onsubmit='return doSomething()'>
<b>Name</b><br>
<input type='text' name='nm' id='nm'><br><span id='nmErrorSection'></span><br><br>
<b>Address</b><br>
<textarea name='ad' id='ad'></textarea><br>
<span id='adErrorSection'></span><br><br>
<b>Select City</b><br> <select id='ct' name='ct'>
<option value='-1'>Select City</option>
<option value='1'>Ujjain</option>
<option value='2'>Dewas</option>
<option value='3'>Indore</option>
</select><br>
<span id='ctErrorSection'></span><br><br>
<b>Gender</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Male <input type='radio' name='gender' id='ml' value='M'>
&nbsp;&nbsp;&nbsp;&nbsp;
Female <input type='radio' name='gender' id='fe' value='F'><br>
<span id='genderErrorSection'></span><br><br>
<input type='checkbox' name='agree' id='ag' value='Y'>I agree<br><br>
<button type='submit'>Register</button>
</form>
</body>
</html>
```
### Output
![FormValidationsExamples (3)](https://user-images.githubusercontent.com/82965104/131243072-49536b8a-0170-43c8-ab5c-dd8c921b3ff2.png)

## Accordian Demo
```
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>JRock Accordian Demo Example</title>
<script src='js/JRock.js'></script>
<link rel='stylesheet' href='css/JRock.css'>
</head>
<body>
<H1>Accordian Demo Example</H1>
<div accordian="true">
<h3 accordianHeaderBackgroundColor='#b0aac0'>Heading1</h3>
<div accordianBackgroundColor='#c2d4dd'>
1 Whatever whatever whatever<br>
2 Whatever whatever whatever<br>
3 Whatever whatever whatever<br>
</div>
<h3 accordianHeaderBackgroundColor='#b0aac0'>Heading2</h3>
<div accordianBackgroundColor='#c2d4dd'>
11 Whatever whatever whatever<br>
22 Whatever whatever whatever<br>
33 Whatever whatever whatever<br>
</div>
<h3 accordianHeaderBackgroundColor='#b0aac0'>Heading3</h3>
<div accordianBackgroundColor='#c2d4dd'>
111 Whatever whatever whatever<br>
222 Whatever whatever whatever<br>
333 Whatever whatever whatever<br>
</div>
</div>
<br><br><br>
<div accordian="true">
<h3>Heading1000</h3>
<div>
1 Whatever whatever whatever<br>
2 Whatever whatever whatever<br>
3 Whatever whatever whatever<br>
</div>
<h3>Heading2000</h3>
<div>
11 Whatever whatever whatever<br>
22 Whatever whatever whatever<br>
33 Whatever whatever whatever<br>
</div>
<h3>Heading3000</h3>
<div>
111 Whatever whatever whatever<br>
222 Whatever whatever whatever<br>
333 Whatever whatever whatever<br>
</div>
</div>
</body>
</html>
```
### Output
![AccordianExample (2)](https://user-images.githubusercontent.com/82965104/131242772-7849fd69-e3a9-4ddb-9ef8-51f458c2ed12.png)

## Modal Demo Example
```
<!doctype html>
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>JRock Modal Demo</title>
<script src='js/JRock.js'></script>
<link rel='stylesheet' href='css/JRock.css'>
<script>
// JRock user script starts here
function abBeforeOpening()
{
alert("Modal with ab is about to be opened");
return true;
}
function abBeforeClosing()
{
alert("Modal with ab is about to be closed");
return true;
}
function abOpened()
{
alert("Modal with ab opened");
}
function abClosed()
{
alert("Modal with ab closed");
}
function createModal1()
{
$$$.modals.show("ab");
}
// JRock user script ends here
</script>
</head>
<body>
<h2>Modal </h2>
<button style='text-align:center;background-color:#4CAF50;color:white;padding:14px 40px;border:0.5px blue;display:inline-block;text-align:center;text-decoration:none;font-size:12pt;cursor:pointer;' onclick='createModal1()'>Show modal</button>
<div id='ab' closeOnMaskClick="TRUE" style="display:none" forModal='True' size="500x200" header="Some Heading" footer="Some Footer" maskColor="#00CED1" modalBackgroundColor="#20B2AA" closeButton="true" beforeOpening="abBeforeOpening()" afterOpening="abOpened()" beforeClosing="abBeforeClosing()" afterClosing="abClosed()">
God is great<br>
God is great<br>
<input type="text" id="myTextBox" value="Great"><br>
God is great<br>
God is great<br>
God is great<br>
God is great<br> 
God is great<br>
God is great<br>
God is great<br>
God is great<br>
God is great<br>
Last Line<br>
</div>
</body>
</html>
```

### Output
![ModalExample (2)](https://user-images.githubusercontent.com/82965104/131242828-d00ed063-a9d6-42bd-b462-a99d48c9600e.png)
