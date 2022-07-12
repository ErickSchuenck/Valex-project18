import { TransactionTypes } from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import Cryptr from "cryptr"
import dayjs from "dayjs";
import * as cardUtils from "../utils/cardUtils.js"
import * as rechargeRepositoriy from "../repositories/rechargeRepository"
import bcrypt from "bcrypt"

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

export async function activateCard(id : number, securityCode : string, password : string){
  const card = await cardRepository.findById(id)
  if (!card.isBlocked) {
    throw {
      type: 'Invalid requisition', 
      message: 'This card is already activated'
    }
  }
  await cardUtils.checkForCardExpirationDate(card.expirationDate);
  await checkForCardCVC(card.securityCode, securityCode);
  const encryptedPassword = bcrypt.hashSync(password, 10);
  await cardRepository.update(id, {password: encryptedPassword, isBlocked: false})
}

async function checkForCardCVC(inputCVC :string, databaseCVC: string){
  const encriptedInputCVC = cryptr.decrypt(inputCVC);
  if (encriptedInputCVC !== databaseCVC) {
    throw {
      type: 'Invalid requisition',
      message: 'CVC does not match with database, please double check the input'
    }
  }
}

export async function getCardBalance(id : number, password : string){
  await cardUtils.checkForCardExistance(id);
  const losses = await paymentRepository.findByCardId(id);
  const profit = await rechargeRepositoriy.findByCardId(id)
  const balance = await generateBalance(losses, profit)
  return {balance, losses, profit}
}

function generateBalance(losses : any, profit : any){
  /// FIXMEEEEE!!!! Algum jeito de declarar array com o typescript sem saber o conteúdo do array?

  let totalPayment = 0;
  let totalCredits = 0;

  losses.forEach(payment => {
    totalPayment = totalPayment + payment.amount ;
  });

  profit.forEach(credit => {
    totalCredits = totalCredits + credit.amount ;
  });

  return totalCredits - totalPayment;
}