import init from '../domain/attendance/AttendanceOverview/AttendanceOverviewApp';

export class AttendanceOverview {
    static templateUrl = '/partials/attendanceoverview.html';
    constructor() {
        init();
    }
}