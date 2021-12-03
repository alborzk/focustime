accordionItemsList = document.querySelectorAll(".accordion-item-header");
const newTaskRow = `<tr><td colspan="3" style="width:100%"><button class="newItem" onclick="createNewTask(this.closest('table').id)">+ Create new task</button></td></tr>`;
const tableHeader = `<thead>
                        <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        </tr>
                    </thead>`;
var tableCount = 2;

addAccordionItemEvent(accordionItemsList);

function addAccordionItemEvent(accordionItemHeaders) {
    accordionItemHeaders.forEach(accordionItemHeader => {
        accordionItemHeader.addEventListener("click", event => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
    
        if(accordionItemHeader.classList.contains("active")) {
            if (accordionItemBody.tagName.localeCompare("TR")) {
                accordionItemBody.style.maxHeight = "250px";
            }
    
            else {
                accordionItemBody.style.display = "table-row";
            }
        }
        else {
            if (accordionItemBody.tagName.localeCompare("TR")) {
                accordionItemBody.style.maxHeight = "0";
            }
    
            else {
                accordionItemBody.style.display = "none";
            }
        }
      });
    });
}

function createNewTask(tableID, taskNameID, taskDateID) {
    let newTaskName = document.getElementById(taskNameID).value;
    let progress = '--';
    let date = document.getElementById(taskDateID).value;
    let table = document.getElementById(tableID);
    let newRow = [];

    if (newTaskName.localeCompare("")) {
        let newRows = `
                    <tr class="accordion-item-header taskHeader">
                        <td>${newTaskName}</td>
                        <td>${progress}</td>
                        <td class="date">${date}</td>
                    </tr>
                    <tr class="accordion-item-body taskDetails">
                        <td colspan="3" style="width:100%" class="accordion-item-body-content">
                        <p>Task Details<p>
                        </td>
                    </tr>`;

        let lastRow = table.rows[table.rows.length-2];
        lastRow.insertAdjacentHTML('beforebegin', newRows);
        
        let taskHeaders = table.getElementsByClassName("taskHeader").length;
        let newTaskHeader = table.getElementsByClassName("taskHeader")[taskHeaders - 1];
        newRow.push(newTaskHeader);
        addAccordionItemEvent(newRow);

        sortByDate(table);
    }

    else {
        alert('Task name cannot be empty. Please try again.');
    }
}

function createNewProject() {
    let newProjDiv = document.getElementById("newProject");
    let newProjectName = prompt("What is the new project?");
    let headers = [];

    if (newProjectName.localeCompare("") && newProjectName != null) {
        tableCount++;
        let newTableID = "table"+tableCount;
        let newTaskNameID = "taskName"+tableCount;
        let newTaskDateID = "taskDate"+tableCount;
        let newDiv = document.createElement("div");

        let newTaskRows = `<tr class="newItem-container accordion-item-header">
                        <td colspan="3" style="width:100%" class="newItem">+ Create new task</td>
                    </tr>
                    <tr class="accordion-item-body taskDetails newItem-container-details">
                    <td>
                        <label for="taskName">New Task Name:</label>
                        <input type="text" class="taskName" id="${newTaskNameID}" name="taskName" size="20">
                    </td> 
                    <td>
                        <label for="taskDate">Due on:</label>
                        <input type="date" class="taskDate" id="${newTaskDateID}" name="taskDate" value="2021-12-31">
                    </td>
                    <td>
                        <button class="doneButton" onclick="createNewTask('${newTableID}', '${newTaskNameID}', '${newTaskDateID}')">Done</button>
                    </td>
                    </tr>`;

        let newProjectItem = `<div class="accordion-item">
                <div class="accordion-item-header">
                    ${newProjectName}
                </div>
                <div class="accordion-item-body" id="table2Parent">
                    <div class="accordion-item-body-content">
                        <table class="content-table" id="${newTableID}">
                            ${tableHeader}
                            ${newTaskRows}
                        </table>
                    </div> 
                </div>
            </div>`;

        console.log(newTaskRows);

        newDiv.innerHTML = newProjectItem;
        newProjDiv.insertAdjacentElement('beforebegin', newDiv);

        let accordionItemHeader = newDiv.firstChild.childNodes[1];
        let newTaskHeader = document.getElementById(newTableID).getElementsByClassName("newItem-container")[0];
        headers.push(accordionItemHeader);
        headers.push(newTaskHeader);
        addAccordionItemEvent(headers);
    }

    else {
        alert("Please input a valid project name.");
    }
}

function sortByDate(table) {
    let rows = table.querySelectorAll(".taskHeader"),
        values = [],
        val,
        taskDetails = table.querySelectorAll(".taskDetails"),
        lastRow,
        lastRowDetails;

    for (var index = 0; index < rows.length; index++) {
        node = rows[index].querySelector(".date");
        val = node.innerText;
        values.push({value : val, row: rows[index]});
    }

    lastRow = table.querySelector(".newItem-container");
    lastRowDetails = table.querySelector(".newItem-container-details");

    values.sort(sortDateVal);

    let detailsIndex = 0;
    for (let idx = 0; idx < values.length; idx++) {
        table.querySelector("tbody").appendChild(values[idx].row);
        table.querySelector("tbody").appendChild(taskDetails[detailsIndex]);
        detailsIndex++;
    }

    detailsIndex = 0;
    table.querySelector("tbody").appendChild(lastRow);
    table.querySelector("tbody").appendChild(lastRowDetails);
}

function sortDateVal(a, b) {
    var dateA = new Date(a.value).toISOString(),
        dateB = new Date(b.value).toISOString(),
        dateAvalue = Date.parse(dateA),
        dateBvalue = Date.parse(dateB);

    return dateAvalue - dateBvalue;
}

const searchInput = document.getElementById('searchID');

searchInput.addEventListener('keyup', function(event) {
    let rows = document.querySelectorAll(".content-table > tbody > tr");

    const q = event.target.value.toLowerCase();
    rows.forEach((row) => {
        row.querySelector("td").textContent.toLowerCase().startsWith(q)
        ? (row.style.display = "table-row")
        : (row.style.display = "none");
    });
})