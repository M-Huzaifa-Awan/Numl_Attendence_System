function checkDropdowns() {
    var session = $("#shiftDropdown").val();
    var semester = $("#semesterDropdown").val();
    var section = $("#sectionDropdown").val();
    var subject = $("#subjectDropdown").val();
    var slot = $("#slotDropdown").val();
    if (semester == ("1")) {
        if (session !== null && semester !== null && section !== null && subject !== null && slot !== null) {
            $("#submitButton").prop('disabled', false);
        }
        else {
            $("#submitButton").prop('disabled', true);
        }
    }
    else {
        if (session !== null && semester !== null && subject !== null && slot !== null) {
            $("#submitButton").prop('disabled', false);
        }
        else {
            $("#submitButton").prop('disabled', true);
        }
    }
}


$(document).ready(function () {
    $("#semesterDropdown", ).on('change', function () {
        var semester = $(this).val();

        if (semester) {
            $.ajax({
                url: '/Attendence/GetSubjectsBySemester',
                type: 'GET',
                data: { semester: semester },
                success: function (subjects) {
                    $("#subjectDropdown").empty();

                    $("#subjectDropdown").append('<option value="" selected disabled>Select Subject</option>');

                    $.each(subjects, function (index, subject) {
                        $("#subjectDropdown").append('<option value="' + subject.code + '">' + subject.name + '</option>');
                    });
                }
            });
        }
    });
    
    $("#subjectDropdown, #shiftDropdown").on('change', function () {
        var subject = $("#subjectDropdown").val();
        var shift = $("#shiftDropdown").val();
        if (subject && shift) {
            $.ajax({
                url: '/Attendence/GetStudentEnrollmentData',
                type: 'GET',
                data: {
                    subjectCode: subject,
                    shift: shift
                },
                success: function (students) {
                    students.sort((a, b) => {
                        const numA = parseInt(a.rollNo.replace('CS-', ''));
                        const numB = parseInt(b.rollNo.replace('CS-', ''));
                        return numA - numB;
                    });
                    $("#tableContainer").empty();
                    var tableHTML = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;
                    $.each(students, function (index, student) {
                        tableHTML += `
                        <tr>
                            <td>${student.rollNo}</td>
                            <td>${student.name}</td>
                            <td>
                                <select class="form-control attendance-status">
                                    <option value="P">Present</option>
                                    <option value="A">Absent</option>
                                </select>
                            </td>
                        </tr>`;
                    });
                    tableHTML += '</tbody></table>';
                    $("#tableContainer").html(tableHTML);

                    $(".attendance-status").on('change', function () {
                        var status = $(this).val();
                        var row = $(this).closest('tr');
                        if (status === 'P') {
                            row.removeClass('table-danger').addClass('table-success');
                        } else if (status === 'A') {
                            row.removeClass('table-success').addClass('table-danger');
                        } else {
                            row.removeClass('table-success table-danger');
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching student data:", error);
                    $("#tableContainer").html(
                        '<div class="alert alert-danger">Error loading student data. Please try again.</div>'
                    );
                },
                beforeSend: function () {
                    $("#tableContainer").html(
                        '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</div>'
                    );
                }
            });
        }
    });
    $("#sessionDropdown, #semesterDropdown, #sectionDropdown, #subjectDropdown , #slotDropdown").on('change', function () {
        checkDropdowns();
    });
    $("#submitButton").on('click', function () {

        var attendanceData = [];

        $(".attendance-status").each(function () {
            var rollNo = $(this).closest('tr').find('td:first').text();
            var status = $(this).val();

            attendanceData.push({
                rollNo: rollNo,
                status: status
            });
        });

        var slot = $("#slotDropdown").val();

        var submitData = {
            subjectCode: $("#subjectDropdown").val(),
            slot: parseInt($("#slotDropdown").val()),
            attendanceRecords: attendanceData
        };
        $.ajax({
            url: '/Attendence/MarkAttendance',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(submitData),
            success: function (response) {
                if (response.success) {
                    alert("Attendance marked successfully!");
                }
                else {
                    alert("Error marking attendance");

                    $("#tableContainer").prepend(
                        '<div class="alert alert-danger">:Error marking attendance:' + response.message + '</div>'
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error("Error submitting attendance:", error);
                $("#tableContainer").prepend(
                    '<div class="alert alert-danger">Error submitting attendance. Please try again.</div>'
                );
            }
        });
    });
});

