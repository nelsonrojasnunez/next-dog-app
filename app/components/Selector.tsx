import classnames from "classnames";
interface Props {
  data: string[];
  label: string;
  multiple?: boolean;
  handleOnChange?: (selection: string) => void;
}
export const capitalize = (str: string) => {
  str = str.toLowerCase().replace(/\b[a-z]/g, function (letra) {
    return letra.toUpperCase();
  });
  return str;
};

const Selector = ({
  data,
  label,
  handleOnChange = () => {},
  multiple = false,
}: Props) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control is-expanded">
        <div
          className={classnames({
            "select is-fullwidth": true,
            "is-multiple": multiple,
          })}
        >
          <select
            multiple={!!multiple}
            onChange={(evt) => handleOnChange(evt.target.value)}
          >
            {multiple === false && (
              <option key="no-data" value="">
                Select from list
              </option>
            )}

            {data.length > 0 &&
              data.map((element) => (
                <option key={element} value={element}>
                  {capitalize(element)}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Selector;
