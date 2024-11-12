$(document).ready(function () {
    $("#semesterDropdown", ).on('change', function () {
        var semester = $(this).val();

        if (semester) {
            $.ajax({
                url: '/Attendance/GetSubjectsBySemester',
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
                url: '/Analysis/GetAttendanceData',
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
});

