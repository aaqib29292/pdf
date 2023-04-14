const React = require("react");

const { renderToStream} = require("@react-pdf/renderer");
const { FeeReceipt } = require("./FeeReceipt");

async function createPdf(req, res) {
  try {
    // await renderToFile(<MyDocument />, `${__dirname}/my-doc.pdf`);
    // return "pdf created in lib directory";
    const result = await renderToStream(<FeeReceipt data={req.body} />);
    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=fee-receipt-${req?.body?.receiptDetails?.receiptNumber || '000000'}.pdf`);

    // Streaming our resulting pdf back to the user
    result.pipe(res);
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { createPdf };
