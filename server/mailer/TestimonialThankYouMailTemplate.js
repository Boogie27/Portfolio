






const HtmlMessage = (input, settings) => {
    html = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta input="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Email</title>
                </head>
                <body>
                    <br>
                    <br>
                    <br>
                    <div>Dear ${input.name},</div>
                    <br>
                    <br>
                    Thank you for taking the time to rate ${settings.app_name}. We have received your message, we hope to work with you again in the future.
                    <br>
                    <br>
                    If you have any urgent issues, please feel free to call us at ${settings.phone_one ?? settings.phone_one} ${settings.phone_two ? 'or' : ''} ${settings.phone_two ?? settings.phone_two}. <br>
                    We appreciate your patience and will respond to your inquiry as soon as possible.
                    <br>
                    <br>
                    <br>
                    

                    Kind reguards,<br>
                     ${settings.app_name} admin.<br>
                    Phone one: ${settings.phone_one} <br>
                    ${settings.phone_two ? 'Phone two:' : ''} ${settings.phone_two ?? settings.phone_two}
                </body>
            </html>`;

    return html
}





module.exports = HtmlMessage