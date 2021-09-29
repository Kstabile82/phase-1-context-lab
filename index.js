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
    //console.log(this.firstName); 
} 

function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(function(employee) {
        return createEmployeeRecord(employee); 
    })
}
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    let newObj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),   
        date
    }; 
    this.timeInEvents.push(newObj)
   return this; 
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    let newObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10), 
        date
    }; 
    this.timeOutEvents.push(newObj);
    return this; 
}

function hoursWorkedOnDate(date) {
    return (this.timeOutEvents.find(event => event.date === date).hour - this.timeInEvents.find(event => event.date === date).hour)/100; 
    
}
function wagesEarnedOnDate(date) {
   return (this.payPerHour * hoursWorkedOnDate.call(this, date));
    
}

function calculatePayroll(records) {
    // const calcPay = this.map((employee) => { 
    //     return employee.timeInEvents.map((event) => wagesEarnedOnDate(this, event.date))
    // })
    return records.reduce((total, employee) => {
        
        return total + allWagesFor.call(employee);
}, 0)
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

