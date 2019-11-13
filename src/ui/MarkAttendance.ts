import init from '../domain/attendance/MarkAttendance/MarkAttendanceApp';

export class MarkAttendance {
    static templateUrl = '/partials/markattendance.html';
    constructor() {
        init();
    }
}