const { default: axios } = require("axios");
const AliceBlue = async () => {
  var resultData = null;
  var apiKey =
    "BbQCEusJvIiKLdaRtoOyddOKiGGmYBHqq6l5fOxPTCh5opBUfTzBtNH3p75e941cVpdE8VORoBgmqx7a02dc2kKVdOueIZEMhjLA7Nna0l50yEOT1NKUH7DanSK2vcHC";
  var usrid = "768918";
  const WebSocket2 = require("ws").WebSocket;
  var crypto = require("crypto");

  const encrpytSHA256 = (a, b, c) => {
    var hash = crypto
      .createHash("sha256")
      .update(`${a}${b}${c}`, "utf-8")
      .digest("hex");
    return hash;
  };
  const encrpytSHA2561 = (a) => {
    var hash = crypto.createHash("sha256").update(a, "utf-8").digest("hex");
    return hash;
  };

  axios({
    method: "post", //you can set what request you want to be
    url: "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/customer/getAPIEncpkey",
    data: JSON.stringify({
      userId: usrid,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.data)
    .then((result) => {
      console.log(result, "ressuulltt");
      var r = result;
      console.log(r.encKey, "encrypted Key");
      console.log(encrpytSHA256(usrid, apiKey, r.encKey), "both should be ");
      axios({
        method: "post", //you can set what request you want to be
        url: "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/customer/getUserSID",
        data: JSON.stringify({
          userId: usrid,
          userData: encrpytSHA256(usrid, apiKey, r.encKey),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.data)
        .then((ssid) => {
          console.log(ssid, "QQQQQQQQQ");
          axios({
            method: "post", //you can set what request you want to be
            url: "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/ws/createWsSession",
            headers: {
              Authorization: `Bearer ${usrid} ${ssid.sessionID}`,
            },
          })
            .then((response) => response.data)
            .then((result) => {
              console.log(result.result.wsSess, "RRRRRRRR");
              console.log(ssid.sessionID, "SSSS");
              const ws = new WebSocket2(
                "wss://ws2.aliceblueonline.com/NorenWS/"
              );

              ws.on("open", function open() {
                data = JSON.stringify({
                  susertoken: encrpytSHA2561(encrpytSHA2561(ssid.sessionID)),
                  t: "c",
                  actid: `${usrid}_API`,
                  uid: `${usrid}_API`,
                  source: "API",
                });
                console.log(data, "FNALLe");
                ws.send(data);
              });

              ws.on("message", function message(data) {
                ws.send(JSON.stringify({ k: "NSE|26009#NSE|26000", t: "t" }));
                ws.close();
              });
              ws.on("message", function message(data) {
                resultData = JSON.parse(data);
                console.log("received: %s", resultData);
              });
            })
            .catch((error) => console.log("connect session error", error));
        })
        .catch((error) => console.log("getssid error", error));
    })
    .catch((error) => console.log("get enckey error", error));
};
AliceBlue();