import { TransactionTypes } from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import Cryptr from "cryptr"
import dayjs from "dayjs";

const cryptr = new Cryptr(process.env.SECRET);

export async function createCard(employeeId: number, cardType: TransactionTypes) {
  const cardData = await generateCardData(employeeId, cardType);
  await cardRepository.insert(cardData);
}

async function generateCardData ( employeeId: number, cardType: TransactionTypes) {
  const number = generateCardNumber();
  const cardholderName = await abbreviateName(employeeId);
  const expirationDate = dayjs(Date.now()).add(5, "year").format("MM-YY");
  const securityCode = generateSecurityCode();
  const cardData = {
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password: null,
      isVirtual: false,
      originalCardId: null,
      isBlocked: true,
      type: cardType
    }
    return cardData;
}

function generateCardNumber() {
  const cardGen = require('card-number-generator')
  return cardGen({issuer: 'MasterCard'});
}

async function abbreviateName(employeeId : number){
  const info = await employeeRepository.findById(employeeId);
  let name = info.fullName;

  let namesArray = name.split(' ')
  let firstName = namesArray[0]
  let lastName = namesArray[namesArray.length - 1]
  let output = []
  for (let i = 0; i < namesArray.length; i++) {
        if (namesArray[i] === firstName || namesArray[i] === lastName) {
            output.push(namesArray[i])
        } else if (namesArray[i].length > 3){
            let letters = namesArray[i].split('')
            output.push(letters[0])
        }
    }
    return output.join(' ');
}

function generateSecurityCode(){
  const cvc = faker.finance.creditCardCVV();
  return cryptr.encrypt(cvc);
}
