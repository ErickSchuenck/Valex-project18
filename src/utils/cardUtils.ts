import chalk from "chalk"
import dayjs from "dayjs"
import * as cardRepository from "../repositories/cardRepository.js"
import * as cardsServices from "../services/cardServices.js"

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

export async function checkForPasswordMatch(id : number, password : string) {
  const passwordInDatabase = (await cardRepository.findById(id)).password;
  const decryptedDatabasePassword = cardsServices.decrypt(passwordInDatabase);
  if (password !== decryptedDatabasePassword){
    throw {
      type: "invalid requisition", 
      message: "password incorrect, please double check the input"
    }
  }
}

export async function checkIfCardIsBlocked(card : any) {
  return card.isBlocked
}
