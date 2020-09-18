function statement (invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerfomances);
  return renderPlainText(statementData, plays);

  function enrichPerfomances(aPerfomance) {
    const result = Object.assign({}, aPerfomance);
    result.play = playFor(result)
    return result;
  }

  function playFor(aPerfomance) {
    return plays[aPerfomance.playID]
  }
}

function renderPlainText (data, plays) {
    let result = `Statement for ${data.customer}\n`;
  
    for (let perf of data.performances) {
      result += `  ${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(totalAmount()/100)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

    function amountFor(aPerfomance){
      let result = 0;
      switch (aPerfomance.play.type) {
          case "tragedy":
            result = 40000;
            if (aPerfomance.audience > 30) {
              result += 1000 * (aPerfomance.audience - 30);
            }
            break;
          case "comedy":
            result = 30000;
            if (aPerfomance.audience > 20) {
              result += 10000 + 500 * (aPerfomance.audience - 20);
            }
            result += 300 * aPerfomance.audience;
            break;
          default:
              throw new Error(`unknown type: ${aPerfomance.play.type}`);
          }
          return result;
  }
  
  function playFor(aPerfomance) {
      return plays[aPerfomance.playID];
  }
  
  function volumeCreditsFor(aPerfomance) {
    let result = 0;
    result += Math.max(aPerfomance.audience - 30, 0);
    if ("comedy" === playFor(aPerfomance).type) result += Math.floor(aPerfomance.audience / 5);
    return result;
  }
  
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
                        { style: "currency", currency: "USD",
                          minimumFractionDigits: 2 }).format(aNumber);
  }
  
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }
  
  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}

let plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
};

let invoices =  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  }
;

  console.log(statement(invoices, plays));

  exports.statement = statement;


