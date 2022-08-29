module.exports = {
    makeWebp: false, // option to make or not to make .webp images during the process of optimization
    src: './assets/images/', // src folder. Must exist
    dest: './static/images/', // destination folder. Must exist
    webpQuality: 80, // webp quality in percents
    jpegQuality: 90, // jpg quality in percents
    logLevel: 'verbose', //
};
