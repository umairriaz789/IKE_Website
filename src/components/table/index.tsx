import { useState } from "react";
import { THead } from "../typography/thead";
import { Body } from "../typography/body";
import { CRadio } from "../inputs/cradio";
import { Settings } from "react-feather";
import { Button } from "reactstrap";

interface ITableProps {
  headings: string[];
  data: DataItem[][];
  selection?: boolean;
  borderBottom?: boolean;
  actions: string[];
  style?: any;
  className?: string;
}

export interface DataItem {
  data: string;
  indicator?: React.ReactNode;
}

export const Table = ({
  headings,
  data,
  style,
  className,
  selection,
  borderBottom,
  actions,
}: ITableProps) => {
  const [selectedItem, setSelectedItem] = useState<any>();
  return (
    <table
      style={{ ...style, position: "relative" }}
      className={`ctable ${className}`}
    >
      <thead>
        <tr>
          {selection === true ? (
            <th className="p-2" style={{ textAlign: "center" }} />
          ) : (
            ""
          )}
          {headings.map((heading) => (
            <THead className="p-2" style={{ textAlign: "center" }}>
              {heading}
            </THead>
          ))}
          {actions.length > 0 ? (
            <th className="p-2" style={{ textAlign: "center" }} />
          ) : (
            ""
          )}
        </tr>
      </thead>
      <tbody
        style={{
          borderTop: "1px solid #FFFFFF10",
          borderBottom: borderBottom === true ? "1px solid #FFFFFF10" : "none",
        }}
      >
        {data.map((row, key) => (
          <tr
            key={key}
            style={{
              backgroundColor:
                selectedItem === row ? "#00000033" : "transparent",
            }}
          >
            {selection === true ? (
              <td className="p-3" style={{ textAlign: "center" }}>
                <CRadio
                  name="item"
                  checked={row === selectedItem ? true : false}
                  onChange={() => {
                    setSelectedItem(row);
                  }}
                />
              </td>
            ) : (
              ""
            )}
            {row.map((item, key) => (
              <td key={key} className="p-3" style={{ textAlign: "center" }}>
                <div className="d-flex flex-row align-items-center justify-content-center w-100">
                  <Body className="m-0">{item.data}</Body>
                  {item.indicator}
                </div>
              </td>
            ))}
            {actions.length > 0 ? (
              <td className="p-3" style={{ textAlign: "center" }}>
                {actions.includes("settings") ? (
                  <Button color="primary-outline">
                    <Settings color="white" />
                  </Button>
                ) : (
                  ""
                )}
              </td>
            ) : (
              ""
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
