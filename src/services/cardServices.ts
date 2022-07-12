import { TransactionTypes } from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import Cryptr from "cryptr"
import dayjs from "dayjs";
import * as cardUtils from "../utils/cardUtils.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import bcrypt from "bcrypt"
import * as businessRepository from "../repositories/businessRepository.js"
import * as cardServices from "../services/cardServices.js"

const cryptr = new Cryptr(process.env.SECRET);

export async function createCard(employeeId: number, cardType: TransactionTypes) {
  const cardData = await generateCardData(employeeId, cardType);
  await cardRepository.insert(cardData);
  return cardData;
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
  return faker.finance.creditCardNumber('visa');
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
  const encryptedPassword = cardServices.encrypt(password)
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
  const transactions = await paymentRepository.findByCardId(id);
  const recharges = await rechargeRepository.findByCardId(id)
  const balance = generateBalance(transactions, recharges)
  return {balance, transactions, recharges}
}

function generateBalance(transactions : any, recharges : any){
  /// FIXMEEEEE!!!! Algum jeito de declarar array com o typescript sem saber o conteúdo do array?

  let totalPayment = 0;
  let totalCredits = 0;

  transactions.forEach(payment => {
    totalPayment = totalPayment + payment.amount ;
  });

  recharges.forEach(credit => {
    totalCredits = totalCredits + credit.amount ;
  });

  return totalCredits - totalPayment;
}

export async function blockOrUnblockCard(id: number, action: 'block' | 'unblock'){
  if (action === 'block'){
    await cardRepository.update(id, { isBlocked: true});
  }
  if (action === 'unblock'){
    await cardRepository.update(id, { isBlocked: false});
  }
}

export async function rechargeCard(id : number, amount : number) {
  const card = await cardUtils.checkForCardExistance(id);
  const cardIsBlocked = await cardUtils.checkIfCardIsBlocked(card)
  if (cardIsBlocked === true){
    throw {
      type: 'Invalid requisition',
      message: 'This card is blocked'
    }
  }
  await cardUtils.checkForCardExpirationDate(card.expirationDate)
  await rechargeRepository.insert( id, amount );
}

export async function registerPayment(id : number, password : string, businessId : number, amount : number) {
  const card = await cardUtils.checkForCardExistance(id);
  const cardIsBlocked = await cardUtils.checkIfCardIsBlocked(card);
  const encryptedPassword = bcrypt.hashSync(password, 10);
  if (cardIsBlocked === true){
    throw {
      type: 'Invalid requisition',
      message: 'This card is blocked'
    }
  }
  await cardUtils.checkForCardExpirationDate(card.expirationDate);
  await cardUtils.checkForPasswordMatch(id, encryptedPassword);
  const business = await checkIfBusinessExists(businessId);
  await checkIfBusinessTypeMatches(business.type, card.type);
  await verifyIfCreditIsValid(id, amount);
  paymentRepository.insert(id, businessId, amount);
}

async function checkIfBusinessExists(businessId : number) {
  const business = await businessRepository.findById(businessId);
    if(!business){
        throw {
          type: "Invalid requisition",
          message: "This business does not exists" 
        }
    }
  return business
}

async function checkIfBusinessTypeMatches(businessType : TransactionTypes, cardType : TransactionTypes) {
  if (businessType !== cardType){
    throw { 
      type: "conflict", 
      message: "this company type differs from your card type" 
    }
  }
}

async function verifyIfCreditIsValid(id : number, amount : number) {
  const transactions = await paymentRepository.findByCardId(id);
  const recharges = await rechargeRepository.findByCardId(id);
  const balance = generateBalance(transactions, recharges);
  checkIfBalanceCoversAmount(amount, balance)
}

function checkIfBalanceCoversAmount(amount: number, balance : number){
    if(amount > balance){
      throw {
        type: "unauthorized", 
        message: "this card does not have enough credits to perform this transaction" 
      }
    }
}

export function encrypt(password : string){
  return cryptr.encrypt(password)
}

export function decrypt(password : string){
  return cryptr.decrypt(password)
}