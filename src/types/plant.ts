/**
 * @interface Plant
 * @property {number} id - The unique identifier for the plant.
 * @property {string} name - The name of the plant.
 * @property {string} wateringFrequency - How often the plant needs to be watered.
 * @property {number} room - The room where the plant is located.
 * @property {string} prefers - The preferred conditions for the plant.
 * @property {Date} lastWatered - The date when the plant was last watered.
 * @property {string} notes - Additional notes about the plant.
 * @property {number[]} type - The type of the plant.
 */
export interface Plant {
  id: number
  name: string
  wateringFrequency: string
  room: number
  prefers: string
  lastWatered: Date
  notes: string
  type: number[]
}
