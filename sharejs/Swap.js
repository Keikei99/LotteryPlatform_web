import React from 'react'
import {useState } from "react";
import useDebounce from "./useDebounce";
import ABI from "./abi.json";
import { usePrepareContractWrite} from "wagmi";
import { useContractWrite } from "wagmi";

function Swap() {
  const [sendAmount, setSendAmount] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timeEnd, setTimeEnd] = useState(0);
  //三个传入值的函数
  function changeSendAmount(e){
    setSendAmount(e.target.value)
  }
  function changeTimeStart(e){
    setTimeStart(e.target.value)
  }
  function changeTimeEnd(e){
    setTimeEnd(e.target.value)
  }
  const debouncedSendAmount = useDebounce(sendAmount, 500);
  const debouncedtimeStart = useDebounce(timeStart, 500);
  const debouncedtimeEnd = useDebounce(timeEnd, 500);

  const { config } = usePrepareContractWrite({
    address: '0xA29D8FD25Ce87C76c6D775f284f478e07ac83a86',
    abi: ABI,
    chainId: 5, 
    functionName: 'start(uint256,uint256,uint256)',
    args: [ debouncedSendAmount,debouncedtimeStart,debouncedtimeEnd],
    enabled: Boolean(debouncedSendAmount,debouncedtimeStart,debouncedtimeEnd,)
  })
  const { write } = useContractWrite(config)
  return (
    <div>Swap
    <input type="number" value={sendAmount} onChange={changeSendAmount} placeholder="Enter amount" /> 
    <input type="number" value={timeStart} onChange={changeTimeStart} placeholder="Enter amount" />
    <input type="number" value={timeEnd} onChange={changeTimeEnd} placeholder="Enter amount" />
    <button className="connectButton" onClick={()=>write?.()}>mint</button>
    </div>

    
  
  )
}

export default Swap