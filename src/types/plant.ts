/**
 * @interface Plant
 * @property {number} id - The unique identifier for the plant.
 * @property {string} name - The name of the plant.
 * @property {string} image - The image URL of the plant.
 * @property {Date} lastWatered - The date when the plant was last watered.
 * @property {string} notes - Additional notes about the plant.
 * @property {string} prefers - The preferred conditions for the plant.
 * @property {number} room - The room where the plant is located.
 * @property {number[]} type - The type of the plant.
 * @property {string} wateringFrequency - How often the plant needs to be watered.
 */
export interface Plant {
  id: number
  name: string
  image: string
  lastWatered: Date
  notes?: string
  prefers: string
  room?: number
  type: number[]
  wateringFrequency: string
}
