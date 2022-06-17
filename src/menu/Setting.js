import React from "react";

const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = React.useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );
  
    React.useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);
  
    return [value, setValue];
  };
function deleteItems() {
  localStorage.clear();
}
const Setting = () => {
  const [data, setData] = useLocalStorage("data", { id: 0 });
  const handleToggle = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // console.log(name + value);
    let updatedValue = {};
    setData((prevState) => {
      return { [name]: value };
    });
    // console.log(updatedValue);
  };
  console.log(data.id);
  return (
    <div>
      <form>
        <label>
          ID :{" "}
          <input
            type="text"
            onChange={(e) => {
              handleToggle(e);
            }}
            value={data.id}
            name="id"
          ></input>
        </label>
      </form>
      <button onClick={deleteItems}>clear</button>
    </div>
  );
};

export default Setting;
