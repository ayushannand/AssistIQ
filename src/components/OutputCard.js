import React, { useState } from "react";
import styles from "../styles/outputCard.module.css";
import { isEmail } from "@/functions/isEmail";

const OutputCard = ({ content, onEmailClick }) => {
  const [renderOption, setRenderOption] = useState("table");
  const [disabled,setDisabled] = useState(false);

  const handleEmailClick = (email) => {
    const confirmed = window.confirm(
      `Do you want to change the email to ${email}?`
    );
    if (confirmed) {
      onEmailClick(email);
    }
  };

  const handleRenderOptionChange = (option) => {
    setRenderOption(option);
  };

  const renderContent = () => {
    try {
      const jsonData = JSON.parse(content);

      if (renderOption === "plain") {
        return (
          <div className={styles["card-container"]}>
            <pre className={styles["card-content"]}>{content}</pre>
          </div>
        );
      } else if (renderOption === "json") {
        const renderContent = (data, indent = "") => {
          if (typeof data === "object") {
            return Object.entries(data).map(([key, value]) => (
              <div key={key} className={styles["nested-item"]}>
                {typeof value === "object" ? (
                  <>
                    <span className={styles["key"]}>{indent + key}:</span>
                    {renderContent(value, indent + "  ")}
                  </>
                ) : (
                  <>
                    <span className={styles["key"]}>{indent + key}:</span>
                    {isEmail(value) ? (
                      <span
                        className={styles["value"]}
                        onClick={() => handleEmailClick(value)}
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {value}
                      </span>
                    ) : (
                      <span className={styles["value"]}>{value}</span>
                    )}
                  </>
                )}
              </div>
            ));
          } else {
            return <span className={styles["value"]}>{data}</span>;
          }
        };

        return (
          <div className={styles["card-container"]}>
            {renderContent(jsonData)}
          </div>
        );
      } else if (renderOption === "table") {
        const renderNestedContent = (data, indent = "") => {
          if (typeof data === "object") {
            return Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td
                  className={`${styles["table-key"]} ${styles["nested-key"]}`}
                >
                  {indent + key}
                </td>
                <td className={styles["table-value"]}>
                  {typeof value === "object"
                    ? renderNestedContent(value, indent + "\t")
                    : value}
                </td>
              </tr>
            ));
          }
          return null;
        };

        const tableData = Object.entries(jsonData);

        return (
          <div className={`${styles["card-container"]}`}>
            <table className={styles["table"]}>
              <tbody>
                {tableData.map(([key, value]) => (
                  <>
                    {typeof value === "object" ? (
                      <>
                        <td className={styles["table-key"]}>{key}</td>
                        <tr className={styles["nested-content-row"]}>
                          <td colSpan="2" className={styles["nested-content"]}>
                            <table className={styles["nested-table"]}>
                              <tbody>{renderNestedContent(value, "\t")}</tbody>
                            </table>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr key={key}>
                        <td className={styles["table-key"]}>{key}</td>
                        <td className={styles["table-value"]}>
                          {isEmail(value) ? (
                            <span
                              className={styles["email-value"]}
                              onClick={() => handleEmailClick(value)}
                            >
                              {value}
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    } catch (error) {
      // If parsing the content as JSON fails, display it as plain text
      return (
        <div className={styles["card-container"]}>
          <pre className={styles["card-content"]}>{content}</pre>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles["output-card"]}>
        <div className={`w-full flex items-end justify-end my-[-2px] mx-[2px]  ${disabled? "hidden" : ""}`}>
          <div className="flex items-center w-min rounded-bl-[10px] bg-gray-300">
            <input
              type="radio"
              name="renderOption"
              value="plain"
              checked={renderOption === "plain"}
              onChange={(e) => handleRenderOptionChange(e.target.value)}
              className="hidden"
            />
            <label
              onClick={() => handleRenderOptionChange("plain")}
              className={`toggle toggle-yes flex items-center justify-center cursor-pointer w-1/3 py-0.5 px-5 rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] text-sm font-bold ${
                renderOption === "plain"
                  ? "text-white bg-red-500"
                  : "text-gray-500"
              } transition-colors duration-300`}
            >
              Plain
            </label>
            <input
              type="radio"
              name="renderOption"
              value="json"
              checked={renderOption === "json"}
              onChange={(e) => handleRenderOptionChange(e.target.value)}
              className="hidden"
            />
            <label
              onClick={() => handleRenderOptionChange("json")}
              className={`toggle toggle-yes flex items-center justify-center cursor-pointer w-1/3  px-5  py-0.5 rounded-[10px] text-sm font-bold ${
                renderOption === "json"
                  ? "text-white bg-yellow-500"
                  : "text-gray-500"
              } transition-colors duration-300`}
            >
              JSON
            </label>
            <input
              type="radio"
              name="renderOption"
              value="table"
              checked={renderOption === "table"}
              onChange={(e) => handleRenderOptionChange(e.target.value)}
              className="hidden"
            />
            <label
              onClick={() => handleRenderOptionChange("table")}
              className={`toggle toggle-yes flex items-center justify-center cursor-pointer w-1/3  px-5  py-0.5 rounded-bl-[10px] rounded-tl-[10px]  rounded-br-[px] rounded-tr-[5px] text-sm font-bold ${
                renderOption === "table"
                  ? "text-white bg-green-500"
                  : "text-gray-500"
              } transition-colors duration-300`}
            >
              Table
            </label>
          </div>
        </div>

        {renderContent()}
      </div>
    </>
  );
};

export default OutputCard;
