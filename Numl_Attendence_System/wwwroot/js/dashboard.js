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

