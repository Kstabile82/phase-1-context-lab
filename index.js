function createEmployeeRecord(emplArray) {
    const emplObj = { 
        firstName: emplArray[0], 
        familyName: emplArray[1], 
        title: emplArray[2], 
        payPerHour: emplArray[3], 
        timeInEvents: [], 
        timeOutEvents: [], 
    }
    return emplObj;     
} 

function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map((employee) => createEmployeeRecord(employee))
}
function createTimeInEvent(recordObj, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    let newObj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),   
        date
    }; 
    recordObj.timeInEvents.push(newObj)
    return recordObj; 
}

function createTimeOutEvent(recordObj, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    let newObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10), 
        date
    }; 
    recordObj.timeOutEvents.push(newObj);
    return recordObj; 
}

function hoursWorkedOnDate(emplRecordObj, date) {
    const timeIn = emplRecordObj.timeInEvents.find(event => event.date === date).hour
    const timeOut = emplRecordObj.timeOutEvents.find(event => event.date === date).hour
    return (timeOut-timeIn)/100; 
    
}
function wagesEarnedOnDate(emplRecordObj, date) {
        return emplRecordObj.payPerHour * hoursWorkedOnDate(emplRecordObj, date);
    
}

function calculatePayroll(emplRecordsArr) {
    const calcPay = emplRecordsArr.map((employee) => { 
        return employee.timeInEvents.map((event) => wagesEarnedOnDate(employee, event.date))
    })
    //rewrite calcpayroll using allwagesfor 
    
    return calcPay.map((employee) => {
       let totalVar = 0; 
       return totalVar += employee.reduce((total, amount) => total + amount)
    }).reduce((amount, total) => amount + total)

}
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

