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
  const [data, setData] = useLocalStorage("data", { id: 0, timeout: 120000 });
  const handleToggle = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
    // console.log(updatedValue);
  };
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
        <label>
          Timeout :{" "}
          <input
            type="text"
            onChange={(e) => {
              handleToggle(e);
            }}
            value={data.timeout}
            name="timeout"
          ></input>
        </label>
        <label>
          Text-to-Speech : {" "}
          <input
            type="checkbox"
            onChange={(e) => {
              handleToggle(e);
            }}
            checked={data.tts}
            name="tts"
          ></input>
        </label>
        <label>
          Notif Sound : {" "}
          <input
            type="checkbox"
            onChange={(e) => {
              handleToggle(e);
            }}
            checked={data.notif}
            name="notif"
          ></input>
        </label>
      </form>
      <button onClick={deleteItems}>clear</button>
    </div>
  );
};

export default Setting;
