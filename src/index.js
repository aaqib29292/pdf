const express = require("express");
const path = require("path");
const cors = require("cors");

const { createPdf } = require("./createPdf");

const PORT = process.env.PORT || 8000;

const app = express();

app.use('/images', express.static(path.resolve(__dirname, "images")));
// app.use('/images', express.static('images'));
// Handling JSON datas
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname));

const mockReq = {
  receiptFor: 'admission',
  schoolId: 1,
  captions: [
    {
      name: 'Newton Classroom',
      type: 'schoolName',
      index: 1,
    },
    {
      name: '(Surreal Technologies Educational Group)',
      type: 'subTitle',
      index: 2,
    },
    {
      name: 'Kondapur Main Road, Laxmi Cyber City, Whitefields, Kondapur, Hyderabad, Telangana 500081',
      type: 'address',
      index: 3,
    },
    {
      name: '9100943721, 9100943722',
      type: 'phoneNumber',
      index: 4,
    },
    {
      name: 'hello@newtonclassroom.com',
      type: 'email',
      index: 5,
    },
  ],
  paidTowards: [
    {
      index: 1,
      amount: 11000,
      particulars: 'Security Deposit - Term 1',
    },
    {
      index: 2,
      amount: 19000,
      particulars: 'Tuition Fee - Term 1',
    },
    {
      index: 3,
      amount: 1000,
      particulars: 'Lunch and Snack Fee - Term 1',
    },
  ],
  receiptDetails: {
    fatherName: 'Thanmay Mishra',
    gradeAndAy: 'V AY21-22',
    motherName: '-',
    paymentMode: 'Cheque',
    receiptNumber: 'Q21A0092',
    name: 'Saveadm Payment Test',
    transactionId: 'g0Yu5Oe57vuC',
    transactionTime: '2023-03-30T16:39:11.229Z',
    enrollmentNumber: 0,
    urn: 'JYQ7448',
    bankName: 'ICICI',
    chequeDate: '2023-03-30T16:38:55.688Z',
  },
};

app.get("/", function (req, res) {
  req.body = mockReq
 return createPdf(req, res)
});

app.post("/fee-receipt", function (req, res) {
  return createPdf(req, res)
});

app.listen(PORT).on("listening", () => {
  console.log(`🚀 we are live on port ${PORT}`);
});
