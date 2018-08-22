const express = require("express");
const app = express();
const sgMail = require("@sendgrid/mail");
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());
process.env.SENDGRID_API_KEY =
  "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";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get("/", (req, res) => res.send("/public/index.html"));
app.post("/sendMail", (req, res) => {
    console.log(req.body["subject"]);
  const msg = {
    to: "jbryant@virtualhavenstudios.com",
    from: "HealthMarketingsite@virtualhavenstudios.health.com",
    subject: "Heads Up You Have A New Message",

    html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Making Accessible Emails</title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                /* CLIENT-SPECIFIC STYLES */
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; }
        
                /* RESET STYLES */
                img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
                table { border-collapse: collapse !important; }
                body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
                p span{
                    font-weight:bold;
                }
            </style>
          </head>
          <body style="background-color: lightgrey; margin: 0 !important; padding: 60px 0 60px 0 !important;">
            <table border="0" cellspacing="0" cellpadding="0" role="presentation" width="100%">
              <tr>
                  <td bgcolor="lightgrey" style="font-size: 0;">&​nbsp;</td>
                  <td bgcolor="white" width="600" style="border-radius: 4px; font-family: sans-serif; padding: 20px 40px;">
                    <h1>Subject: &nbsp; ${req.body["subject"]}</h1>
                    <br>
                    <br>
                    <br>
                    <br>
                    <p>You have a new message from <span>${req.body["name"]}</span> heres there message: <br><br> ${req.body["message"]}</p>
                  </td>
                  <td bgcolor="lightgrey" style="font-size: 0;"> &​nbsp; </td>
              </tr>
            </table>
          </body>
        </html>
        `
  };

  sgMail
    .send(msg)
    .then(
      success => {
        console.log("mail sent ok");
        console.log(success);
        res.sendStatus(200);
      },
      rejected => {
        console.log("mail failed to send");
        console.log(rejected)
        res.sendStatus(417);
      }
    )
    .catch(() => {
        res.sendStatus(417);
      console.log("its all bad");
    });
  res.send("OK");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
