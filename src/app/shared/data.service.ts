import { Injectable } from '@angular/core';

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

@Injectable()
export class DataService {
  constructor() {}
  courses: Course[] = [
    {
      id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
      title: 'JavaScript',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                      has been the industry's standard dummy text ever since the 1500s, when an unknown 
                      printer took a galley of type and scrambled it to make a type specimen book. It has survived 
                      not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                      nchanged.`,
      creationDate: '8/3/2021',
      duration: 160,
      authors: ['Vasiliy Dobkin', 'Nicolas Kim'],
    },
    {
      id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
      title: 'Angular',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                      has been the industry's standard dummy text ever since the 1500s, when an unknown 
                      printer took a galley of type and scrambled it to make a type specimen book.`,
      creationDate: '10/11/2020',
      duration: 210,
      authors: ['Anna Sidorenko', 'Valentina Larina'],
    },
    {
      id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0915',
      title: 'React',
      description: `Lorem, ipsum dolor sit amen consectetur adding elia. Inventors facer, ab consecrator
                     expedite magna aperies, amen harem maxima nebo provident facile site pianissimos total
                     sed. Dolorous, eagle. repellent's, facile ut.\
      `,
      creationDate: '02/12/2019',
      duration: 220,
      authors: ['Yury Vashkevich', 'Tom Cruse'],
    },
  ];
  getCourses() {
    return this.courses;
  }
}
