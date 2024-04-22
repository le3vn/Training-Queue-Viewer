import React, { useState } from "react";
import { Row, Col, Button, Input, Alert } from "antd";

const maxQueue = 3;

const QueueSystem: React.FC = () => {
  const [cashiers, setCashiers] = useState<string[][]>([[], [], []]);
  const [customerName, setCustomerName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddCustomer = () => {
    if (!customerName.trim()) {
      setErrorMessage("Please enter a valid customer name!");
      return;
    }

    if (cashiers.flat().includes(customerName.trim())) {
      setErrorMessage("No duplicated names allowed.");
      return;
    }

    const randomCashierIndex = Math.floor(Math.random() * 3);
    const updatedCashiers = [...cashiers];
    updatedCashiers[randomCashierIndex].push(customerName.trim());
    setCashiers(updatedCashiers);
    setCustomerName("");
    setErrorMessage("");
  };

  const handleRemoveCustomer = (cashierIndex: number) => {
    const updatedCashiers = [...cashiers];
    updatedCashiers[cashierIndex].shift();
    setCashiers(updatedCashiers);
  };

  return (
    <div className="w-full mt-5">
      <Row>
        {cashiers.map((queue, index) => (
          <Col key={index} span={8}>
            <div>
              <div className="bg-pink-300 w-44 h-24 rounded-md m-auto text-white">
                <h3 style={{ padding: "40px 0", textAlign: "center" }}>
                  Cashier #{index + 1}
                </h3>
              </div>
              {queue.slice(0, maxQueue).map((customer, i) => (
                <div
                  key={i}
                  className="bg-lime-200 rounded-full w-24 h-24 p-2 text-center m-auto mt-10 flex items-center justify-center"
                >
                  {customer}
                </div>
              ))}
              {queue.length > maxQueue && (
                <div className="bg-lime-200 rounded-full w-24 h-24 p-2 text-center m-auto mt-10 flex items-center justify-center">
                  + {queue.length - maxQueue} Customers
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
      <br />
      <div className="flex items-center justify-center w-[500px] m-auto p-10">
        <Input
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleAddCustomer}
          className="ml-4 bg-[#24a0ed]"
        >
          Submit
        </Button>
      </div>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          className="mt-5 w-[500px] m-auto"
        />
      )}
      <div className="text-center mt-5">
        {cashiers.map((_, index) => (
          <Button
            key={index}
            onClick={() => handleRemoveCustomer(index)}
            className="bg-red-400 text-white mt-3"
          >
            Handle Cashier {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QueueSystem;