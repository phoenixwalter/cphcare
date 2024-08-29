const calendar = document.getElementById("calendarDates");
const calendarHeader = document.getElementById("calendarHeader");
const modalHeader = document.getElementById("modal-title");
const appointments = [];
let errorTimeout;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let currentDate = new Date(),
    currentMonth = currentDate.getMonth(),
    currentYear = currentDate.getFullYear(),
    selectedDate = currentDate.getDate()+1,
    selectedDay = new Date(currentYear, currentMonth, selectedDate).getDay();


showCalendar();

function showCalendar(){
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();
    let lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    let dateList = "";

    calendarHeader.innerHTML = `${months[currentMonth]} ${selectedDate}, ${currentYear}`;
    modalHeader.innerHTML = `${months[currentMonth]} ${selectedDate}, ${currentYear} (${days[selectedDay]})`;
    for (let i = firstDayOfMonth; i > 0; i--){
        dateList += `<li class="disabled">${lastDateOfPrevMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++){
        if (i == selectedDate){
            dateList += `<li class="selected date">${i}</li>`
        }
        else if (i == currentDate.getDate() && currentMonth == currentDate.getMonth()){
            dateList += `<li class="today date">${i}</li>`
        }
        else{
            dateList += `<li class="date">${i}</li>`;
        }
    }
    for (let i = lastDayOfMonth; i < 6; i++){
        dateList += `<li class="disabled">${i - lastDayOfMonth +1}</li>`
    }
    calendar.innerHTML = dateList;
    const dates = document.querySelectorAll(".date");

    dates.forEach(function(date){
        date.addEventListener("click", function(){
            console.log(currentMont, currentDate.getMonth, this.innerHTML);
            if (currentMonth < currentDate.getMonth()){
                document.getElementById("calendar-alert").style.display = "inline-block";
                setTimeout(() => document.getElementById("calendar-alert").style.display = "none", 10000);
            }
            else if(currentMonth == currentDate.getMonth()-1 && this.innerHTML <= currentDate.getDate(){
                document.getElementById("calendar-alert").style.display = "inline-block";
                setTimeout(() => document.getElementById("calendar-alert").style.display = "none", 10000);
            }
            else{
                selectedDate = this.innerHTML;
                showCalendar();
            }
        });
    });
}
function prevMonth(){
    if (currentMonth === 0){
        currentMonth = 11;
        currentYear--;
    }
    else{
        currentMonth--;
    }
    showCalendar();
}
function nextMonth(){
    if (currentMonth === 11){
        currentMonth = 0;
        currentYear++;
    }
    else{
        currentMonth++;
    }
    showCalendar();
}
const nameErr = document.getElementById("appointment-nameErr"),
      nameC = document.getElementById("appointment-name-c"),
      subjectErr = document.getElementById("appointment-subjectErr"),
      subjectC = document.getElementById("appointment-subject-c"),
      permissionErr = document.getElementById("appointment-permissionErr"),
      permissionC = document.getElementById("appointment-permission-c");

// appointment form validation
function validateApmtForm(){
    const name = document.getElementById("appointment-name"),
          subject = document.getElementById("appointment-subject"),
          type = document.getElementById("appointment-type"),
          doc = document.getElementById("appointment-doc"),
          permission = document.getElementById("appointment-permission");
    if (validateName(name.value) && validateSubject(subject.value) && validatePermission(permission.checked)){
        if (localStorage.getItem('?loggedIn') == "true"){
            localStorage.setItem('appointment-form', JSON.stringify({
                name: name.value,
                subject: subject.value,
                type: type.value,
                doctor: doc.value,
                location: "pending...",
                date: `${months[currentMonth]} ${selectedDate}, ${currentYear}`,
                day: days[selectedDay],
                time: "pending..."
            }));
            window.alert("Your appointment is being processed!");
            setTimeout(() => location.reload(true), 100);
        }
        else{
            document.getElementById("appointment-accountErr").innerHTML = "An account is required to make an appointment.";
            document.getElementById("appointment-account-c").style.marginBottom = "20px";
        }
    }
}
function validateName(value){
    if (value.length == " "){
        nameErr.innerHTML = "Name is required.";
        nameC.setAttribute('style', 'margin-bottom: 40px!important;');
        return false;
    }
    if (!value.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameErr.innerHTML = "Provided name is invalid.";
        nameC.setAttribute('style', 'margin-bottom: 40px!important;');
        return false;
    }
    nameErr.innerHTML = "";
    nameC.setAttribute('style', 'margin-bottom: 0px;');
    return true;
}
function validateSubject(value){
    if (value.length == " "){
        subjectErr.innerHTML = "Appointment subject is required.";
        subjectC.setAttribute('style', 'margin-bottom: 40px;');
        return false;
    }
    subjectErr.innerHTML = "";
    subjectC.setAttribute('style', 'margin-bottom: 0px;')
    return true;
}
function validatePermission(value){
    if (value !== true){
        permissionErr.innerHTML = "Permission is required.";
        permissionC.setAttribute('style', 'margin-bottom: 40px;');
        return false;
    }
    permissionErr.innerHTML = "";
    permissionC.setAttribute('style', 'margin-bottom: 0px;');
    return true;
}

// changing page content
function renderAppointmentData(){
    const dataDate = document.getElementById("data-date"),
        dataTime = document.getElementById("data-time"),
        dataName = document.getElementById("data-name"),
        dataSubject = document.getElementById("data-subject"),
        dataDoctor = document.getElementById("data-doctor"),
        dataType = document.getElementById("data-type"),
        dataLocation = document.getElementById("data-location"),
        dataDaysRemaining = document.getElementById("data-daysRemaining");
    const appointmentAdd = document.getElementById("apmtAdd"),
        appointmentAdd2 = document.getElementById("apmtAdd2"),
        appointmentShow = document.getElementById("apmtShow"),
        appointmentShow2 = document.getElementById("apmtShow2");
    if (localStorage.getItem('?haveAppointment') == "true"){
        appointmentAdd.classList.add("hide");
        appointmentAdd2.classList.add("hide");
        appointmentShow.classList.remove("hide");
        appointmentShow2.classList.remove("hide");
        const apmtData = JSON.parse(localStorage.getItem("apmtData"));
        
        let today = new Date();
        let appointment = new Date(apmtData.date);
        let count = 0;
        while(today < appointment){
            today.setDate(today.getDate() + 1);
            count++;
            dataDaysRemaining.innerHTML = `${count} Day(s) before the Appointment`;
        }
        dataDate.innerHTML = apmtData.date + "(" + apmtData.day + ")";
        dataTime.innerHTML = apmtData.time;
        dataName.innerHTML = apmtData.name;
        dataSubject.innerHTML = apmtData.subject;
        if (apmtData.doctor == ""){
            dataDoctor.innerHTML = "none";
        }
        else{
            dataDoctor.innerHTML = apmtData.doctor;
        }
        dataType.innerHTML = apmtData.type;
        if (apmtData.type == "Online"){
            dataLocation.innerHTML = `<span>Meeting Info: </span><span>${apmtData.location}</span>`;
        }
        else{
            dataLocation.innerHTML = `<span>Location: </span><span>${apmtData.location}</span>`;
        }
    }
    else{
        appointmentShow.classList.add("hide");
        appointmentShow2.classList.add("hide");
        appointmentAdd.classList.remove("hide");
        appointmentAdd2.classList.remove("hide");
    }
}
setInterval(renderAppointmentData, 100);
