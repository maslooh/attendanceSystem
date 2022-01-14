//this function validates names name (name should be between 3 to 8 charceters)
export function isnamevalid(name) {
    return (/^[a-z]{3,8}$/i).test(name)
}
//=================================================================================
//this function pushes an object(obj) to an item in localstorage (LocalStorageItem) 
//after checking if the item exists (if false creates the item)
export function pushToLocalStorage(LocalStorageItem,obj) {
    let arr = []
    arr=JSON.parse(localStorage.getItem(LocalStorageItem))
    if (arr == null) {
        localStorage.setItem(LocalStorageItem, "[]")
        arr=JSON.parse(localStorage.getItem(LocalStorageItem))
    }
    arr.push(obj)
    localStorage.setItem(LocalStorageItem,JSON.stringify(arr))
}
//========================================================================================
//this function checks an object memeber exists in localStorageItem return (true or false)
export function doesObjectExist(LocalStorageItem, member, value) {
    let arr = []
    arr = JSON.parse(localStorage.getItem(LocalStorageItem))
    if (arr == null) {
        return false
    }
    for (let i = 0; i < arr.length;i++){
        if (arr[i][member] == value) {
            return true;
        }
    }
    return false
}
//=========================================================================================
//sending email function
export function registerationEmail(_name,_email) {
    var templateParams = {
        to_name:_name,
        from_name: 'ITI',
        message: 'We have recived your registeration requist.Please wait for confirmation Email',
        user_email:_email
    }
    emailjs.send('service_n2xvsx2', 'template_rbfotek', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}
/**overload*/
export function sendEmail(_name,_email,_message) {
    var templateParams = {
        to_name:_name,
        from_name: 'ITI',
        message: _message,
        user_email:_email
    }
    emailjs.send('service_n2xvsx2', 'template_rbfotek', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}
//==========================================================================
/*this function takes a unique value, key, targeted key to return the value of the 
targeted key in the same object*/
export function valueGetter(sentValue,sentValueKey,targetedValueKey,localStorageItem) {
    let arr = JSON.parse(window.localStorage.getItem(localStorageItem))
    for (let i in arr) {
        if (arr[i][sentValueKey] == sentValue)
            return  arr[i][targetedValueKey]
    }
}
//==========================================================================
//this function gets user index by searching on a value 
export function getIndex(value, key,localStorageItem) {
    let arr = JSON.parse(window.localStorage.getItem(localStorageItem))
    for (let i in arr) {
        if (arr[i][key] == value)
            return  i
    }
}
//=============================================================================
//generate rendom user or password
export function generateRandom(length,lastSection="") {
    let alpha = "a0b1c2d3e4f5g6h7i8j9k0l1m4n2o3p5r6s7tuvwxyz"
    let username=""
    for (let i = 0; i < length; i++){
        let index = Math.floor(Math.random() * alpha.length)
        username+=alpha[index]
    }
    username+=lastSection
    return username
}

/*this function delets an object from local storage item*/
export function deleteObj(localStorageItem,index) {
    let requistList = JSON.parse(window.localStorage.getItem(localStorageItem))
    requistList.splice(index, 1)
    window.localStorage.setItem("confirmation",JSON.stringify(requistList))
}
/*logout function=========================================*/
export function logout() {
    window.localStorage.removeItem("currentuser")
    window.localStorage.removeItem("cookie")
    window.location="./index.html"
}
//===============================================================
export function sortAsce(arr,...layerNames) {
    arr.sort(function(p,n){
    let comp =""
    for (let i = 0; i < layerNames.length; i++) {
        comp+=`['${layerNames[i]}']`
        }
    let tlc=".toLocaleLowerCase()"
    let complt="p"+comp+tlc+"<"+"n"+comp+tlc
    let compgt = "p" + comp+tlc+ ">" + "n" + comp+tlc
    if(eval(complt))
    return -1;
    if(eval(compgt))
    return 1;
    return 0;})
}
export function sortDesc(arr,...layerNames) {
    arr.sort(function(p,n){
    let comp =""
    for (let i = 0; i < layerNames.length; i++) {
        comp+=`['${layerNames[i]}']`
        }
    let tlc=".toLocaleLowerCase()"
    let complt="p"+comp+tlc+"<"+"n"+comp+tlc
    let compgt = "p" + comp+tlc+ ">" + "n" + comp+tlc
    if(eval(compgt))
    return -1;
    if(eval(complt))
    return 1;
    return 0;})
}
//==================================================================
/**this function turns millisecondes into hour:minutes:secondes format */
export function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
 return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
//====================================================================

