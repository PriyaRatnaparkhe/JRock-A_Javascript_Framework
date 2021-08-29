//JRock library part starts here
// cid represents Id of a component
function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw"Invalid id: "+cid;
return new JRockElement(element);
}
$$$.model={
"onStartup":[],
"accordians":[],
"modals":[]
};
$$$.modals={};
// Modal specific code starts here
$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return ;
modal.show();
}
// Modal is a class
function Modal(cref)
{
var objectAddress=this;
this.afterOpening=null;
this.beforeOpening=null;
this.afterClosing=null;
this.beforeClosing=null;
var contentReference=cref;
this.getContentId=function(){
return contentReference.id;
}
var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display="none";
modalMaskDivision.classList.add("jrock_modalMask");
var modalDivision=document.createElement("div");
modalDivision.style.display="none";
modalDivision.classList.add("jrock_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);
var headerDivision=document.createElement("div");
headerDivision.style.background=maskColor;
headerDivision.style.right="0px";
headerDivision.style.left="0px";
headerDivision.style.height="40px";
headerDivision.style.padding="5px";
headerDivision.style.textAlign="justify";
headerDivision.style.fontSize="18pt";
headerDivision.style.paddingTop="15px";
headerDivision.style.borderBottom="1px dotted ";
headerDivision.style.borderBottomColor="solid black";
modalDivision.appendChild(headerDivision);
var contentDivision=document.createElement("div");
if(contentReference.hasAttribute("size"))
{
var size=contentReference.getAttribute("size");
let positionOfX=size.indexOf("x");
if(positionOfX==-1) size.indexOf("X");
if(positionOfX==-1) throw"In case of modal size should be in form of widthxheight";
if(positionOfX==0 || positionOfX==size.length-1) throw"In case of modal size should be in form of widthxheight";
let width=size.substring(0,positionOfX);
var height=size.substring(positionOfX+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=parseInt(height)+140+"px";
contentDivision.style.height=height+"px";
}
else
{
modalDivision.style.width="400px";
modalDivision.style.height="400px";
contentDivision.style.height="260px";
}
contentDivision.style.border="0.25px modalBackgroundColor";
//contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-137)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";
contentDivision.style.textAlign="justify";
contentDivision.style.paddingTop="15px";
if(contentReference.hasAttribute("header"))
{
var header=contentReference.getAttribute("header");
headerDivision.innerHTML=header;
}
if(contentReference.hasAttribute("maskColor"))
{
var maskColor=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=maskColor;
}
if(contentReference.hasAttribute("modalBackgroundColor"))
{
var modalBackgroundColor=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=modalBackgroundColor;
}
contentReference.remove();
contentDivision.appendChild(contentReference);
modalDivision.appendChild(contentDivision);
contentReference.style.display="block";
contentReference.style.visiblity="visible";
var footerDivision=document.createElement("div");
footerDivision.style.background="maskColor";
footerDivision.style.right="0px";
footerDivision.style.left="0px";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.textAlign="justify";
footerDivision.style.fontSize="18pt";
footerDivision.style.paddingTop="15px";
footerDivision.style.padding="5px";
footerDivision.style.borderTop="0.5px dotted ";
footerDivision.style.borderTopColor="solid black";
modalDivision.appendChild(footerDivision);
if(contentReference.hasAttribute("footer"))
{
var footer=contentReference.getAttribute("footer");
footerDivision.innerHTML=footer;
}
var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var closeButton=contentReference.getAttribute("closeButton");
if(closeButton.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement("span");
closeButtonSpan.classList.add("jrock_closeButton");
var closeButtonMarker=document.createElement("img");
closeButtonMarker.src='images/Button-Close-icon.png';
closeButtonMarker.alt='cancelButton';
closeButtonMarker.style.height="auto";
closeButtonMarker.style.maxWidth="100%";
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}
if(contentReference.hasAttribute("beforeOpening"))
{
var beforeopen=contentReference.getAttribute("beforeOpening");
this.beforeOpening=beforeopen;
}
if(contentReference.hasAttribute("afterOpening"))
{
var onopen=contentReference.getAttribute("afterOpening");
this.afterOpening=onopen;
}
if(contentReference.hasAttribute("afterClosing"))
{
var onclose=contentReference.getAttribute("afterClosing");
this.afterClosing=onclose;
}
if(contentReference.hasAttribute("beforeClosing"))
{
var beforeclose=contentReference.getAttribute("beforeClosing");
this.beforeClosing=beforeclose;
}
this.show=function(){
let openModal=true;
if(objectAddress.beforeOpening)
{
openModal=eval(objectAddress.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display="block";
modalDivision.style.display="block";
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};
if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalMaskDivision.style.display="none";
modalDivision.style.display="none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
}
}
if(contentReference.hasAttribute("closeOnMaskClick"))
{
var closeonmaskclick=contentReference.getAttribute("closeOnMaskClick");
modalMaskDivision.onclick=function(){
if(closeonmaskclick.toUpperCase()=="TRUE")
{
let close=true;
if(objectAddress.beforeClosing)
{
close=eval(objectAddress.beforeClosing);
}
if(close)
{
modalMaskDivision.style.display="none";
modalDivision.style.display="none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
}
}
}
}// Modal specific code ends here
// Accordian specific code starts here
$$$.accordianHeadingClicked=function(accordianIndex,panelIndex){
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display="none";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.width="89%";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.height="auto";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.padding="5px";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.border="0.5px solid black";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.marginTop="-3px";
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}
// aid represents Id of a component which needs to be converted to accordian
$$$.toAccordian=function(accord)
{
let panels=[];
let expandedIndex=-1;
if(document.getElementById(accord)!=null)
{
accord=document.getElementById(accord);
}
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++) 
{
if(children[x].nodeName=="H1")
{
panels[panels.length]=children[x];
children[x].style.margin="0px";
children[x].style.width="89%";
children[x].style.padding="5px";
children[x].style.border="1px solid white";
children[x].style.cursor="pointer";
if(children[x].hasAttribute("accordianHeaderBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianHeaderBackgroundColor");
else  children[x].style.background="#20B2AA";
}
if(children[x].nodeName=="H2")
{
panels[panels.length]=children[x];
children[x].style.margin="0px";
children[x].style.width="89%";
children[x].style.padding="5px";
children[x].style.border="1px solid white";
children[x].style.cursor="pointer";
if(children[x].hasAttribute("accordianHeaderBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianHeaderBackgroundColor");
else  children[x].style.background="#20B2AA";
}
if(children[x].nodeName=="H3")
{
panels[panels.length]=children[x];
children[x].style.margin="0px";
children[x].style.width="89%";
children[x].style.padding="5px";
children[x].style.border="1px solid white";
children[x].style.cursor="pointer";
if(children[x].hasAttribute("accordianHeaderBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianHeaderBackgroundColor");
else  children[x].style.background="#20B2AA";
}
if(children[x].nodeName=="H4")
{
panels[panels.length]=children[x];
children[x].style.margin="0px";
children[x].style.width="89%";
children[x].style.padding="5px";
children[x].style.border="1px solid white";
children[x].style.cursor="pointer";
if(children[x].hasAttribute("accordianHeaderBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianHeaderBackgroundColor");
else  children[x].style.background="#20B2AA";
}
if(children[x].nodeName=="H5")
{
panels[panels.length]=children[x];
children[x].style.margin="0px";
children[x].style.width="89%";
children[x].style.padding="5px";
children[x].style.border="1px solid white";
children[x].style.cursor="pointer";
if(children[x].hasAttribute("accordianHeaderBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianHeaderBackgroundColor");
else  children[x].style.background="#20B2AA";
}
if(children[x].nodeName=="H6")
{
panels[panels.length]=children[x];
children[x].style.margin="0px";
children[x].style.width="89%";
children[x].style.padding="5px";
children[x].style.border="1px solid white";
children[x].style.cursor="pointer";
if(children[x].hasAttribute("accordianHeaderBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianHeaderBackgroundColor");
else  children[x].style.background="#20B2AA";
}
if(children[x].nodeName=="DIV")
{
panels[panels.length]=children[x];
if(children[x].hasAttribute("accordianBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianBackgroundColor");
else  children[x].style.background="#90EE90";
}
}
if(panels.length%2!=0) throw"Headings and divisions malformed to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H1")
{
if(panels[x].nodeName!="H2")
{
if(panels[x].nodeName!="H3")
{
if(panels[x].nodeName!="H4")
{
if(panels[x].nodeName!="H5")
{
if(panels[x].nodeName!="H6")
{
throw"Headings and divisions malformed to create accordian";
}
}
}
}
}
}
if(panels[x+1].nodeName!="DIV")throw"Headings and divisions malformed to create accordian";
}
function createClickHandler(accordianIndex,panelIndex){
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}
let accordianIndex=$$$.model.accordians.length;
for(var panelIndex=0;panelIndex<panels.length;panelIndex+=2)
{
panels[panelIndex].onclick=createClickHandler(accordianIndex,panelIndex);
panels[panelIndex+1].oldDisplay=panels[panelIndex+1].style.display;
panels[panelIndex+1].style.display="none";
}
$$$.model.accordians[accordianIndex]={
"panels":panels,
"expandedIndex":-1
};
}
$$$.onDocumentLoaded=function(func){
if((typeof(func))!="function") throw"Expected function,found"+(typeof(func))+"in call to onDocumentLoaded";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}
$$$.initFramework=function(){
let allTags=document.getElementsByTagName("*");
let i=0;
let aTag=null;
let getAttrOfATag;
for(i=0;i<allTags.length;i++)
{
aTag=allTags[i];
if(aTag.hasAttribute("accordian"))
{
getAttrOfATag=aTag.getAttribute("accordian");
if(getAttrOfATag=="true")
{
$$$.toAccordian(aTag);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}
// setting modal specific code starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
}// setting modal specific code ends here
}//initFramework code ends here
//JRock is a class representing an element
function JRockElement(element)
{
this.element=element;
this.html=function(content){
if((typeof(this.element.innerHTML))=="string")
{
if((typeof(content))=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
}// html function ends
this.value=function(content){
if((typeof(this.element.value))=="string")
{
if((typeof(content))=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
}//value function ends
this.fillComboBox=function(jsonObject){
if(this.element.nodeName!="SELECT") throw "fillComboBox can only be called on a SELECT type objects only";
let dataSource=jsonObject["dataSource"];
if(!dataSource) throw "dataSource property is missing in call to fillComboBox";
let text=jsonObject["text"];
if(!text) throw "text property is missing in call to fillComboBox";
let value=jsonObject["value"];
if(!value) throw "value property is missing in call to fillComboBox";
if((typeof(dataSource))!="object") throw "dataSource property should be a collection in call to fillComboBox";
if((typeof(text))!="string") throw "text property should be of string type in call to fillComboBox";
if((typeof(value))!="string") throw "value property should be of string type in call to fillComboBox";
// just to check if the object has property specified against text and value
if(dataSource[0].hasOwnProperty(text)==false) throw "text property should be a part of collection defined against dataSource in call to fillComboBox";
if(dataSource[0].hasOwnProperty(value)==false) throw "value property should be a part of collection defined against dataSource in call to fillComboBox";
var firstOption=jsonObject["firstOption"];
var length=this.element.options.length;
var comboBoxElement;
if(length!=0)
{
let i;
for(i=length-1;i>=0; i--) 
{
this.element.options[i]=null;
}
}
if(firstOption)
{
var firstOptionKeysLength=Object.keys(firstOption).length;
if(firstOptionKeysLength!=2) throw"First Option can have only two properties namely (text),(value)";
var firstOptionText=firstOption["text"];
var firstOptionValue=firstOption["value"];
if(!firstOptionText) throw "text property is missing against firstOption property in call to fillComboBox";
if(!firstOptionValue)throw "value property is missing against firstOption property in call to fillComboBox";
if((typeof(firstOptionText))!="string") throw "text property against firstOption property should be of type string in call to fillComboBox";
if((typeof(firstOptionValue))!="string") throw "value property against firstOption property should be of type string in call to fillComboBox";
comboBoxElement=document.createElement("option");
comboBoxElement.value=firstOptionValue;
comboBoxElement.text=firstOptionText;
this.element.appendChild(comboBoxElement);
}
for(var i=0;i<dataSource.length;i+=1)
{
comboBoxElement=document.createElement("option");
comboBoxElement.value=dataSource[i][value];
comboBoxElement.text=dataSource[i][text];
this.element.appendChild(comboBoxElement);
}
}//fillComboBox ends
this.isValid=function(data){
var y,inputType;
var flag=true;
var keys=Object.keys(data);
for(y=0;y<keys.length;y++)
{
inputType=document.getElementsByName(keys[y])[0].type;
if(inputType=="text")
{
var textErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
textErrorSection.innerHTML="";
var name=document.getElementsByName(keys[y])[0].value;
if(data[keys[y]]["required"]==true)
{
if(name.length==0) 
{
textErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
textErrorSection.style="color:red";
textErrorSection.innerHTML=data[keys[y]]["errors"]["required"];
flag=false;
}
}
if(name.length>data[keys[y]]["max-length"])
{
textErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
textErrorSection.innerHTML=data[keys[y]]["errors"]["max-length"];
textErrorSection.style="color:red";
flag=false;
}
}
if(inputType=="textarea")
{
var textAreaErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
textAreaErrorSection.innerHTML="";
if(data[keys[y]]["required"]==true)
{
var rr=document.getElementsByName(keys[y])[0].value;
if(rr.length==0) 
{
textAreaErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
textAreaErrorSection.style="color:red";
textAreaErrorSection.innerHTML=data[keys[y]]["errors"]["required"];
flag=false;
}
}
}
if(inputType=="select-one")
{
var selectOneErrorSection=document.getElementById(data[keys[y]]["error-pane"])
selectOneErrorSection.innerHTML="";
var val=document.getElementsByName(keys[y])[0].value;
var invalidValue=data[keys[y]]["invalid"];
if(val==invalidValue)
{
selectOneErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
selectOneErrorSection.style="color:red";
selectOneErrorSection.innerHTML=data[keys[y]]["errors"]["invalid"];
flag=false;
}
}
if(inputType=="radio")
{
var isChecked=false;
var radioErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
radioErrorSection.innerHTML="";
if(data[keys[y]]["required"]==true)
{
var options=document.getElementsByName(keys[y]);
for(var i=0;i<options.length;i++) 
{
if(options[i].checked) isChecked=true;
}
if(isChecked==false)
{
var radioErrorSection=document.getElementById(data[keys[y]]["error-pane"]);
radioErrorSection.style="color:red";
radioErrorSection.innerHTML=data[keys[y]]["errors"]["required"];
flag=false;
}
}
}
if(inputType=="checkbox")
{
var rr=document.getElementsByName(keys[y])[0];
if(data[keys[y]]["required-state"]==true)
{
if(data[keys[y]]["display-alert"]==true)
{
if(rr.checked==false)
{
alert(data[keys[y]]["errors"]["required-state"]);
flag=false;
}
}
}
}
}
return flag;
}// isValid ends here
}//class JRock ends
$$$.ajax=function(jsonObject)
{
if(!jsonObject["url"])throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if((typeof(url))!="string")throw "url property should be of string type in call to ajax";
let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof(methodType))!="string") throw"methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false)throw"methodType should be GET/POST in call to ajax";
}
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof(onSuccess))!="function") throw"sucess property should be a function in call to ajax";
let successParameterLength=onSuccess.length;
if(successParameterLength!=1) throw"the function defined against success property should have only parameter in call to ajax";
}
let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof(onFailure))!="function") throw"failure property should be a function in call to ajax";
let failureParameterLength=onFailure.length;
if(failureParameterLength!=0) throw"the function defined against failure property should not have any parameter in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let queryStringName;
let queryStringValue;
let xx=0;
for(k in jsonData)
{
if(xx==0)queryString="?";
if(xx>0) queryString=queryString+"&";
xx++;
queryStringName=encodeURI(k);
queryStringValue=encodeURI(jsonData[k]);
queryString=queryString+queryStringName+"="+queryStringValue;
}
url=url+queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
}// Get Part ends here
if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
let jsonData={};
if(jsonObject["data"])
{
jsonData=jsonObject["data"];
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
}
window.addEventListener('load',function(){
$$$.initFramework();
});
// JRock library part ends here