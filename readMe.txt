sending authorization token in api call is compulsory
token needs to be same for generateotp and verifyotp

Note: In the parameters, 'healthIdNumber' refers to ABHA number and 'healthId' refers to ABHA Address.

can i use mongodb in backend to store txnId and aadhaar number, so that 
when getting healthId, we don't sent OTP again and again because it shows: 
Data:  {
  code: 'HIS-422',
  message: 'Unable to process the current request due to incorrect data entered.',   
  details: [
    {
      message: 'You have requested multiple OTPs in this transaction. Please try again in 30 minutes.',
      code: 'HIS-2017',
      attribute: null
    }
  ]
}

DOUBT: check if txnId is unique for particular aadhaar number or not