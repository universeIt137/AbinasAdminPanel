/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Loader from "../Loader";
import { Icon } from "@iconify/react";

// eslint-disable-next-line react/prop-types
export default function Table({
  title,
  headers,
  data,
  actions,
  actionName,
  handleActionClick = () => {},
  actionValue = {
    edit: false,
    approve: false,
    pending: false,
    reject: false,
    delete: false,
  },
}) {
  const [rows, setRows] = useState([]);

  const getItemData = (rowItem, itemKey, headerItem = null) => {
    let keys = itemKey.split(".");
    let item = "";
    let tempItem = { ...rowItem };
    keys.forEach((key, index) => {
      tempItem = tempItem[key];
      item = tempItem;
    });

    let res =
      headerItem?.type === "date"
        ? item?.split("T")[0]
        : headerItem?.key === "progreess"
        ? `${item} %`
        : item;

    return res;
  };

  useEffect(() => {
    setRows(data);
  }, [data]);

  // data === undefined
  if (!data) {
    return <Loader forProcess={true} />;
  } else {
    return (
      <div className="bg-primary p-2 pt-0  rounded-md">
        {title && (
          <h5 className="text-center bg-primary section-title  ">{title}</h5>
        )}

        <div className="bg-white   rounded-sm">
          <div className=" ">
            <table className="w-[100%]    ">
              <thead>
                <tr className="sticky top-0">
                  <th className=" bg-customBase  border-2 border-white table-header-font">
                    SL No
                  </th>

                  {headers?.map((item, index) => (
                    <th
                      className=" bg-customBase border-2 border-white px-1 table-header-font"
                      // style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                      key={index}
                    >
                      {item?.name}
                    </th>
                  ))}
                  {actionName && (
                    <th className="border-2 border-white bg-customBase px-1 table-header-font">
                      {actionName}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows?.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 !== 0 ? "bg-customBase" : "bg-[#D8DFE5] "
                    }  cursor-pointer`}
                    onClick={() => handleActionClick("click", item._id)}
                  >
                    <td className="h-[30px] border-2 border-white table-data-font">
                      {index + 1}
                    </td>
                    {headers.map((x, index) => (
                      <td
                        className="border-2 border-white table-data-font"
                        key={index}
                      >
                        {getItemData(item, x.key, x) ?? "Unavailable"}
                      </td>
                    ))}
                    {actions && (
                      <td className="border-2 border-white table-data-font">
                        <div className="flex gap-2 p-1 justify-center">
                          {actionValue?.edit && (
                            <button
                              className=" py-1 bg-[#0A85F5] px-2 rounded text-white font-bold tooltip"
                              onClick={() =>
                                handleActionClick("edit", item._id)
                              }
                              data-tip="Edit"
                            >
                              <Icon icon="uil:edit" width={25} />
                            </button>
                          )}
                          {actionValue?.approve && (
                            <>
                              {item?.progressPercentage >= 0 ? (
                                <button
                                  className={`${
                                    item?.progressPercentage === 100
                                      ? "bg-green-700"
                                      : "bg-green-400"
                                  } py-1  px-2 rounded text-white font-bold tooltip`}
                                  onClick={() =>
                                    handleActionClick("approve", item._id)
                                  }
                                  data-tip="Approved"
                                  disabled={
                                    item?.progressPercentage === 100
                                      ? false
                                      : true
                                  }
                                >
                                  <Icon icon="charm:square-tick" width={25} />
                                </button>
                              ) : (
                                <button
                                  className="bg-green-700 py-1  px-2 rounded text-white font-bold tooltip"
                                  onClick={() =>
                                    handleActionClick("approve", item._id)
                                  }
                                  data-tip="Approved"
                                >
                                  <Icon icon="charm:square-tick" width={25} />
                                </button>
                              )}
                            </>
                          )}
                          {actionValue?.pending && (
                            <button
                              className=" py-1 bg-[#0A85F5] px-2 rounded text-white font-bold tooltip"
                              onClick={() =>
                                handleActionClick("pending", item._id)
                              }
                              data-tip="Pending"
                            >
                              <Icon
                                icon="mdi:account-pending-outline"
                                width={25}
                              />
                            </button>
                          )}
                          {actionValue?.reject && (
                            <button
                              className=" py-1 bg-[#c43447] px-2 rounded text-white font-bold tooltip"
                              onClick={() =>
                                handleActionClick("reject", item._id)
                              }
                              data-tip="Rejected"
                            >
                              <Icon icon="charm:square-cross" width={25} />
                            </button>
                          )}

                          {actionValue?.delete && (
                            <button
                              className=" py-1 bg-[#e0445e] px-2 rounded text-white font-bold tooltip"
                              onClick={() =>
                                handleActionClick("delete", item._id)
                              }
                              data-tip="Delete"
                            >
                              <Icon icon="mdi:delete-outline" width={25} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
