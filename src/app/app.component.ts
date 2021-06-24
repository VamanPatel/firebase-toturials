import { Component } from '@angular/core';
import { CrudService } from './Services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-firebase';

  employee: any;
  employename: string;
  employeeAge: number;
  employeeAddress: string;
  message: string;

  constructor(private crudserives: CrudService) {}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.crudserives.get_Allemployee().subscribe((res) => {
      this.employee = res.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          address: e.payload.doc.data()['address'],
        };
      });

      console.log(this.employee);
    });
  }

  createRecord() {
    let Record = {};
    Record['name'] = this.employename;
    Record['age'] = this.employeeAge;
    Record['address'] = this.employeeAddress;

    this.crudserives
      .create_employee(Record)
      .then((res) => {
        this.employename = '';
        this.employeeAge = undefined;
        this.employeeAddress = '';
        this.message = 'Employeee Data is Saved';

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editRecord(Record) {
    Record.isEdit = true;
    Record.editname = Record.name;
    Record.editage = Record.age;
    Record.editaddress = Record.address;
  }

  UpdateRecord(recordData) {
    let record = {};
    record['name'] = recordData.editname;
    record['age'] = recordData.editage;
    record['address'] = recordData.editaddress;

    this.crudserives.updateEmployee(recordData.id, record);

    recordData.isEdit = false;
  }

  deleteEmployee(recordId) {
    this.crudserives.deleteEmployee(recordId);
  }
}
