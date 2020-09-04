

function volumeCreditsFor(aPerfomance) {
  let result = 0;
  result += Math.max(aPerfomance.audience - 30, 0);
  if ("comedy" === playFor(aPerfomance).type) result += Math.floor(aPerfomance.audience / 5);
  return result;
}


function format(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber);
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber/100);
}

function statement (invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;
  
    for (let perf of invoice.performances) {
      result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(totalAmount()/100)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

    function amountFor(aPerfomance){
      let result = 0;
      switch (playFor(aPerfomance).type) {
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
              throw new Error(`unknown type: ${playFor(aPerfomance).type}`);
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
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }
  
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
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


