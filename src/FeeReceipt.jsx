const React = require("react");
const { Document, Page, StyleSheet, Text, View } = require("@react-pdf/renderer");

const cx = (...args) => {
  return args.reduce((acc,argument ) => {
    if(typeof argument === 'object'){
      return {...acc, ...argument}
    }
    return acc
  }, {})
}

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
  },
  contentBox: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  lines: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4.5,
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

const Quixote = ({ data = {} }) => {
  const leftColLabelWidth = '30%';
  const rightColLabelWidth = '40%';
  const dataSource = [
    {
      sNo: '1',
      particulars: 'Mike',
      amount: 32,
    },
    {
      sNo: '2',
      particulars: 'John',
      amount: 42,
    },
    {
      sNo: '',
      particulars: 'Total',
      amount: 74,
    },
  ];

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      key: 'sNo',
      width: 50,
    },
    {
      title: 'Particulars',
      dataIndex: 'particulars',
      key: 'particulars',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      textAlign: 'right',
    },
  ];
  return (
    <Document>
      <Page style={s.body}>
        <View style={s.box}>
          <View style={s.header}>
            <View style={s.contentBox}>
              <View style={s.lines}>
                {/*<FontAwesomeIcon icon={faPhoneAlt} className={s.icon} />*/}
                <Caption>+91 98656 65656 | +91 98656 65656</Caption>
              </View>
              <View style={cx(s.lines, { width: '80%' })}>
                {/*<FontAwesomeIcon icon={faMapMarkedAlt} className={s.icon} />*/}
                <Caption style={{ textAlign: 'center' }}>
                  Gurukulam St, near Marikavalasa Road, Paradesipalem, Madhurawada, Visakhapatnam,
                  A.P. 530041
                </Caption>
              </View>
              <View style={s.lines}>
                {/*<FontAwesomeIcon icon={faEnvelope} className={s.icon} />*/}
                <Caption>accounts@intellischool.in</Caption>
              </View>
            </View>
          </View>
          <Headline style={s.heading}>Fee Receipt</Headline>
          <View style={s.details}>
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Transaction ID'}
                  value={'NWTN20232223'}
                />
              }
              secondCol={
                <LabelAndValue
                  labelWidth={rightColLabelWidth}
                  label={'Transaction Time'}
                  value={'09 Jan 2023 04:55 PM'}
                />
              }
            />
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Receipt Number'}
                  value={'IDNT898565'}
                />
              }
              secondCol={
                <LabelAndValue
                  labelWidth={rightColLabelWidth}
                  label={'Payment Mode'}
                  value={'Cash'}
                />
              }
            />
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Student Name'}
                  value={
                    'Aarav Mishra Aarav Mishra Aarav Mishra Aarav Mishra Aarav Mishra Aarav Mishra Aarav' +
                    ' Mishra Aarav Mishra'
                  }
                />
              }
              secondCol={
                <LabelAndValue labelWidth={rightColLabelWidth} label={'Grade'} value={'PPI A'} />
              }
            />
            <DetailsColumns
              firstCol={
                <LabelAndValue
                  labelWidth={leftColLabelWidth}
                  label={'Enrollment Number'}
                  value={'GVS9686564'}
                />
              }
              secondCol={
                <LabelAndValue labelWidth={rightColLabelWidth} label={'URN'} value={'123141212'} />
              }
            />
          </View>
          <View>
            <Table columns={columns} dataSource={dataSource} hasFooter={true} />
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


module.exports = { Quixote };
