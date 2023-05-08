function ReplaceList(json){
    var linkArray;
    for(i = 0; i < json.length; i++){
        if (json[i].type === "List") {
            json[i].type = "RichTextBox";
            linkArray = HandleInfromation(json[i].linkingInfo);
        }
        break;
    }
    return linkArray;
}

function HandleInfromation(linkingInfo){
    var linkArray;
    for(i = 0; i < liningInfo.length; i++){
        linkArray[i] = linkingInfo[i].ListLink;
    }
    return linkArray
}

function ReplaceDynamicText(){
    for(let key in obj){
        if(key === "dynamicText"){
            obj["text"] = obj[key];
            delete obj[key];
        }
        if (typeof obj[key] === "object") {
            replaceDynamicKeys(obj[key]);
        }

        
    }
}

function GetDynamicDataList(linkArray){
    
}

function GetDynamicData(link){
    
}

function dynamicText(){

}