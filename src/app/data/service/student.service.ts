import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Student } from '../Schema/student';
import { ServerResponse } from '../Schema/response';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  addStudentURL : string;
  getStudentURL : string;
  updateStudentUrl : string;
  deleteStudentUrl : string;

  constructor(private http :HttpClient) { 
    this.addStudentURL = 'http://localhost:7172/api/Student/AddStudent';
    this.getStudentURL = 'http://localhost:7172/api/Student/getAll';
    this.updateStudentUrl = 'http://localhost:7172/api/Student/UpdateStudent';
    this.deleteStudentUrl = 'http://localhost:7172/api/Student/DeleteStudent';
  }
 
  addStudent(student : Student): Observable<Student> {
    return this.http.post<Student>(this.addStudentURL,student);
  }



  getAllStudent(): Observable<Student[]>{
    return this.http.get<ServerResponse>(this.getStudentURL)
      .pipe(
        map(response => {
          // Parse the data property as a JSON array and filter out any null values
          return JSON.parse(response.data).filter((student: { id: null; }) => student.id !== '');

        })
      );
  }


  updateStudent(student :Student) : Observable<Student>{
    return this.http.put<Student>(this.updateStudentUrl, student);
  }

  deleteStudent(student : Student) : Observable<Student> {
    return this.http.delete<Student>(this.deleteStudentUrl+'/'+student.id);
  }
}
