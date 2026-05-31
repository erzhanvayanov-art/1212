import { plainToInstance } from 'class-transformer';
import { expect, test } from 'vitest';
import { TreeNode } from './serial09';

test('Recursive tree structure', () => {
  const data = '{"value":"root","children":[{"value":"child1","children":[]}]}';
  const tree = plainToInstance(TreeNode, JSON.parse(data) as TreeNode);
  
  expect(tree.children[0]).toBeInstanceOf(TreeNode);
  expect(tree.getChildCount()).toBe(1);
});