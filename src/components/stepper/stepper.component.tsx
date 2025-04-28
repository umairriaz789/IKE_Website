import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import { FormView, FormViews } from "../../types/ui";
import { useNavigate } from "react-router-dom";

interface IStepperProps {
  steps: FormViews;
  callback: any;
}

export const Stepper = ({ steps, callback }: IStepperProps) => {
  const [selected, setSelected] = useState<FormView>(steps[0]);
  const navigate = useNavigate();
  return (
    <div className="stepper">
      {steps.map((step, key) =>
        step.title === selected.title ? (
          <Button
            key={key}
            className="stepper-button p-0 bg-transparent border-0 outline-none box-shadow-none mx-1"
          >
            <div className="d-flex flex-column align-items-center justify-content-between">
              <p>
                <>{step.title}</>
              </p>
              <span className="stepper-button-border-white w-100" />
            </div>
          </Button>
        ) : (
          <Button
            key={key}
            className="stepper-button p-0 bg-transparent border-0 outline-none box-shadow-none mx-1"
            onClick={() => {
              setSelected(step);
              callback(step);
              navigate(step.widget);
            }}
          >
            <div className="d-flex flex-column align-items-center justify-content-between">
              <p style={{ color: "gray" }}>
                <>{step.title}</>
              </p>
              <span className="stepper-button-border-gray w-100" />
            </div>
          </Button>
        )
      )}
    </div>
  );
};
