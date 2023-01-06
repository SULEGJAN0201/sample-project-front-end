import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl } from '@angular/forms';
import { Student } from 'src/app/data/Schema/student';
import { StudentService } from 'src/app/data/service/student.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  studentDetail !: FormGroup;
  studentObj : Student = new Student();
  studentList : Student[] = [];

  constructor(private formBuilder : FormBuilder, private studentService : StudentService) { }

  ngOnInit(): void {


    this.getAllStudent();

    this.studentDetail = this.formBuilder.group({
      id : [''],
      fname : [''],
      lname: [''],
      dob: [''],
      address: [''],
    });    

  }

  addStudent() {
    console.log(this.studentDetail);
    this.studentObj.id = this.studentDetail.value.id;
    this.studentObj.fname = this.studentDetail.value.fname;
    this.studentObj.lname = this.studentDetail.value.lname;
    this.studentObj.dob = this.studentDetail.value.dob;
    this.studentObj.address = this.studentDetail.value.address;

    this.studentService.addStudent(this.studentObj).subscribe(res=>{
        console.log(res);
        this.getAllStudent();
        this.studentDetail.reset();
    },err=>{
        console.log(err);
    });

  }


  getAllStudent() {
    this.studentService.getAllStudent().subscribe(res=>{
      console.log(res);
        this.studentList = res;

        console.log(this.studentList);
    },err=>{
      console.log("error while fetching data.")
    });
  }

  

  editStudent(student : Student) {
    this.studentDetail.controls['id'].setValue(student.id);
    this.studentDetail.controls['fname'].setValue(student.fname);
    this.studentDetail.controls['lname'].setValue(student.lname);
    this.studentDetail.controls['dob'].setValue(student.dob);
    this.studentDetail.controls['address'].setValue(student.address);
  }

  updateStudent() {

    this.studentObj.id = this.studentDetail.value.id;
    this.studentObj.fname = this.studentDetail.value.fname;
    this.studentObj.lname = this.studentDetail.value.lname;
    this.studentObj.dob = this.studentDetail.value.dob;
    this.studentObj.address = this.studentDetail.value.address;

    this.studentService.updateStudent(this.studentObj).subscribe(res=>{
      console.log(res);
      this.getAllStudent();
      this.studentDetail.reset();
    },err=>{
      console.log(err);
    });

  }

  deleteStudent(student : Student) {

    this.studentService.deleteStudent(student).subscribe(res=>{
      console.log(res);
      alert('Student deleted successfully');
      this.getAllStudent();
    },err => {
      console.log(err);
    });

  }

}
