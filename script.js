let teachers = [];


// Create teacher input fields
function createTeacherInputs() {

    const count = parseInt(
        document.getElementById("teacherCount").value
    );

    const container =
        document.getElementById("teacherInputs");

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {

        container.innerHTML += `
            <div class="teacher-row">

                <div>
                    <label>Teacher Name</label>

                    <input
                        type="text"
                        id="teacher${i}"
                        placeholder="Teacher ${i + 1}">
                </div>

                <div>
                    <label>Subject</label>

                    <input
                        type="text"
                        id="subject${i}"
                        placeholder="Subject">
                </div>

                <div>
                    <label>Classes</label>

                    <input
                        type="text"
                        id="classes${i}"
                        placeholder="Example: 6,7,8">
                </div>

            </div>
        `;
    }

    document
        .getElementById("teacherSection")
        .classList.remove("hidden");
}


// Save teacher details
function createClassInputs() {

    teachers = [];

    const count = parseInt(
        document.getElementById("teacherCount").value
    );

    for (let i = 0; i < count; i++) {

        const name =
            document.getElementById(`teacher${i}`).value ||
            `Teacher ${i + 1}`;

        const subject =
            document.getElementById(`subject${i}`).value ||
            `Subject ${i + 1}`;

        const classes =
            document.getElementById(`classes${i}`).value
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");

        teachers.push({
            name: name,
            subject: subject,
            classes: classes,
            periods: 0
        });
    }

    document
        .getElementById("classSection")
        .classList.remove("hidden");
}


// Generate timetable
function generateTimetable() {

    const daysCount = parseInt(
        document.getElementById("days").value
    );

    const periods = parseInt(
        document.getElementById("periods").value
    );

    const classCount = parseInt(
        document.getElementById("numberOfClasses").value
    );

    const firstPeriodRule =
        document.getElementById("firstPeriodRule").value;

    const dayNames =
        daysCount === 6
            ? [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ]
            : [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ];


    if (teachers.length === 0) {

        alert("Please enter teacher details first.");

        return;
    }


    let output = "";


    for (let c = 1; c <= classCount; c++) {

        output += `
            <h3>Class ${c}</h3>

            <table>

                <tr>
                    <th>Day</th>
        `;


        for (let p = 1; p <= periods; p++) {

            output += `
                <th>Period ${p}</th>
            `;
        }


        output += `
                </tr>
        `;


        for (let d = 0; d < daysCount; d++) {

            output += `
                <tr>
                    <td>
                        <strong>
                            ${dayNames[d]}
                        </strong>
                    </td>
            `;


            for (let p = 0; p < periods; p++) {

                let teacher;


                // First-period rule
                if (
                    p === 0 &&
                    firstPeriodRule === "yes"
                ) {

                    teacher = teachers[0];

                } else {

                    // Find teacher with
                    // minimum number of periods
                    teacher = teachers.reduce(
                        (a, b) =>
                            a.periods <= b.periods
                                ? a
                                : b
                    );
                }


                teacher.periods++;


                output += `
                    <td>
                        <strong>
                            ${teacher.subject}
                        </strong>

                        <br>

                        ${teacher.name}
                    </td>
                `;
            }


            output += `
                </tr>
            `;
        }


        output += `
            </table>
        `;
    }


    document.getElementById("timetable").innerHTML =
        output;

    document
        .getElementById("resultSection")
        .classList.remove("hidden");
}
