import type { Plant } from './plant'
import type { Room } from './room'
import type { PlantType } from './plantType'

/**
 * Interface representing the database response structure
 * containing collections of plants, rooms, and plant types.
 */
export interface DbResponse {
  allPlants: Plant[]
  allRooms: Room[]
  allTypes: PlantType[]
}
