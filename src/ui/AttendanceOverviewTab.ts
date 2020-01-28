import init from '../domain/attendance/TabApp';

export class AttendanceOverviewTab {
  static templateUrl = '/partials/attendanceoverviewtab.html';
  constructor() {
    init();
  }
}
