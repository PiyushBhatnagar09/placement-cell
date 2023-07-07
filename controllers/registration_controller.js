const clientId = "SBX_003016";
const clientSecret = "6b25957f-f3ed-4849-9db5-a0e2b59f47aa";

async function generateNewToken() {
  const fetch = require("node-fetch");
  const apiUrl = "https://dev.abdm.gov.in/gateway/v0.5/sessions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: clientId,
        clientSecret: clientSecret,
      }),
    });

    if (!response) {
      console.log('Request failed for token generation');
      res.json('fail');
      return;
    }

    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    res.json('fail');
    console.error("Error:", error.message);
  }
}

module.exports.generateAadhaarOtp = async function (req, res) {
  const fetch = require("node-fetch");
  const apiUrl = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp";
  const token = await generateNewToken();
 
  const {aadhaar_number}= req.body;
  console.log(aadhaar_number);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        aadhaar: aadhaar_number,
      }),
    });

    if (!response) {
      console.log('Request failed for token generation');
      res.json('fail');
      return;
    }

    var data = await response.json();
    console.log('Printing data: ',data);
    if(data.txnId)
    {
      data= {
        txn_id: data.txnId,
        token: token
      }
      
      res.json(data);
    }
    else {
      res.json('fail');
      console.log('cant send otp');
    }
   
  } catch (error) {
    res.json('fail');
    console.error("Error:", error.message);
  }
};

module.exports.resendAadhaarOtp = async function (req, res) {

  const token = req.query.token;
  const txn_id = req.query.txn_id;
  const fetch = require("node-fetch");

  const apiUrl =
    "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/resendAadhaarOtp";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        txnId: txn_id,
      }),
    });

    if (!response) {
      console.log('Request failed for token generation');
      res.json('fail');
      return;
    }

    const data = await response.json();
    if (data.txnId) {
      console.log("OTP resent successful");
      return;
    }
  } catch (error) {
    res.json('fail');
    console.error("Error:", error.message);
  }
};

module.exports.verifyAadhaarOTP = async function (req, res) {

  console.log("query: ", req.query.txn_id);
  console.log("query: ", req.query.token);
  console.log("otp: ", req.body.otp);

  const token = req.query.token;
  const txn_id = req.query.txn_id;
  const fetch = require("node-fetch");

  const apiUrl =
    "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyOTP";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        otp: req.body.otp,
        txnId: txn_id,
      }),
    });

    if (!response) {
      console.log('Request failed for token generation');
      return;
    }

    const data = await response.json();
    if (data.txnId) {
      data= {
        txn_id: data.txnId,
        token: token
      }
      
      res.json(data);
    } else {
      console.log("Verification Unsuccessful, Invalid OTP/Session Expired");
      res.json('fail');
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.json('fail');
  }

};

module.exports.generateMobileOTP= async function(req, res) {
  const token = req.query.token;
  const txn_id = req.query.txn_id;
  const mobile_number= req.body.mobile_number;

  const fetch = require("node-fetch");
  const apiUrl =
    "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateMobileOTP";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mobile: mobile_number,
        txnId: txn_id,
      }),
    });

    if (!response) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    if (data.txnId) {
      data= {
        txn_id: data.txnId,
        token: token
      }
      
      res.json(data);
    } else {
      res.json('fail');
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.json('fail');  }
}

module.exports.verifyMobileOTP = async function (req, res) {

  console.log("query: ", req.query.txn_id);
  console.log("query: ", req.query.token);
  console.log("otp: ", req.body.otp);

  const token = req.query.token;
  const txn_id = req.query.txn_id;
  const fetch = require("node-fetch");

  const apiUrl =
    "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyMobileOTP";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        otp: req.body.otp,
        txnId: txn_id,
      }),
    });

    if (!response) {
      console.log('Request failed for token generation');
      res.json('fail');
      return;
    }

    const data = await response.json();
    if (data.txnId) {
      console.log("Mobile OTP Verified Successfully");
      const userInfo= await createHealthIdWithPreVerified(token, txn_id);
      data= {
        txn_id: data.txnId,
        token: token,
        userInfo: userInfo
      }
      
      res.json(data);
    } else {
      console.log("Verification Unsuccessful, Invalid OTP/Session Expired");
      res.json('fail');
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.json('fail');
  }

};

async function createHealthIdWithPreVerified(token, txn_id) {
  const fetch = require("node-fetch");
  var apiUrl = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified";

  try {
    var response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        txnId: txn_id
      }),
    });

    if (!response) {
      console.log('Request failed for token generation');
      res.json('fail');
      return;
    }

    var data = await response.json();
    console.log('User Data from Aadhaar: ', data);
    if(data.firstName) {
      return data;
    }
    else {
      console.log('Error in getting user data');
      res.json('fail');    }
  } catch (error) {
    console.error("Error:", error.message);
    res.json('fail');  }
};

//search abha address
module.exports.searchAbhaAddress= async function(req, res) {
  const abha_address= req.body.abha_address;

  const fetch = require("node-fetch");
  var apiUrl = "https://healthidsbx.abdm.gov.in/api/v1/search/existsByHealthId";

  try {
    var response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        healthId: abha_address
      }),
    });

    if (!response) {
      console.log('Request failed for token generation');
      res.json('fail');
      return;
    }

    var data = await response.json();
    console.log('User Data from Aadhaar: ', data);
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.json('fail');  }
}

//link/delink abha address

module.exports.linkAbhaAddress= async function(req, res) {
  
}






//email verification

module.exports.verifyEmail= async function(req, res) {
  const token = req.query.token;
  const txn_id = req.query.txn_id;
  const mobile_number= req.body.mobile_number;

  const fetch = require("node-fetch");
  const apiUrl =
    "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateMobileOTP";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mobile: mobile_number,
        txnId: txn_id,
      }),
    });

    if (!response) {
      res.json('fail');
      throw new Error("Request failed");
    }

    const data = await response.json();
    if (data.txnId) {
      data= {
        txn_id: data.txnId,
        token: token
      }
      
      res.json(data);
    } else {
      res.json('fail');
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.json('fail');  }
}