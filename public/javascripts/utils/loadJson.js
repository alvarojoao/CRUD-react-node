var Utils = {
    loadJSON: function(url,callback,progress) {   
        
        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.addEventListener("progress", progress, false);
        xobj.send(null);  

    },
    sendJSON: function(url,method,data,callback,errorCallback) {   
        
        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open(method, url, true); // Replace 'my_data' with the path to your file
        xobj.setRequestHeader("Content-Type", "application\/json");
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText,data.object);
              }else if(xobj.readyState == 4 && xobj.status == "400"){
                errorCallback(xobj.responseText,data.object);
              }
        };

        xobj.send(JSON.stringify(data.data));  
    }
}
module.exports = Utils;
