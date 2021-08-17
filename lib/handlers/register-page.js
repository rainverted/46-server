const _data = require('../data');

async function loginPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = await _data.readTemplateHTML('header');
    const footerHTML = await _data.readTemplateHTML('footer');
    const registerHTML = await _data.readTemplateHTML('register');

    headHTML = headHTML.replace('{{page-css}}', 'register');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${registerHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = loginPageHandler;