/**
 * @interface PlantType
 * @property {number} id - The unique identifier for the plant type.
 * @property {string} name - The name of the plant type.
 * @property {string} description - A description of the plant type.
 */
export interface PlantType {
  id: number
  name: string
  description?: string
}
