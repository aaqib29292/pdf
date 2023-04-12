function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const React = require("react");
const {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} = require("@react-pdf/renderer");
const cx = (...args) => {
  return args.reduce((acc, argument) => {
    if (typeof argument === 'object') {
      return {
        ...acc,
        ...argument
      };
    }
    return acc;
  }, {});
};
const headline = StyleSheet.create({
  common: {
    color: '#101112',
    fontSize: '12px',
    lineHeight: 1.16,
    fontWeight: 400,
    display: 'inline-block'
  },
  block: {
    display: 'block'
  },
  bold: {
    fontFamily: 'Times-Bold'
  }
});
const Headline = ({
  bold = true,
  block = true,
  style = {},
  children,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(Text, _extends({
    style: cx(headline.common, bold && headline.bold, block && headline.block, style)
  }, props), children);
};
const body = StyleSheet.create({
  common: {
    color: '#101112',
    fontSize: 10,
    lineHeight: 1.1,
    fontWeight: 400,
    display: 'inline-block'
  },
  block: {
    display: 'block'
  },
  bold: {
    fontFamily: 'Times-Bold'
  }
});
const Body = ({
  bold = false,
  block = false,
  style = {},
  children,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(Text, _extends({
    style: cx(body.common, bold && body.bold, block && body.block, style)
  }, props), children);
};
const caption = StyleSheet.create({
  common: {
    color: '#101112',
    fontSize: 9,
    lineHeight: 1.11,
    fontWeight: 400,
    display: 'inline-block'
  },
  block: {
    display: 'block'
  },
  bold: {
    fontFamily: 'Times-Bold'
  }
});
const Caption = ({
  bold = false,
  block = false,
  style = {},
  children,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(Text, _extends({
    style: cx(caption.common, bold && caption.bold, block && caption.block, style)
  }, props), children);
};
const detailsColumnsStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '4px'
  },
  firstCol: {
    marginRight: 8,
    width: '55%'
  },
  secondCol: {
    flex: 1
  }
});
const DetailsColumns = ({
  firstCol,
  secondCol
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: detailsColumnsStyles.wrapper
  }, /*#__PURE__*/React.createElement(View, {
    style: detailsColumnsStyles.firstCol
  }, firstCol), /*#__PURE__*/React.createElement(View, {
    style: detailsColumnsStyles.secondCol
  }, secondCol));
};
const labelAndValueStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  value: {
    marginTop: 1,
    flex: 1
  }
});
const LabelAndValue = ({
  labelWidth,
  label,
  value
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: labelAndValueStyles.wrapper
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      width: labelWidth
    }
  }, /*#__PURE__*/React.createElement(Body, {
    bold: true
  }, label)), /*#__PURE__*/React.createElement(View, {
    style: {
      marginRight: 4
    }
  }, /*#__PURE__*/React.createElement(Body, {
    bold: true
  }, ":")), /*#__PURE__*/React.createElement(View, {
    style: labelAndValueStyles.value
  }, /*#__PURE__*/React.createElement(Body, null, value)));
};
const table = StyleSheet.create({
  wrapper: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#868992'
  },
  tableRow: {
    flexDirection: 'row',
    background: '#F8F8F8'
  },
  tableHeader: {
    backgroundColor: '#F2F4F8'
  },
  tableFooter: {
    backgroundColor: '#F2F4F8',
    fontFamily: 'Times-Bold'
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#868992'
  },
  tableCell: {
    padding: '4.5px 8px'
  }
});
const Table = ({
  columns = [],
  dataSource = [],
  hasFooter = false
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: table.wrapper
  }, /*#__PURE__*/React.createElement(View, {
    style: cx(table.tableRow, table.tableHeader)
  }, columns.map(({
    width,
    key,
    title,
    ...prop
  } = {}) => {
    return /*#__PURE__*/React.createElement(View, {
      key: key,
      style: cx(table.tableCol, width ? {
        width: width
      } : {
        flex: 1
      })
    }, /*#__PURE__*/React.createElement(Body, {
      bold: true,
      style: cx(table.tableCell, {
        ...prop
      })
    }, title));
  })), dataSource?.map((row, index) => {
    return /*#__PURE__*/React.createElement(View, {
      key: index,
      style: cx(table.tableRow, index + 1 === dataSource?.length && table.tableFooter)
    }, columns.map(({
      width,
      key,
      ...prop
    } = {}) => {
      return /*#__PURE__*/React.createElement(View, {
        key: key,
        style: cx(table.tableCol, width ? {
          width
        } : {
          flex: 1
        })
      }, /*#__PURE__*/React.createElement(Body, {
        style: cx(table.tableCell, {
          ...prop
        })
      }, row[key]));
    }));
  }));
};
const s = StyleSheet.create({
  body: {
    padding: 24,
    fontFamily: 'Times-Roman',
    color: '#101112'
  },
  box: {
    border: '1px solid #868992',
    padding: 12
  },
  header: {
    borderBottom: '1px solid #e6e8eb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 8
  },
  contentBox: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  lines: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4.5
  },
  heading: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  details: {
    marginBottom: 8
  },
  note: {
    marginTop: 8,
    border: '1px solid #868992',
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
});
const Quixote = ({
  data = {}
}) => {
  const leftColLabelWidth = '30%';
  const rightColLabelWidth = '40%';
  const dataSource = [{
    sNo: '1',
    particulars: 'Mike',
    amount: 32
  }, {
    sNo: '2',
    particulars: 'John',
    amount: 42
  }, {
    sNo: '',
    particulars: 'Total',
    amount: 74
  }];
  const columns = [{
    title: 'S.No',
    dataIndex: 'sNo',
    key: 'sNo',
    width: 50
  }, {
    title: 'Particulars',
    dataIndex: 'particulars',
    key: 'particulars'
  }, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    textAlign: 'right'
  }];
  return /*#__PURE__*/React.createElement(Document, null, /*#__PURE__*/React.createElement(Page, {
    style: s.body
  }, /*#__PURE__*/React.createElement(View, {
    style: s.box
  }, /*#__PURE__*/React.createElement(View, {
    style: s.header
  }, /*#__PURE__*/React.createElement(View, {
    style: s.contentBox
  }, /*#__PURE__*/React.createElement(View, {
    style: s.lines
  }, /*#__PURE__*/React.createElement(Caption, null, "+91 98656 65656 | +91 98656 65656")), /*#__PURE__*/React.createElement(View, {
    style: cx(s.lines, {
      width: '80%'
    })
  }, /*#__PURE__*/React.createElement(Caption, {
    style: {
      textAlign: 'center'
    }
  }, "Gurukulam St, near Marikavalasa Road, Paradesipalem, Madhurawada, Visakhapatnam, A.P. 530041")), /*#__PURE__*/React.createElement(View, {
    style: s.lines
  }, /*#__PURE__*/React.createElement(Caption, null, "accounts@intellischool.in")))), /*#__PURE__*/React.createElement(Headline, {
    style: s.heading
  }, "Fee Receipt"), /*#__PURE__*/React.createElement(View, {
    style: s.details
  }, /*#__PURE__*/React.createElement(DetailsColumns, {
    firstCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: leftColLabelWidth,
      label: 'Transaction ID',
      value: 'NWTN20232223'
    }),
    secondCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: rightColLabelWidth,
      label: 'Transaction Time',
      value: '09 Jan 2023 04:55 PM'
    })
  }), /*#__PURE__*/React.createElement(DetailsColumns, {
    firstCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: leftColLabelWidth,
      label: 'Receipt Number',
      value: 'IDNT898565'
    }),
    secondCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: rightColLabelWidth,
      label: 'Payment Mode',
      value: 'Cash'
    })
  }), /*#__PURE__*/React.createElement(DetailsColumns, {
    firstCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: leftColLabelWidth,
      label: 'Student Name',
      value: 'Aarav Mishra Aarav Mishra Aarav Mishra Aarav Mishra Aarav Mishra Aarav Mishra Aarav' + ' Mishra Aarav Mishra'
    }),
    secondCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: rightColLabelWidth,
      label: 'Grade',
      value: 'PPI A'
    })
  }), /*#__PURE__*/React.createElement(DetailsColumns, {
    firstCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: leftColLabelWidth,
      label: 'Enrollment Number',
      value: 'GVS9686564'
    }),
    secondCol: /*#__PURE__*/React.createElement(LabelAndValue, {
      labelWidth: rightColLabelWidth,
      label: 'URN',
      value: '123141212'
    })
  })), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Table, {
    columns: columns,
    dataSource: dataSource,
    hasFooter: true
  })), /*#__PURE__*/React.createElement(View, {
    style: s.note
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      marginRight: 5
    }
  }, /*#__PURE__*/React.createElement(Body, {
    bold: true
  }, "Note:")), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Body, null, "Parents are requested to preserve this receipt for future clarifications in respect of fee paid by you. Fee once paid will not be refunded or transferred. Cheques subject to relaxations."))), /*#__PURE__*/React.createElement(View, {
    style: {
      textAlign: 'center',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Body, null, "This is a computer generated receipt no signature is required")))));
};
module.exports = {
  Quixote
};