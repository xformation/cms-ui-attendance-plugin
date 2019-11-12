import gql from 'graphql-tag';

export const CRET_STU_ATD_CAC_ADM = gql`
  query createStudentAttendanceCacheForAdmin(
    $branchId: String
    $academicYearId: String
    $lectureDate: String
  ) {
    createStudentAttendanceCacheForAdmin(
      branchId: $branchId
      academicYearId: $academicYearId
      lectureDate: $lectureDate
    ) {
      departments {
        id
        name
        description
        academicyear {
          id
          year
        }
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
      semesters {
        id
        description
      }
      terms {
        id
        termsDesc
        strStartDate
        strEndDate
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
