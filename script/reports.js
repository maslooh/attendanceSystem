import { sortAsce, sortDesc,valueGetter } from "./generic.js"
import { user } from "./opjectsFactory.js"

/**this class makes table from array of objects with the option of hiding choosen key*/
export class tableFromObject {
    #tableNode
    #header = []
    #dataList
    #thead
    #tbody
    constructor(objList, ...hidden) {
        if (hidden != null) {
            objList.forEach((ele) => {
                for (let i in hidden)
                    delete ele[hidden[i]];
            })
        }   
        this.#dataList = objList
        this.#header = Object.keys(objList[0])
        this.#tableNode = document.createElement('table')
        this.#tbody = document.createElement('tbody')
        this.#thead = document.createElement('thead')
        this.#tableNode.appendChild(this.#thead)
        this.#tableNode.appendChild(this.#tbody)
    }
    appendtd(content, trNode, _class ='') {
        let td = document.createElement('td')
        td.setAttribute("class",_class)
        td.innerHTML = `${content}`
        trNode.appendChild(td)
    }
    appendtr(node,...contentList) {
        let trNode = document.createElement('tr')
        // trNode.setAttribute("id",_id)
        for (let i in contentList) {
            this.appendtd(contentList[i],trNode,Object.keys(this.#dataList[0])[i])
        }
        node.appendChild(trNode)
    }
    appendHeader() {
        this.appendtr(this.#thead,...this.#header)
    }
    appendData() {
        for (let i in this.#dataList) {
            this.appendtr(this.#tbody,...Object.values(this.#dataList[i]))
        }
    }
    getTableNode() {
        return this.#tableNode
    }
    appendTable(containerNode) {
        containerNode.appendChild(this.#tableNode)
    }
    addSorting() {
        let headerchildren = [...this.#thead.getElementsByTagName('tr')[0].children]
        let myobj=this//storing pointer to the current class object to access eventhandler
        headerchildren.forEach((ele,i) => {
            ele.insertAdjacentHTML('beforeend', '&nbsp;<i class="fas fa-sort"></i>')
            let sortOrder = 0
            ele.addEventListener("click", function (e) {
                sortOrder++
                if(sortOrder==1){//ascending---------------
                    sortDesc(myobj.#dataList, myobj.#header[i])
                }
                else//descending--------------------
                {
                    sortOrder=0
                    sortAsce(myobj.#dataList, myobj.#header[i])
                }
                myobj.#tbody.innerHTML=''
                myobj.appendData()
            })
        })
    }
}
//===================================================================================
export function getDailyReport(username) {
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    let reportList=[]
    for (let i in attendanceList) {
        if (attendanceList[i]["Username"] ==username)
        {
            reportList.push(attendanceList[i])
        }
    }
    let dailyReport = new tableFromObject(reportList, 'Username')
    dailyReport.appendHeader()
    dailyReport.appendData()
    dailyReport.addSorting()
    return dailyReport.getTableNode()
}
//=================================================================================
export function getMonthlyReport(_username) {
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    let startMonth = attendanceList[0]['date'].slice(0, 2).split('/')[0]
    let report = []
    let monthRow = {
        month: '',
        'full name': valueGetter(_username, "Username", "Full Name", 'attendance'),
        'abcence days':0,
        'late days':0,
        'in time days':0
    }
    attendanceList.forEach(ele => {
        if (ele.Username == _username) {
            if (ele['date'].slice(0, 2).split('/')[0] != startMonth) {
                let row = { ...monthRow }
                monthRow['abcence days'] = 0
                monthRow['late days']=0
                monthRow['in time days']=0
                report.push(row)
                startMonth = ele['date'].slice(0, 2).split('/')[0]
            }
            monthRow.month = ele['date'].slice(0, 2).split('/')[0]
            switch (ele.Status) {
                case "absent by delay":
                case 'absent':
                    monthRow['abcence days']++
                    break
                case "late":
                    monthRow['late days']++
                    break
                case "In Time":
                    monthRow['in time days']++
                    break
            }
        }
    });
    report.push(monthRow)
    let monthlyReport = new tableFromObject(report)
    monthlyReport.appendHeader()
    monthlyReport.appendData()
    monthlyReport.addSorting()
    return monthlyReport.getTableNode()
}
//=================================================================================
export function getLateReport() {
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    let employeeList = JSON.parse(window.localStorage.getItem("users"))
    let report=[]
    employeeList.forEach(ele => { 
        let row = {
            'full name': "",
            'username':0,
            'total late days':0,
        }
        row['full name'] = ele["First Name"]+" "+ele["Last Name"]
        row.username = ele.Username
        attendanceList.forEach(innerele => {
            if (innerele.Username = ele.Username && innerele.Status == "late")
                row['total late days']++
        });
        report.push(row)
    })
    let lateReport = new tableFromObject(report)
    lateReport.appendHeader()
    lateReport.appendData()
    lateReport.addSorting()
    return lateReport.getTableNode()
}
//================================================================================
export function getExcuseReport() {
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    let employeeList = JSON.parse(window.localStorage.getItem("users"))
    let report=[]
    employeeList.forEach(ele => { 
        let row = {
            'full name': "",
            'username':0,
            'total absence days':0,
        }
        row['full name'] = ele["First Name"]+" "+ele["Last Name"]
        row.username = ele.Username
        attendanceList.forEach(innerele => {
            if (innerele.Username == ele.Username
                && (innerele.Status == "absent"||innerele.Status == "absent by delay"))
                row['total absence days']++
        });
        report.push(row)
    })
    let lateReport = new tableFromObject(report)
    lateReport.appendHeader()
    lateReport.appendData()
    lateReport.addSorting()
    return lateReport.getTableNode()
}