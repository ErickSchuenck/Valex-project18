:::::::::Para criar um cartão::::::::::
enviar req POST para
/createCreditCard

necessário headers.
Exemplo de Headers:

x-api-key
zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0

{
    "id": 1,         <=============== id do usuário dono do cartão
    "cardType": "transport"
}
ATENÇÃO: Você receberá o cvc do cartão como uma resposta da api.
É o único momento que a aplicação enviará ele decriptado, use para as
próximas requisições




:::::::::Para ativar um cartão:::::::::
enviar req POST para
/activateCreditCard

Exemplo de envio:

Body
{
	"id":1,    <=============== id do cartão
	"securityCode": "589",  <============== Use o cvc que foi recebido na req de criar cartão
	"password":"1234"
}




:::::::::Para ver as transações:::::::::

enviar req GET para
/balance

Exemplo de envio:

Body
{
    "id":2,               <=============== id do cartão
    "password":"1234"
}




:::::::::Para bloquear um cartão:::::::::
enviar req POST para
/block

Exemplo de envio:

Body
{
    "id":2,          <=============== id do cartão
    "password":"1234"
}




:::::::::Para desbloquear um cartão:::::::::
enviar req POST para
/unblock

Exemplo de envio:

Body
{
    "id":2,          <=============== id do cartão
    "password":"1234"
}





:::::::::Para recarregar um cartão:::::::::
enviar req POST para
/recharge

necessário headers.
Exemplo de Headers:

x-api-key
zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0

Exemplo de envio:

Body
{
    "id": 1,          <=============== id do cartão
    "amount": 300
}




:::::::::Para registrar um gasto:::::::::
enviar req POST para
/payment

Exemplo de envio:

Body
{
    "id": 1,       <=============== id do cartão
    "password":"1234",
    "businessId":1,  <=============== lembre de respeitar o tipo do negócio e sua compactibilidade com o cartão
    "amount": 300
}


::::::::::::::::::::::::::::ARQUIVO ENV::::::::::::::::::::::::::::

DATABASE_URL=postgres://xwyrrynbzqdiwu:a4ac01cbb3f0bbd76bd28e758ddd5249ab1e4252b82ce755bad38f46a15aca7c@ec2-54-159-22-90.compute-1.amazonaws.com:5432/d83n88dtr9stif
PORT = 5000
SECRET = 'ChaveSecreta'