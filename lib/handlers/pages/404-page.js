const _data = require('../../data');
const header = require('../../components/header');

async function notFoundPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(false);
    const footerHTML = await _data.readTemplateHTML('footer');
    const notFoundHTML = await _data.readTemplateHTML('notFound');

    headHTML = headHTML.replace('{{page-css}}', 'not-found');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${notFoundHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = notFoundPageHandler;