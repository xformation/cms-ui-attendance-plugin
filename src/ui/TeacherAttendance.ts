import init from '../domain/attendance/TeacherAttendance/TeacherAttendanceApp';

export class TeacherAttendance {
  static templateUrl = '/partials/teacherattendance.html';
  constructor() {
    init();
  }
}
