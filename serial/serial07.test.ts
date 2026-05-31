import { plainToInstance } from 'class-transformer';
import { expect, test } from 'vitest';
import { Course } from './serial07';

test('Complex Course structure', () => {
  const data = '{"title":"Math","instructor":{"firstName":"Dr.","lastName":"Who"},"students":[{"firstName":"Student1","lastName":"One"}],"schedule":"2023-10-10T09:00:00Z"}';
  const course = plainToInstance(Course, JSON.parse(data) as Course);
  
  expect(course.instructor.getFullName()).toBe('Dr. Who');
  expect(course.students[0].getFullName()).toBe('Student1 One');
  expect(course.schedule).toBeInstanceOf(Date);
});