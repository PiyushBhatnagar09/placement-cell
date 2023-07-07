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

1: check if txnId is unique for particular aadhaar number or not?
Yes, transaction id is changing for every new request of the same user

2: data should not be displayed in url of browser

3: healthId/healthNumber is unique?
healthid i.e. abha number is unique but a person can have multiple abha addresses i.e. health id number but it should be unique in the sense, no other person has taken that address with same name

4: do we pass healthid from our frontend?




npm install crypto
npm install axios