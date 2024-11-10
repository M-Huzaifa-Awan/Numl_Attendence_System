function checkDropdowns() {
    var session = $("#sessionDropdown").val();
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

$("#submitButton").on('click', function () {
    $("slotDropdown").val("2");
    //
});
$(document).ready(function () {
    $("#semesterDropdown").on('change', function () {
        var semester = $(this).val();

        if (semester) {
            $.ajax({
                url: '/Teacher/GetSubjectsBySemester',
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
});

