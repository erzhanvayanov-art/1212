import { plainToInstance } from 'class-transformer';
import { expect, test } from 'vitest';
import { Circle, Drawing, Rectangle } from './serial08';

test('Polymorphic shapes', () => {
  const data = '{"name":"Art","shapes":[{"type":"circle","radius":5},{"type":"rectangle","width":10,"height":5}]}';
  const drawing = plainToInstance(Drawing, JSON.parse(data) as Drawing);
  
  expect(drawing.shapes[0]).toBeInstanceOf(Circle);
  expect(drawing.shapes[1]).toBeInstanceOf(Rectangle);
  expect(drawing.shapes[0].area()).toBeCloseTo(78.54, 2);
});