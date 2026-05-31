import { plainToInstance } from 'class-transformer';
import { expect, test } from 'vitest';
import { Project } from './serial04';

test('Project with mixed nesting', () => {
  const data = '{"name":"Website","lead":{"firstName":"Tom","lastName":"Smith"},"developers":[{"firstName":"Jane","lastName":"Doe"}]}';
  const project = plainToInstance(Project, JSON.parse(data) as Project);

  expect(project.lead.getFullName()).toBe('Tom Smith');
  expect(project.developers[0].getFullName()).toBe('Jane Doe');
});