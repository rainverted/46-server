const _data = require('../../data');
const header = require('../../components/header');

async function homePageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(false);
    const footerHTML = await _data.readTemplateHTML('footer');
    const heroHTML = await _data.readTemplateHTML('home-hero');
    const servicesHTML = await _data.readTemplateHTML('services');

    headHTML = headHTML.replace('{{page-css}}', 'home');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${heroHTML}
                        ${servicesHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = homePageHandler;