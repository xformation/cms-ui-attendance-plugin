import init from '../domain/attendance/AttendanceTab/AttendanceTabApp';

export class AttendanceOverviewTab {
  static templateUrl = '/partials/attendanceoverviewtab.html';
  constructor() {
    init();
  }
}
