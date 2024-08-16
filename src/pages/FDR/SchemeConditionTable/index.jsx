/* eslint-disable react/prop-types */
const SchemeConditionTable = ({
  headers,
  data,
  setSchemeCondition,
  tableHeight,
}) => {
  const handleInterestRate = (value, year) => {
    const filterCondition = data.find((item) => item.year === year);

    const interest =
      (Number(filterCondition?.principleAmount) * Number(value)) / 100;
    const totalVat =
      (Number(filterCondition?.principleAmount) *
        Number(filterCondition?.vat)) /
      100;

    const matureAmount =
      Number(filterCondition?.principleAmount) + Number(interest);
    const mAmountWithVat =
      Number(filterCondition?.principleAmount) +
      Number(interest) -
      Number(totalVat);

    filterCondition.insrate = Number(value);
    filterCondition.matureAmountWithOutVat = matureAmount;
    filterCondition.mAmountWithVat = mAmountWithVat;

    const remainingCondition = data.filter((item) => item.year !== year);

    remainingCondition.push(filterCondition);

    remainingCondition.sort((a, b) =>
      Number(a.year) > Number(b.year) ? 1 : -1
    );
    setSchemeCondition(remainingCondition);
  };

  const handleVate = (value, year) => {
    const filterCondition = data.find((item) => item.year === year);

    const interest =
      (Number(filterCondition?.principleAmount) *
        Number(filterCondition?.insrate)) /
      100;
    const totalVat =
      (Number(filterCondition?.principleAmount) * Number(value)) / 100;

    const matureAmount =
      Number(filterCondition?.principleAmount) + Number(interest);
    const mAmountWithVat =
      Number(filterCondition?.principleAmount) +
      Number(interest) -
      Number(totalVat);

    filterCondition.vat = Number(value);
    filterCondition.matureAmountWithOutVat = matureAmount;
    filterCondition.mAmountWithVat = mAmountWithVat;

    const remainingCondition = data.filter((item) => item.year !== year);

    remainingCondition.push(filterCondition);

    remainingCondition.sort((a, b) =>
      Number(a.year) > Number(b.year) ? 1 : -1
    );
    setSchemeCondition(remainingCondition);
  };

  return (
    <div className="">
      <div className="  p-2 pt-0 rounded-md">
        <h5 className="text-center   section-title  text-sm">
          FDR Scheme Condition Table
        </h5>
        <div className=" bg-primary  p-1 rounded-sm">
          <div
            className={` ${
              tableHeight === 56 ? " h-56 " : "  "
            }    overflow-y-scroll`}
          >
            <table className="w-[100%]    overflow-y-scroll">
              {/* head */}
              <thead>
                <tr className="sticky -top-0">
                  <th
                    className=" bg-customBase border-2 border-white table-header-font"
                    // style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                  >
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
                </tr>
              </thead>
              <tbody className=" ">
                {data?.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 !== 0 ? "bg-customBase" : "bg-[#D8DFE5] "
                    }  cursor-pointer`}
                  >
                    <td className="h-[22px] border-2 border-white table-data-font">
                      {index + 1}
                    </td>

                    <td className="h-[22px] border-2 border-white table-data-font">
                      {item?.year}
                    </td>

                    <td className="h-[22px] border-2 border-white table-data-font">
                      {item?.matureDate}
                    </td>

                    <td className="h-[22px] border-2 border-white table-data-font">
                      {item?.principleAmount}
                    </td>
                    <td className="h-[22px] w-20 border-2   p-0 border-white table-data-font">
                      <input
                        className=" w-[75px]  h-[14px]   m-0 pt-[1px] focus:border-[1px]  focus:ring-0 focus:outline-0 text-center"
                        value={item?.insrate}
                        onChange={(e) =>
                          handleInterestRate(e.target.value, item.year)
                        }
                      />
                    </td>
                    <td className="h-[22px] w-20 border-2   p-0 border-white table-data-font">
                      <input
                        className=" w-[75px]  h-[14px]   m-0 pt-[1px] focus:border-[1px]  focus:ring-0 focus:outline-0 text-center"
                        value={item?.vat}
                        onChange={(e) => handleVate(e.target.value, item.year)}
                      />
                    </td>
                    <td className="h-[22px] border-2 border-white table-data-font">
                      {item?.matureAmountWithOutVat}
                    </td>
                    <td className="h-[22px] border-2 border-white table-data-font">
                      {item?.mAmountWithVat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeConditionTable;
