const React = require("react");
const dayjs = require('dayjs');
const { Document, Page, StyleSheet, Text, View, Svg, Path, Image } = require("@react-pdf/renderer");

const cx = (...args) => {
  return args.reduce((acc,argument ) => {
    if(typeof argument === 'object'){
      return {...acc, ...argument}
    }
    return acc
  }, {})
}

const toRupee = (amount = 0, maximumFractionDigits = 0) => {
  let number = amount || 0;

  if (typeof amount === 'string') {
    number = parseFloat(amount);
  }
  if (Number.isNaN(number)) {
    throw new Error(`${amount} is not a number`);
  }
  return number.toLocaleString('en-IN', {
    maximumFractionDigits,
    // style: 'currency',
    // currency: 'INR',
  });
};

const headline = StyleSheet.create({
  common: {
    color: '#101112',
    fontSize: '12px',
    lineHeight: 1.16,
    fontWeight: 400,
    display: 'inline-block',
  },
  block: {
    display: 'block',
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
});

const Headline = ({ bold = true, block = true, style = {}, children, ...props }) => {
  return (
    <Text
      style={cx(headline.common, bold && headline.bold, block && headline.block, style)}
      {...props}
    >
      {children}
    </Text>
  );
};

const body = StyleSheet.create({
  common: {
    color: '#101112',
    fontSize: 10,
    lineHeight: 1.1,
    fontWeight: 400,
    display: 'inline-block',
  },
  block: {
    display: 'block',
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
});

const Body = ({ bold = false, block = false, style = {}, children, ...props }) => {
  return (
    <Text style={cx(body.common, bold && body.bold, block && body.block, style)} {...props}>
      {children}
    </Text>
  );
};

const caption = StyleSheet.create({
  common: {
    color: '#101112',
    fontSize: 9,
    lineHeight: 1.11,
    fontWeight: 400,
    display: 'inline-block',
  },
  block: {
    display: 'block',
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
});

const Caption = ({ bold = false, block = false, style = {}, children, ...props }) => {
  return (
    <Text
      style={cx(caption.common, bold && caption.bold, block && caption.block, style)}
      {...props}
    >
      {children}
    </Text>
  );
};

const detailsColumnsStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '4px',
  },
  firstCol: {
    marginRight: 8,
    width: '55%',
  },
  secondCol: {
    flex: 1,
  },
});

const DetailsColumns = ({ firstCol, secondCol }) => {
  return (
    <View style={detailsColumnsStyles.wrapper}>
      <View style={detailsColumnsStyles.firstCol}>{firstCol}</View>
      <View style={detailsColumnsStyles.secondCol}>{secondCol}</View>
    </View>
  );
};

const labelAndValueStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  value: {
    marginTop: 1,
    flex: 1,
  },
});

const LabelAndValue = ({ labelWidth, label, value }) => {
  return (
    <View style={labelAndValueStyles.wrapper}>
      <View style={{ width: labelWidth }}>
        <Body bold>{label}</Body>
      </View>
      <View style={{ marginRight: 4 }}>
        <Body bold>:</Body>
      </View>
      <View style={labelAndValueStyles.value}>
        <Body>{value}</Body>
      </View>
    </View>
  );
};

const table = StyleSheet.create({
  wrapper: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#868992',
  },
  tableRow: {
    flexDirection: 'row',
    background: '#F8F8F8',
  },
  tableHeader: {
    backgroundColor: '#F2F4F8',
  },
  tableFooter: {
    backgroundColor: '#F2F4F8',
    fontFamily: 'Times-Bold',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#868992',
  },
  tableCell: {
    padding: '4.5px 8px',
  },
});

const Table = ({ columns = [], dataSource = [], hasFooter = false }) => {
  return (
    <View style={table.wrapper}>
      <View style={cx(table.tableRow, table.tableHeader)}>
        {columns.map(({ width, key, title, ...prop } = {}) => {
          return (
            <View key={key} style={cx(table.tableCol, width ? { width: width } : { flex: 1 })}>
              <Body bold={true} style={cx(table.tableCell, { ...prop })}>
                {title}
              </Body>
            </View>
          );
        })}
      </View>
      {dataSource?.map((row, index) => {
        return (
          <View
            key={index}
            style={cx(table.tableRow, index + 1 === dataSource?.length && table.tableFooter)}
          >
            {columns.map(({ width, key, ...prop } = {}) => {
              return (
                <View key={key} style={cx(table.tableCol, width ? { width } : { flex: 1 })}>
                  <Body style={cx(table.tableCell, { ...prop })}>{row[key]}</Body>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const PhoneIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
      <Path
        d="M7.29492 5.82422L5.76367 5.16797C5.72266 5.1543 5.68164 5.14062 5.62695 5.14062C5.53125 5.14062 5.43555 5.19531 5.38086 5.26367L4.69727 6.09766C3.63086 5.5918 2.7832 4.74414 2.27734 3.67773L3.11133 2.99414C3.17969 2.93945 3.23438 2.84375 3.23438 2.73438C3.23438 2.69336 3.2207 2.65234 3.20703 2.61133L2.55078 1.08008C2.49609 0.957031 2.37305 0.875 2.23633 0.875C2.22266 0.875 2.19531 0.888672 2.16797 0.888672L0.746094 1.2168C0.595703 1.25781 0.5 1.38086 0.5 1.53125C0.5 5.04492 3.33008 7.875 6.84375 7.875C6.99414 7.875 7.11719 7.7793 7.1582 7.62891L7.48633 6.20703C7.48633 6.17969 7.48633 6.15234 7.48633 6.13867C7.48633 6.00195 7.4043 5.87891 7.29492 5.82422Z"
        fill="#101112"
      />
    </Svg>
  );
};

const LocationIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="6" height="8" viewBox="0 0 6 8" fill="none">
      <Path
        d="M2.72656 7.73828C2.84961 7.92969 3.13672 7.92969 3.25977 7.73828C5.25586 4.86719 5.625 4.56641 5.625 3.5C5.625 2.05078 4.44922 0.875 3 0.875C1.53711 0.875 0.375 2.05078 0.375 3.5C0.375 4.56641 0.730469 4.86719 2.72656 7.73828ZM3 4.59375C2.38477 4.59375 1.90625 4.11523 1.90625 3.5C1.90625 2.89844 2.38477 2.40625 3 2.40625C3.60156 2.40625 4.09375 2.89844 4.09375 3.5C4.09375 4.11523 3.60156 4.59375 3 4.59375Z"
        fill="#101112"
      />
    </Svg>
  );
};

const EmailIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="7" height="6" viewBox="0 0 7 6" fill="none">
      <Path
        d="M6.86328 2.48633C6.54883 2.73242 6.15234 3.0332 4.75781 4.04492C4.48438 4.25 3.97852 4.70117 3.5 4.70117C3.00781 4.70117 2.51562 4.25 2.22852 4.04492C0.833984 3.0332 0.4375 2.73242 0.123047 2.48633C0.0683594 2.44531 0 2.48633 0 2.55469V5.34375C0 5.71289 0.287109 6 0.65625 6H6.34375C6.69922 6 7 5.71289 7 5.34375V2.55469C7 2.48633 6.91797 2.44531 6.86328 2.48633ZM3.5 4.25C3.81445 4.26367 4.26562 3.85352 4.49805 3.68945C6.31641 2.37695 6.45312 2.25391 6.86328 1.92578C6.94531 1.87109 7 1.77539 7 1.66602V1.40625C7 1.05078 6.69922 0.75 6.34375 0.75H0.65625C0.287109 0.75 0 1.05078 0 1.40625V1.66602C0 1.77539 0.0410156 1.87109 0.123047 1.92578C0.533203 2.25391 0.669922 2.37695 2.48828 3.68945C2.7207 3.85352 3.17188 4.26367 3.5 4.25Z"
        fill="#101112"
      />
    </Svg>
  );
};

const s = StyleSheet.create({
  body: {
    padding: 24,
    fontFamily: 'Times-Roman',
    color: '#101112',
  },
  box: {
    border: '1px solid #868992',
    padding: 12,
  },
  header: {
    borderBottom: '1px solid #e6e8eb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 8,
    position: 'relative',
  },
  logo: {
    height: 48,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contentBox: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  schoolName: {
    color: '#101112',
    fontSize: '16px',
    lineHeight: 1.125,
    fontFamily: 'Times-Bold',
  },
  lines: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4.5,
  },
  icon: {
    marginRight: 4,
  },
  heading: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  details: {
    marginBottom: 8,
  },

  note: {
    marginTop: 8,
    border: '1px solid #868992',
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

const FeeReceipt = ({ data = {} }) => {
  console.log(data)
  const leftColLabelWidth = '30%';
  const rightColLabelWidth = '40%';
  const dataSource = [
    ...data?.paidTowards,
    {
      index: '',
      particulars: 'Total',
      amount: data?.paidTowards.reduce((acc = 0, paidToward) => acc + (paidToward.amount || 0), 0),
    },
  ];

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      textAlign: 'center',
    },
    {
      title: 'Particulars',
      dataIndex: 'particulars',
      key: 'particulars',
    },
    {
      title: 'Amount in INR',
      dataIndex: 'amountInRupee',
      key: 'amountInRupee',
      textAlign: 'right',
    },
  ];

  const { receiptDetails = {} } = data;
  return (
    <Document>
      <Page style={s.body}>
        <View style={s.box}>
          <View style={s.header}>
            {/*<Image style={s.logo} src={intelli_logo_v} />*/}
            <View style={s.contentBox}>
              {data?.captions.map((caption) => {
                if (caption.type === 'schoolName') {
                  return (
                    <View style={s.lines}>
                      <Text style={s.schoolName}>{caption.name}</Text>
                    </View>
                  );
                }
                if (caption.type === 'subTitle') {
                  return (
                    <View style={s.lines}>
                      <Body>{caption.name}</Body>
                    </View>
                  );
                }
                if (caption.type === 'phoneNumber') {
                  return (
                    <View style={s.lines}>
                      <View style={s.icon}>
                        <PhoneIcon />
                      </View>
                      <Caption>{caption.name}</Caption>
                    </View>
                  );
                }
                if (caption.type === 'address') {
                  return (
                    <View style={cx(s.lines, { alignItems: 'flex-start' }, { width: '80%' })}>
                      <View style={cx(s.icon, { marginTop: 1 })}>
                        <LocationIcon />
                      </View>
                      <Caption style={{ textAlign: 'center' }}>{caption.name}</Caption>
                    </View>
                  );
                }
                if (caption.type === 'email') {
                  return (
                    <View style={s.lines}>
                      <View style={s.icon}>
                        <EmailIcon />
                      </View>
                      <Caption>{caption.name}</Caption>
                    </View>
                  );
                }
              })}
            </View>
          </View>
          <Headline style={s.heading}>Fee Receipt</Headline>
          <View style={s.details}>
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Transaction ID'}
                  value={receiptDetails?.transactionId}
                />
              }
              secondCol={
                <LabelAndValue
                  labelWidth={rightColLabelWidth}
                  label={'Transaction Time'}
                  value={dayjs(receiptDetails?.transactionTime || '').format('DD MMM YYYY hh:mm A')}
                />
              }
            />
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Receipt Number'}
                  value={receiptDetails?.receiptNumber}
                />
              }
              secondCol={
                <LabelAndValue
                  labelWidth={rightColLabelWidth}
                  label={'Student Name'}
                  value={receiptDetails?.name}
                />
              }
            />
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={data?.receiptFor === 'admission' ? 'URN' : 'Enrollment Number'}
                  value={
                    data?.receiptFor === 'admission'
                      ? receiptDetails?.urn
                      : receiptDetails?.enrollmentNumber
                  }
                />
              }
              secondCol={
                <LabelAndValue
                  labelWidth={rightColLabelWidth}
                  label={'Father Name'}
                  value={receiptDetails?.fatherName}
                />
              }
            />
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Grade and Year'}
                  value={receiptDetails?.gradeAndAy}
                />
              }
              secondCol={
                <LabelAndValue
                  labelWidth={rightColLabelWidth}
                  label={'Mother Name'}
                  value={receiptDetails?.motherName}
                />
              }
            />
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Payment Method'}
                  value={
                    receiptDetails.paymentMode === 'Cheque'
                      ? 'Cheque' +
                      (receiptDetails?.chequeNumber ? `-${receiptDetails?.chequeNumber}` : '')
                      : receiptDetails?.paymentMode
                  }
                />
              }
              secondCol={
                receiptDetails.paymentMode === 'cheque' && (
                  <LabelAndValue
                    labelWidth={rightColLabelWidth}
                    label={'Bank Name & Date'}
                    value={
                      receiptDetails?.bankName +
                      (receiptDetails.paymentMode === 'Cheque' &&
                        ` - ${dayjs(receiptDetails?.chequeDate || '').format('DD MMM YY')}`)
                    }
                  />
                )
              }
            />
          </View>
          <View>
            <Table
              columns={columns}
              dataSource={dataSource.map((item) => {
                const temp = { ...item };
                temp.amountInRupee = toRupee(item.amount);

                return temp;
              })}
              hasFooter={true}
            />
          </View>
          <View style={s.note}>
            <View style={{ marginRight: 5 }}>
              <Body bold={true}>Note:</Body>
            </View>
            <View style={{ flex: 1 }}>
              <Body>
                Parents are requested to preserve this receipt for future clarifications in respect
                of fee paid by you. Fee once paid will not be refunded or transferred. Cheques
                subject to relaxations.
              </Body>
            </View>
          </View>
          <View style={{ textAlign: 'center', marginTop: 8 }}>
            <Body>This is a computer generated receipt no signature is required</Body>
          </View>
        </View>
      </Page>
    </Document>
  );
};

module.exports = { FeeReceipt };
