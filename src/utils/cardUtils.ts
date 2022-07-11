import dayjs from "dayjs"
import * as cardRepository from "../repositories/cardRepository.js"

export async function checkForCardExistance(id : number) {
  const card = await cardRepository.findById(id)
  if (!card) {
        throw { 
          type: "not found", 
          message: "card not registered" 
        }
    }
    return card
}

export async function checkForCardExpirationDate(expirationDate: string){
  const cardAlreadyExpired = dayjs(expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));
  if(cardAlreadyExpired){
        throw { 
        type: "invalid requisition", 
        message: "this card has already expired" 
      }
    }
}
