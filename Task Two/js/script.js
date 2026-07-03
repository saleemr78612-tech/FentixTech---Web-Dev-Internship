// ===============================
// Student Registration System
// ===============================

// Array to store students
let students = [];

// Edit index
let editIndex = -1;

// Form
const form = document.getElementById("studentForm");

// Inputs
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const course = document.getElementById("course");

// Error Messages
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const courseError = document.getElementById("courseError");

// Table Body
const tableBody = document.getElementById("studentTableBody");

// Submit Button
const submitBtn = document.getElementById("submitBtn");

// ===============================
// Submit Event
// ===============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (validateForm()) {

        const student = {
            name: fullName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            course: course.value.trim()
        };

        if (editIndex === -1) {

            students.push(student);

        } else {

            students[editIndex] = student;

            editIndex = -1;

            submitBtn.innerHTML =
                '<i class="bi bi-person-plus-fill"></i> Register Student';

        }

        renderTable();

        clearForm();
    }

});

// ===============================
// Validation
// ===============================

function validateForm() {

    let isValid = true;

    clearErrors();

    // ---------- Name ----------

    if (fullName.value.trim() === "") {

        showError(fullName, nameError, "Full Name is required.");

        isValid = false;

    } else if (fullName.value.trim().length < 3) {

        showError(fullName, nameError, "Minimum 3 characters required.");

        isValid = false;

    } else {

        showSuccess(fullName);

    }

    // ---------- Email ----------

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        showError(email, emailError, "Email is required.");

        isValid = false;

    } else if (!emailPattern.test(email.value.trim())) {

        showError(email, emailError, "Invalid Email Address.");

        isValid = false;

    } else {

        showSuccess(email);

    }

    // ---------- Phone ----------

    const phonePattern =
        /^03[0-9]{9}$/;

    if (phone.value.trim() === "") {

        showError(phone, phoneError, "Phone Number is required.");

        isValid = false;

    } else if (!phonePattern.test(phone.value.trim())) {

        showError(phone, phoneError, "Enter valid Pakistani phone number.");

        isValid = false;

    } else {

        showSuccess(phone);

    }

    // ---------- Course ----------

    if (course.value.trim() === "") {

        showError(course, courseError, "Course Name is required.");

        isValid = false;

    } else {

        showSuccess(course);

    }

    return isValid;

}

// ===============================
// Show Error
// ===============================

function showError(input, errorElement, message) {

    input.classList.add("error");

    input.classList.remove("success");

    errorElement.innerText = message;

}

// ===============================
// Show Success
// ===============================

function showSuccess(input) {

    input.classList.remove("error");

    input.classList.add("success");

}

// ===============================
// Clear Errors
// ===============================

function clearErrors() {

    nameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    courseError.innerText = "";

    fullName.classList.remove("error", "success");
    email.classList.remove("error", "success");
    phone.classList.remove("error", "success");
    course.classList.remove("error", "success");

}

// ===============================
// Render Table
// ===============================

function renderTable() {

    tableBody.innerHTML = "";

    if (students.length === 0) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="empty-message">
                No Student Registered Yet
            </td>
        </tr>
        `;

        return;
    }

    students.forEach((student, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.course}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm edit-btn"
                    onclick="editStudent(${index})">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteStudent(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Student
// ===============================

function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

        students.splice(index, 1);

        renderTable();

    }

}

// ===============================
// Edit Student
// ===============================

function editStudent(index) {

    const student = students[index];

    fullName.value = student.name;

    email.value = student.email;

    phone.value = student.phone;

    course.value = student.course;

    editIndex = index;

    submitBtn.innerHTML =
        '<i class="bi bi-pencil-fill"></i> Update Student';

}

// ===============================
// Clear Form
// ===============================

function clearForm() {

    form.reset();

    clearErrors();

}

// ===============================
// Initial Table
// ===============================

renderTable();