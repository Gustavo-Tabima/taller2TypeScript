import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import Student,{gustavo} from './Student.js'


let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const estudianteTable:HTMLElement = document.getElementById("student-table")!;
const inputRango:HTMLInputElement = <HTMLInputElement> document.getElementById("filter-box")!;
const btnFiltroRango: HTMLElement = document.getElementById("button-filterByRango")!;

btnfilterByName.onclick = () => applyFilterByName();

btnFiltroRango.onclick = () =>buscarCursosSegunCredito(dataCourses);

renderCoursesInTable(dataCourses);
renderStudentInTable(gustavo);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentInTable(student:Student):void{
  let trElemento = document.createElement("tr");
 
  trElemento.innerHTML = `
  <td>${student.codigo}</td>
  <td>${student.cedula}</td>
  <td>${student.Edad}</td>
  <td>${student.direccion}</td>
  <td>${student.telefono}</td>
  `
  
  estudianteTable.appendChild(trElemento);
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }




}

function buscarCursosSegunCredito(courses:Course[]){

 let entrada = inputRango.value;
 if(entrada != '' ){
  clearCoursesInTable();
  renderCoursesInTable(courses.filter( x => x.credits >=  parseInt(entrada)));
 }
 else{
   clearCoursesInTable();
   renderCoursesInTable(dataCourses);
 }
  
  }
  
