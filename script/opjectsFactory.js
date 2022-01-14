import { msToTime,valueGetter } from "./generic.js"
export function user(_fname, _lname, _address, _age, _email, _userName,_password, _title = "employee") {
    return {
        'First Name': _fname,
        'Last Name': _lname,
        Title: _title,
        Email: _email,
        Address: _address,
        Age: _age,
        Username: _userName,
        Password:_password
    }
}

export function userFromRequist(confirmationObj,_username,_password,title="empolyee") {
    return {
        'First Name': confirmationObj.Fname,
        'Last Name': confirmationObj.Lname,
        Title: title,
        Email: confirmationObj.Email,
        Address: confirmationObj.Address,
        Age: confirmationObj.Age,   
        Username: _username,
        Password:_password
    }
}
export function confirmation(_fname,_lname,_address,_age,_email) {
    return {
        Fname: _fname ,
        Lname: _lname,
        Address: _address,
        Age: _age,
        Email: _email,
    }
}
// export function attendance(_userName) {
//     let attendanceDate = new Date()
//     let startTime = new Date()
//     startTime.setHours('8', '30', '00')
//     let empDelay = msToTime(attendanceDate - startTime)
//     let fname = valueGetter(_userName, 'Username', 'First Name', "users")
//     let lname = valueGetter(_userName,'Username','Last Name',"users")
//     return {
//         date: attendanceDate.toLocaleDateString(),
//         "Full Name":`${fname+" "+lname}`,
//         Username: _userName,
//         attendance: attendanceDate.toLocaleTimeString(),
//         departure: '--:--:--',
//         delay: empDelay,
//         Status: (empDelay) > "00:30:00" ? "absent by delay" :
//                 (empDelay) > "00:15:00" ? "late" : "In Time"
//     }
// }
export function attendance2(_userName) {
    let attendanceDate = new Date()
    let fname = valueGetter(_userName, 'Username', 'First Name', "users")
    let lname = valueGetter(_userName,'Username','Last Name',"users")
    return {
        date: attendanceDate.toLocaleDateString(),
        "Full Name":`${fname+" "+lname}`,
        Username: _userName,
        attendance:'--:--:--',
        departure: '--:--:--',
        delay: '--:--:--',
        Status: 'absent'
    }
}


