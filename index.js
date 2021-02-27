const fs = require('fs');
const pdfparse = require('pdf-parse');

const pdfFileName = ''; //'pdf file name'
const searchFor = ''; // 'word'


function render_page(pageData) {
    
    let render_options = {
        normalizeWhitespace: false,
        disableCombineTextItems: false
    }
 
    return pageData.getTextContent(render_options)

    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY){
                text += item.str;
            }  
            else{
                text += '\n' + item.str;
            }    
            lastY = item.transform[5];
        }
        return text;
    });
}
 
let options = {
    pagerender: render_page
}
 
let dataBuffer = fs.readFileSync(pdfFileName);

 
pdfparse(dataBuffer,options).then(function(data) {
    //use new format
    const alltext = (data.text);

    console.log(alltext.includes(searchFor, 0));
});
