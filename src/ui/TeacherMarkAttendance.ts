import init from '../domain/attendance/TeacherMarkAttendance/TeacherMarkAttendanceApp';

export class TeacherMarkAttendance {
  static templateUrl = '/partials/teachermarkattendance.html';
  constructor() {
    init();
  }
}
