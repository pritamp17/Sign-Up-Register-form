import React,{useEffect, useState} from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css'

const Base_Url='https://api.exchangeratesapi.io/latest ';
function App(){


    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency,setFromCurrency ] = useState();
    const [toCurrency,setToCurrency]= useState();
    const [exchangeRate,setExchangeRate]= useState();
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

    let toAmount,fromAmount
    if(amountInFromCurrency){
        fromAmount = amount
        toAmount = amount * exchangeRate
    }else{
        toAmount = amount
        fromAmount = amount / exchangeRate
    }
    
    useEffect(()=>{
        fetch(Base_Url)
        .then(res=>res.json())
        .then(data =>{
            const firstCurrency = Object.keys(data.rates)[0]
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRate(data.rates[firstCurrency])

            })

    }, [])

    useEffect(() => {
        if(fromCurrency!=null && toCurrency!= null)
        { fetch(`${Base_Url}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))}
    }, [fromCurrency, toCurrency])

    function handlefromAmountChange(e){
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }
    function handleToAmountChange(e){
        setAmount(e.target.value)
        setAmountInFromCurrency(false )
    }

    return( 
<>
<h1>Convert</h1>
<CurrencyRow
currencyOptions={currencyOptions}
selectCurrenct={fromCurrency}
onChangeCurrency={e => setFromCurrency(e.target.value)}
amount={fromAmount}
onChangeAmount={handlefromAmountChange}
 />
<div className="equals">=</div>
<CurrencyRow 
    currencyOptions={currencyOptions}
    selectCurrenct={toCurrency}
    onChangeCurrency={e => setToCurrency(e.target.value)}
    amount={toAmount}
    onChangeAmount={handleToAmountChange}
/>
</>
    );
}

export default App;