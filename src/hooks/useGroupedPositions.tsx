// Aggregate clients based on their job positions
import { useState, useEffect } from "react"
import { JobPositionsE } from "../types/types"
import useClients from "./useClients"

// INITIALIZER
const initializePositionCounts = (): Record<JobPositionsE, number> => {
  return {
    [JobPositionsE.CEO]: 0,
    [JobPositionsE.CTO]: 0,
    [JobPositionsE.COO]: 0,
    [JobPositionsE.Manager]: 0,
    [JobPositionsE.Developer]: 0,
  }
}

const useManagementOperations = () => {
  // CONTEXT
  const { clients } = useClients()

  // STATE
  const [clientPerPosition, setClientPerPosition] = useState<
    { position: JobPositionsE; numberOfClients: number }[]
  >([])

  // EFFECT
  useEffect(() => {
    const calculateClientPerPosition = () => {
      const positionCounts = initializePositionCounts()

      // Count the number of clients for each position
      clients?.forEach((user) => {
        positionCounts[user.position]++
      })

      // Convert the counts to the desired format
      const mappedClientPerPosition = Object.entries(positionCounts).map(
        ([position, numberOfClients]) => ({
          position: position as JobPositionsE,
          numberOfClients,
        })
      )
      setClientPerPosition(mappedClientPerPosition)
    }

    calculateClientPerPosition()
  }, [clients])

  return clientPerPosition
}

export default useManagementOperations
