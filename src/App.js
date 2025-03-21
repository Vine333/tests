import React, {useState} from "react";
import PaymentPopup from "./components/Pop";
import styled from "styled-components";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    return (<Wrapper>
            <button onClick={() => setIsOpen(true)} className='btn'>Расчет платежей</button>
            {isOpen && <PaymentPopup onClose={() => setIsOpen(false)}/>}
        </Wrapper>);
}

const Wrapper = styled.div`
  background-color: #FF5E56;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    width: 194px;
    height: 56px;
    background-color: transparent;
    border: 1px solid #fff;
    padding: 16px 32px;
    border-radius: 6px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: white;
    transition: ease 0.3s;

    &:hover {
      background-color: #fff;
      color: #000;

    }

    &:focus {
      scale: 95%;
    }

    &:active {
      scale: 95%;
    }
  }
`
export default App;
