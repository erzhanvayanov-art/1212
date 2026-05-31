import type { Db } from "mongodb"

export class Student {
    name: string
    grade: string
    gpa: number
    constructor(name: string, grade: string, gpa: number) {
        this.name = name
        this.grade = grade
        this.gpa = gpa
    }
}

export async function find_students_by_grade(db: Db, grade: string): Promise<Student[]> {
    // Найти всех студентов с указанным классом
    const studentsData = await db.collection("students").find({ grade }).toArray();
    return studentsData.map(data => new Student(data.name, data.grade, data.gpa));
}