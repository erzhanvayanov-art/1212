import { describe, it, expect } from 'vitest';
import { groupUnfinishedHighPriorityTasks } from './collection20';

describe('groupUnfinishedHighPriorityTasks', () => {
  it('should group unfinished high priority tasks by category', () => {
    const tasks = [
      { category: 'work', priority: 'high', completed: false },
      { category: 'work', priority: 'low', completed: false },
      { category: 'personal', priority: 'high', completed: true },
      { category: 'personal', priority: 'high', completed: false }
    ];
    const result = groupUnfinishedHighPriorityTasks(tasks);
    expect(result.get('work')).toHaveLength(1);
    expect(result.get('personal')).toHaveLength(1);
  });
});
