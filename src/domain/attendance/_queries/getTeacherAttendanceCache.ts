import gql from 'graphql-tag';

export const TEACHER_ATTENDANCE_CACHE = gql`
  query createStudentAttendanceCache(
    $branchId: String
    $academicYearId: String
    $teacherId: String
    $lectureDate: String
  ) {
    createStudentAttendanceCache(
      branchId: $branchId
      academicYearId: $academicYearId
      teacherId: $teacherId
      lectureDate: $lectureDate
    ) {
      departments {
        id
        name
        description
      }
      batches {
        id
        batch
        department {
          id
        }
      }
      subjects {
        id
        subjectType
        subjectCode
        subjectDesc
        department {
          id
        }
        batch {
          id
        }
      }
      sections {
        id
        section
        batch {
          id
        }
      }
      teaches {
        id
        desc
        teacher {
          id
        }
        subject {
          id
        }
      }
      attendanceMasters {
        id
        teach {
          id
        }
        batch {
          id
        }
        section {
          id
        }
      }
      lectures {
        id
        lecDate
        startTime
        endTime
        strLecDate
        attendancemaster {
          id
          batch {
            id
            batch
          }
          section {
            id
            section
          }
          teach {
            id
            subject {
              id
              subjectType
              subjectCode
              subjectDesc
              department {
                id
              }
              batch {
                id
                batch
              }
            }
            teacher {
              id
              teacherName
            }
          }
        }
      }
    }
  }
`;
