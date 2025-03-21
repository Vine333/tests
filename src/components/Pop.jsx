import React, {useEffect, useState} from "react";
import styled from "styled-components";

const PaymentPopup = ({onClose}) => {
    const [creditAmount, setCreditAmount] = useState("");
    const [selectedMonths, setSelectedMonths] = useState(12);
    const [payment, setPayment] = useState(null);
    const [paymentType, setPaymentType] = useState("monthly");
    const [errorMessage, setErrorMessage] = useState("");
    const [isButtonActive, setIsButtonActive] = useState(false);

    const monthsArray = [12, 24, 36, 48];

    const calculatePayment = () => {
        if (!creditAmount || creditAmount <= 0) {
            setErrorMessage("Пожалуйста, введите корректную сумму кредита");
            setIsButtonActive(false);
            return;
        }
        setErrorMessage("");

        const monthlyPayment = creditAmount / selectedMonths;
        const roundedMonthlyPayment = Math.round(monthlyPayment * 100) / 100;
        setPayment({
            monthly: roundedMonthlyPayment.toString(),
            yearly: (roundedMonthlyPayment * selectedMonths).toFixed(0),
        });

        setIsButtonActive(true);
    };

    useEffect(() => {
        if (selectedMonths) {
            calculatePayment();
        }
    }, [selectedMonths]);

    return (<Overlay>
            <PopupContainer>
                <CloseButton onClick={onClose}>✖</CloseButton>
                <Title>Платежи по кредиту</Title>
                <Description>
                    Введите сумму кредита и выберите срок, на который вы хотите его оформить.
                    Мы автоматически рассчитаем для вас ежемесячный и годовой платеж.
                </Description>
                <Label>Ваша сумма кредита</Label>
                <Input
                    type="number"
                    placeholder="Введите данные"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <CalculateText onClick={calculatePayment}>Рассчитать</CalculateText>
                <div className='monthly'>
                    <Label>Количество месяцев?</Label>
                    <MonthOptions>
                        {monthsArray.map((month) => (<MonthButton
                                key={month}
                                selected={selectedMonths === month}
                                onClick={() => setSelectedMonths(month)}
                            >
                                {month}
                            </MonthButton>))}
                    </MonthOptions>
                </div>
                {payment && (<Result>
                        <h4>Итого ваш платеж по кредиту:</h4>
                        <PaymentButtons>
                            <PaymentButton
                                selected={paymentType === "monthly"}
                                onClick={() => setPaymentType("monthly")}
                            >
                                в месяц
                            </PaymentButton>
                            <PaymentButton
                                selected={paymentType === "yearly"}
                                onClick={() => setPaymentType("yearly")}
                            >
                                в год
                            </PaymentButton>
                        </PaymentButtons>

                        {paymentType === "monthly" && (<p>{payment.monthly} руб.</p>)}
                        {paymentType === "yearly" && (<p>{payment.yearly} руб.</p>)}
                    </Result>)}
                < div className='btn-container'>
                    <SubmitButton onClick={onClose} disabled={!isButtonActive}>
                        Добавить
                    </SubmitButton>

                </div>

            </PopupContainer>
        </Overlay>);
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:#b5b5b5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity .3s ease-in-out,visibility.3s ease-in-out;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 16px 24px;
  border-radius: 30px;
  width: 552px;
  position: relative;
  transition: opacity.3s ease-in-out,transform.3s ease-in-out;


  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .monthly {
    text-align: left;
    gap: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  @media(max-width: 768px){
  width: 453px;
    height: 100%;
    border-radius: 0;
    padding-top: 40px;
    input{
      width: 97%;
    }
}
  @media(max-width: 320px){
    width: 100%;
    
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  width: 30px;
  font-size: 25px;
  height: 30px;   
  background: none;
  cursor: pointer;
  margin-bottom: 30px;
  color: #ea0029;
  @media(max-width: 320px){
    font-size: 20px;
    top: 39px;
  }
`;

const Title = styled.h2`
  text-align: left;
  font-size: 28px;
  line-height: 40px;
  font-weight: 500;
  margin: 0;
  @media(max-width: 320px){
    font-size: 18px;

  }
`;

const Description = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 10px;
  line-height: 24px;
  font-weight: 400;
  @media(max-width: 320px){
   font-size: 14px;

  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: block;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 488px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const CalculateText = styled.p`
  color: red;
  cursor: pointer;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  text-decoration: none;
  margin: 10px 0;
`;

const MonthOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const MonthButton = styled.button`
  padding: 10px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.selected ? "red" : "#eee")};
  color: ${(props) => (props.selected ? "white" : "black")};
  cursor: pointer;
`;

const Result = styled.div`
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
`;

const PaymentButtons = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const PaymentButton = styled.button`
  padding: 6px 12px;
  width: 75px;
  height: 36px;
  border: none;
  border-radius: 50px;
  background: ${(props) => (props.selected ? "red" : "#eee")};
  color: ${(props) => (props.selected ? "white" : "black")};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  height: 56px;
  width: 100%;
  padding: 12px;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: ${(props) => (props.disabled ? "none" : "1px 1px 20px 5px #d029294d")};
  background: ${(props) => (props.disabled ? "#b5b5b5" : "linear-gradient(to right, #f66, #dc3131)")};
  transition: 0.3s;
`;



export default PaymentPopup;
