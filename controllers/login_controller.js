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
        return;
      }
  
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error("Error:", error.message);
      return res.redirect('/');
    }
}

async function authInit(usedMethod, token, healthId) {
    const fetch = require("node-fetch");
    const apiUrl = "https://healthidsbx.abdm.gov.in/api/v1/auth/init";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                authMethod: usedMethod,
                healthId: healthId
            }),
        });

        if (!response) {
            console.log('authInit no response');
            return;
        }

        const data = await response.json();
        return data.txnId;
    } catch (error) {
        console.error("Error:", error.message);
        return res.redirect('/');
    }
}

module.exports.aadhaarOtp= async function(req, res) {
    const token = await generateNewToken();
    const txnId= authInit("AADHAAR_OTP", token, req.body.abha_number);

    return res.render('verifyLoginOtp', {
        form_url: ""
    })
}
module.exports.verifyAadhaarOtp= async function(req, res) {
    const fetch = require("node-fetch");
    const apiUrl = "https://healthidsbx.abdm.gov.in/api/v1/auth/confirmWithAadhaarOtp";
    const token = await generateNewToken();
    const txnId= authInit("AADHAAR_OTP", token, req.body.abha_number);

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
        console.log('Request failed for token generation');
        return;
        }

        const data = await response.json();
        return res.render("verifyAadhaarOtp", {
        txn_id: data.txnId,
        token: token,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.redirect('/');
    }
}

module.exports.verifyAadhaarOtp= function(req, res) {

}

module.exports.mobileOtp= function(req, res) {

}

module.exports.verifyMobileOtp= function(req, res) {

}