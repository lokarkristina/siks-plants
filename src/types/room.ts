/**
 * @interface Room
 * @property {number} id - The unique identifier for the room.
 * @property {string} name - The name of the room.
 * @property {string} description - A description of the room.
 */
export interface Room {
  id: number
  name: string
  description?: string
}
