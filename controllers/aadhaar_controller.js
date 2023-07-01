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
      throw new Error("Request failed for token");
    }

    const data = await response.json();
    // console.log("token API response:", data);
    // console.log(data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports.generateOtp = async function (req, res) {
  const fetch = require("node-fetch");

  const apiUrl =
    "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp";
  const token = await generateNewToken();
  console.log("Print token: ", token);
  //   console.log("aadhaaarrr number: ", req.body.aadhaar_number);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        aadhaar: req.body.aadhaar_number,
      }),
    });

    if (!response) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    // console.log("API response1:", data);
    return res.render("verifyOtp", {
      txn_id: data.txnId,
      token: token,
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports.resendAadhaarOtp = async function (req, res) {
  console.log("here");
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
      // throw new Error("Request failed");
      console.log("Request Failed to resend OTP!!");
      // return res.redirect('back');
    }

    const data = await response.json();
    if (data.txnId) {
      console.log("OTP resent successful");
    }
    // console.log("API response1:", data);
    //   return res.redirect('back');
  } catch (error) {
    console.log("Error:", error.message);
    //   return res.redirect('back');
  }
};

module.exports.verifyOTP = async function (req, res) {
  console.log("query: ", req.query.txn_id);
  console.log("query: ", req.query.token);
  const token = req.query.token;
  const txn_id = req.query.txn_id;
  console.log("otp: ", req.body.otp);
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
      throw new Error("Request failed");
    }

    const data = await response.json();
    if (data.txnId) {
      // document.alert('OTP verified successfully');
      console.log("Verified Successfully");
      return res.redirect("/");
    } else {
      // document.alert(`Invalid OTP/Session Expired`);
      console.log("Verification Unsuccessful, Invalid OTP/Session Expired");
      return res.redirect("/");
    }
  } catch (error) {
    console.log("Error:", error.message);
    return res.redirect("/");
  }
};

module.exports.generateHealthId = async function (req, res) {
  return res.render("getHealthId");
};

module.exports.createHealthIdWithPreVerified = async function (req, res) {
    //generating new token and txnId
  const token = await generateNewToken();

  const fetch = require("node-fetch");
  var apiUrl = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp";

  try {
    var response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        aadhaar: req.body.aadhaar_number,
      }),
    });

    if (!response) {
      throw new Error("Request failed");
    }

    var data = await response.json();
    console.log('Data: ',data);
    var txn_id= data.txnId;
    console.log('Transaction id: ', txn_id);

    apiUrl =
    "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified";

    response = await fetch(apiUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            txnId: txn_id
        }),
    });

    if (!response) {
        throw new Error("Request failed");
    }

    data = await response.json();
    if (data) {
        console.log("Got HealthId Successfully");
        console.log(data);
        return res.redirect("/");
    } else {
        // document.alert(`Invalid OTP/Session Expired`);
        console.log("Unsuccessful, Session Expired/Technical Error");
        return res.redirect("/");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};