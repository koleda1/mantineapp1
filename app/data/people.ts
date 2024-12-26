export interface Person {
  id: number;
  name: string;
  email: string;
  roleIds: number[]; // role ids
  active: boolean;
  hourlyRate?: number;
  phone?: string;
}

export const people: Person[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    roleIds: [1, 4], // photographer, content creator
    active: true,
    hourlyRate: 75,
    phone: '555-0101'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    roleIds: [2], // editor
    active: true,
    hourlyRate: 60,
    phone: '555-0102'
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    roleIds: [3], // social media manager
    active: true,
    hourlyRate: 55,
    phone: '555-0103'
  }
]; 