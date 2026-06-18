import nodemailer from "nodemailer";

export const sendContactMessage = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `Contact Form: ${subject}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
    </head>
    <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
    
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 0;">
        <tr>
          <td align="center">
    
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    
              <!-- Header -->
              <tr>
                <td
                  align="center"
                  style="
                    background:linear-gradient(135deg,#210944,#08264c);
                    color:#ffffff;
                    padding:30px;
                  "
                >
                  <h1 style="margin:0;">CV Store</h1>
                  <p style="margin:8px 0 0;">
                    New Contact Form Submission
                  </p>
                </td>
              </tr>
    
              <!-- Body -->
              <tr>
                <td style="padding:30px;">
    
                  <h2 style="color:#210944;margin-top:0;">
                    Contact Details
                  </h2>
    
                  <table width="100%" cellpadding="10" cellspacing="0">
    
                    <tr>
                      <td style="font-weight:bold;width:120px;">
                        Name:
                      </td>
                      <td>${name}</td>
                    </tr>
    
                    <tr style="background:#f8f9fa;">
                      <td style="font-weight:bold;">
                        Email:
                      </td>
                      <td>${email}</td>
                    </tr>
    
                    <tr>
                      <td style="font-weight:bold;">
                        Subject:
                      </td>
                      <td>${subject}</td>
                    </tr>
    
                  </table>
    
                  <div
                    style="
                      margin-top:25px;
                      padding:20px;
                      background:#f8f9fa;
                      border-left:4px solid #210944;
                      border-radius:6px;
                    "
                  >
                    <h3 style="margin-top:0;color:#210944;">
                      Message
                    </h3>
    
                    <p
                      style="
                        margin:0;
                        line-height:1.7;
                        color:#444;
                      "
                    >
                      ${message}
                    </p>
                  </div>
    
                </td>
              </tr>
    
              <!-- Footer -->
              <tr>
                <td
                  align="center"
                  style="
                    background:#f8f9fa;
                    padding:20px;
                    color:#666;
                    font-size:14px;
                  "
                >
                  © ${new Date().getFullYear()} CV Store
                  <br />
                  This email was generated from the Contact Us form.
                </td>
              </tr>
    
            </table>
    
          </td>
        </tr>
      </table>
    
    </body>
    </html>
    `,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
