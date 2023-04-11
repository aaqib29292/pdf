const React = require("react");

const {
  renderToFile,
  renderToStream
} = require("@react-pdf/renderer");

const {
  MyDocument
} = require("./MyDocument");

async function createPdf(res) {
  try {
    // await renderToFile( /*#__PURE__*/React.createElement(MyDocument, null), `${__dirname}/my-doc.pdf`);
    // await renderToFile( /*#__PURE__*/React.createElement(MyDocument, null), `${__dirname}/my-doc.pdf`);
    const result = await renderToStream(React.createElement(MyDocument, null));
    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

    // Streaming our resulting pdf back to the user
    result.pipe(res);
    // return "pdf created in lib directory";
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  createPdf
};
