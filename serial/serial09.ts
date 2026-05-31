/* 
  Исправьте структуру "дерево" с рекурсивными ссылками для корректной десериализации
*/

import "reflect-metadata";
import { Type } from "class-transformer";

export class TreeNode {
  value: string;

  @Type(() => TreeNode)
  children: TreeNode[];

  constructor(value: string) {
    this.value = value;
    this.children = [];
  }

  getChildCount() { return this.children.length; }
}