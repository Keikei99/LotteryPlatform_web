import React from 'react'
import {useState } from "react";
import useDebounce from "./useDebounce";
import ABI from "./abi.json";
import { usePrepareContractWrite} from "wagmi";
import { useContractWrite } from "wagmi";

function Home() {

  

  //三个传入值
  const [sendAmount, setSendAmount] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timeEnd, settimeEnd] = useState(0);
  //三个传入值的函数
  function changeSendAmount(e){
    setSendAmount(e.target.value)
  }
  function setTimeStart(e){
    setSendAmount(e.target.value)
  }
  function settimeEnd(e){
    setSendAmount(e.target.value)
  }
  const debouncedSendAmount = useDebounce(sendAmount, 500);
  const debouncedtimeStart = useDebounce(timeStart, 500);
  const debouncedtimeEnd = useDebounce(timeEnd, 500);

  //合约地址
  //ABI
  //合约部署的那个链的的链id
  //合约里面那个函数名字
  //下面两个我也不太理解
  const { config } = usePrepareContractWrite({
    address: '0xA29D8FD25Ce87C76c6D775f284f478e07ac83a86',
    abi: ABI,
    chainId: 42, 
    functionName: 'start(uint256,uint256,uint256)',
    args: [ debouncedSendAmount,debouncedtimeStart,debouncedtimeEnd],
    enabled: Boolean(debouncedSendAmount,debouncedtimeStart,debouncedtimeEnd)
  })
  const { write } = useContractWrite(config)

//下面是三个输入值和按钮触发函数
  return (
    <div className="Home"> 
    <br/>
    <input type="number" value={sendAmount} onChange={changeSendAmount} placeholder="Enter amount" /> 
    <input type="number" value={timeStart} onChange={setTimeStart} placeholder="Enter amount" />
    <input type="number" value={timeEnd} onChange={settimeEnd} placeholder="Enter amount" />
    <button className="connectButton" onClick={()=>write?.()}>mint</button>
   </div>
  )
}

export default Home