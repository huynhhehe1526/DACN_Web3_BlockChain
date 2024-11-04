const sass = require('sass');
sass.compileAsync("D:\\NAM_TU\\DoAnChuyenNganh\\edit_source\\DACN_Web3_BlockChain\\src\\component_page\\scss\\main.scss", {
    silenceDeprecations: ['legacy-js-api'],
}).then(result => {
    console.log(result.css.toString());
}).catch(err => {
    console.error(err);
});
