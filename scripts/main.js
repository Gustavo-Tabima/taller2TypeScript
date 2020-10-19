import { dataCourses } from './dataCourses.js';
import { gustavo } from './Student.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var estudianteTable = document.getElementById("student-table");
var inputRango = document.getElementById("filter-box");
var btnFiltroRango = document.getElementById("button-filterByRango");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnFiltroRango.onclick = function () { return buscarCursosSegunCredito(dataCourses); };
renderCoursesInTable(dataCourses);
renderStudentInTable(gustavo);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    var trElemento = document.createElement("tr");
    trElemento.innerHTML = "\n  <td>" + student.codigo + "</td>\n  <td>" + student.cedula + "</td>\n  <td>" + student.Edad + "</td>\n  <td>" + student.direccion + "</td>\n  <td>" + student.telefono + "</td>\n  ";
    estudianteTable.appendChild(trElemento);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function buscarCursosSegunCredito(courses) {
    var entrada = inputRango.value;
    if (entrada != '') {
        clearCoursesInTable();
        renderCoursesInTable(courses.filter(function (x) { return x.credits >= parseInt(entrada); }));
    }
    else {
        clearCoursesInTable();
        renderCoursesInTable(dataCourses);
    }
}
