/* 	
  Обеспечьте сериализацию и десериализацию объектов классов Circle, Rectangle и Drawing
*/

import "reflect-metadata";
import { Type, plainToInstance, instanceToPlain } from "class-transformer";

export abstract class Shape {
  abstract area(): number;
}

export class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

export class Drawing {
  name: string;

  @Type(() => Shape, {
    discriminator: {
      property: "type",
      subTypes: [
        { name: "circle", value: Circle },
        { name: "rectangle", value: Rectangle }
      ]
    }
  })
  shapes: Shape[];

  constructor(name: string, shapes: Shape[]) {
    this.name = name;
    this.shapes = shapes;
  }
}