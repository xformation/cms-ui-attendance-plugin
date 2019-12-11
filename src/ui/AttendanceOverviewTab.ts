import init from '../domain/attendance/AttendanceTabApp';

export class AttendanceOverviewTab {
  static templateUrl = '/partials/attendanceoverviewtab.html';
  constructor() {
    init();
  }
}
