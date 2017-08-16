storeApp.constant('FILTER_OPTIONS', [
  {
    name: 'All Sources',
    path: 'hawaii.edu:store:any-dataOrigin',
    children: [
      {
        name: 'Affiliation',
        path: 'hawaii.edu:store:any-dataOrigin'
      },
    ]
  },
  {
    name: 'Human Resources',
    path: 'hawaii.edu:store:hris',
    children: [
      {
        name: 'Affiliation',
        path: 'hawaii.edu:store:hris:aff'
      },
      {
        name: 'Employing Agency Code (EAC)',
        path: 'hawaii.edu:store:hris:eac'
      }
    ]
  },
  {
    name: 'Research Corporation of the University of Hawaii',
    path: 'hawaii.edu:store:rcuh',
    children: [
      {
        name: 'Affiliation',
        path: 'hawaii.edu:store:rcuh:aff'
      },
    ]
  },
  {
    name: 'Student Employment',
    path: 'hawaii.edu:store:sece',
    children: [
      {
        name: 'Affiliation',
        path: 'hawaii.edu:store:sece:aff'
      }
    ]
  },
  {
    name: 'Banner',
    path: 'hawaii.edu:store:sis',
    children: [
      {
        name: 'Affiliation',
        path: 'hawaii.edu:store:sis:aff'
      },
      {
        name: 'Curriculum',
        path: 'hawaii.edu:store:sis:curriculum'
      },
      {
        name: 'Instructor',
        path: 'hawaii.edu:store:sis:instructor'
      },
      {
        name: 'Registration',
        path: 'hawaii.edu:store:sis:registration'
      }
    ]
  },
  {
    name: 'UH Identity Management Systems',
    path: 'hawaii.edu:store:uhims',
    children: [
      {
        name: 'Affiliation',
        path: 'hawaii.edu:store:uhims:aff'
      }
    ]
  }
]);
