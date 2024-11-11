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
                        </tr>
                    </thead>
                    <tbody>`;
                    $.each(students, function (index, student) {
                        tableHTML += `
                    <tr>
                        <td>${student.rollNo}</td>
                        <td>${student.name}</td>
                    </tr>`;
                    });
                    tableHTML += '</tbody></table>';
                    $("#tableContainer").html(tableHTML);
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
});

